import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import db from 'src/database';
import { usersTable } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import {
  SendVerificationCodeDto,
  VerifyEmailDto,
} from './dto/verify-email.dto';
import { LoginDto } from './dto/login.dto';
import 'dotenv/config';
import { sendEmail } from './functions/auth';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  async signupUser(signupDto: SignupDto) {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      role,
      city,
      state,
    } = signupDto;
    //Check for duplicate emails..........
    const existingUserByEmail = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (existingUserByEmail?.length > 0) {
      throw new ForbiddenException('User already exists');
    }
    //Check for duplicate usernames..........
    const existingUserByUsername = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);
    if (existingUserByUsername?.length > 0) {
      throw new ForbiddenException('User already exists');
    }
    //Hash the password.........
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create the user.........
    const user = await db.insert(usersTable).values({
      userId: Math.random().toString(36).substring(2, 15),
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
      city,
      state,
    });
    if (!user) {
      throw new ForbiddenException('User could not be created');
    }

    return {
      message: 'User created successfully',
      statusCode: 201,
    };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { email, code } = verifyEmailDto;
    //Check if the user exists..........
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (user?.length === 0) {
      throw new ForbiddenException('Invalid code or email');
    }
    if (user[0]?.isVerified) {
      throw new ForbiddenException('Email already verified');
    }
    if (new Date(user[0]?.verificationCodeExpires as string) < new Date()) {
      throw new ForbiddenException('Code expired');
    }
    if (user[0]?.verificationCode === code) {
      user[0].isVerified = true;
      await db
        .update(usersTable)
        .set({ isVerified: true })
        .where(eq(usersTable.email, email));
      return {
        message: 'Email verified successfully',
        statusCode: 200,
      };
    } else {
      throw new ForbiddenException('Invalid code');
    }
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password, role } = loginDto;
    //Check if the user exists..........
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (user?.length === 0) {
      throw new ForbiddenException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid email or password');
    }
    if (user[0]?.role !== role) {
      throw new ForbiddenException(`Pls login at the ${user[0].role} side`);
    }
    const token = jwt.sign(
      { _id: user[0].id, role: user[0].role },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' },
    );
    return {
      token,
      message: 'User logged in successfully',
      statusCode: 200,
    };
  }

  update(id: number, updateAuthDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async sendVerificationCode(sendVerificationCodeDto: SendVerificationCodeDto) {
    const { email } = sendVerificationCodeDto;
    //Check if the user exists..........
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (user?.length === 0) {
      throw new ForbiddenException('Invalid email');
    }
    if (user[0]?.isVerified) {
      throw new ForbiddenException('Email already verified');
    }
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const verificationCodeExpire = Date.now() + 15 * 60 * 1000;
    user[0].verificationCode = verificationCode;
    user[0].verificationCodeExpires = new Date(
      verificationCodeExpire,
    ).toString();

    await db.update(usersTable).set(user[0]).where(eq(usersTable.email, email));
    await sendEmail({
      to: user[0].email,
      subject: 'Your Verification Code',
      text: `Your verification code is ${verificationCode}. This code will expire in 15 minutes.`,
    });
    return {
      message: 'Verification code sent successfully',
      statusCode: 200,
    };
  }
}
