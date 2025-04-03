"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../database");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
require("dotenv/config");
const auth_1 = require("./functions/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let AuthService = class AuthService {
    async signupUser(signupDto) {
        const { firstName, lastName, username, email, password, role, city, state, } = signupDto;
        const existingUserByEmail = await database_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email))
            .limit(1);
        if (existingUserByEmail?.length > 0) {
            throw new common_1.ForbiddenException('User already exists');
        }
        const existingUserByUsername = await database_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.username, username))
            .limit(1);
        if (existingUserByUsername?.length > 0) {
            throw new common_1.ForbiddenException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await database_1.default.insert(schema_1.usersTable).values({
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
            throw new common_1.ForbiddenException('User could not be created');
        }
        return {
            message: 'User created successfully',
            statusCode: 201,
        };
    }
    async verifyEmail(verifyEmailDto) {
        const { email, code } = verifyEmailDto;
        const user = await database_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email))
            .limit(1);
        if (user?.length === 0) {
            throw new common_1.ForbiddenException('Invalid code or email');
        }
        if (user[0]?.isVerified) {
            throw new common_1.ForbiddenException('Email already verified');
        }
        if (new Date(user[0]?.verificationCodeExpires) < new Date()) {
            throw new common_1.ForbiddenException('Code expired');
        }
        if (user[0]?.verificationCode === code) {
            user[0].isVerified = true;
            await database_1.default
                .update(schema_1.usersTable)
                .set({ isVerified: true })
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
            return {
                message: 'Email verified successfully',
                statusCode: 200,
            };
        }
        else {
            throw new common_1.ForbiddenException('Invalid code');
        }
    }
    async loginUser(loginDto) {
        const { email, password, role } = loginDto;
        const user = await database_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email))
            .limit(1);
        if (user?.length === 0) {
            throw new common_1.ForbiddenException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            throw new common_1.ForbiddenException('Invalid email or password');
        }
        if (user[0]?.role !== role) {
            throw new common_1.ForbiddenException(`Pls login at the ${user[0].role} side`);
        }
        const token = jwt.sign({ _id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '30d' });
        return {
            token,
            message: 'User logged in successfully',
            statusCode: 200,
        };
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
    async sendVerificationCode(sendVerificationCodeDto) {
        const { email } = sendVerificationCodeDto;
        const user = await database_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email))
            .limit(1);
        if (user?.length === 0) {
            throw new common_1.ForbiddenException('Invalid email');
        }
        if (user[0]?.isVerified) {
            throw new common_1.ForbiddenException('Email already verified');
        }
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const verificationCodeExpire = Date.now() + 15 * 60 * 1000;
        user[0].verificationCode = verificationCode;
        user[0].verificationCodeExpires = new Date(verificationCodeExpire).toString();
        await database_1.default.update(schema_1.usersTable).set(user[0]).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
        await (0, auth_1.sendEmail)({
            to: user[0].email,
            subject: 'Your Verification Code',
            text: `Your verification code is ${verificationCode}. This code will expire in 15 minutes.`,
        });
        return {
            message: 'Verification code sent successfully',
            statusCode: 200,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map