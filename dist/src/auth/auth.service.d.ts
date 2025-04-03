import { SignupDto } from './dto/signup.dto';
import { SendVerificationCodeDto, VerifyEmailDto } from './dto/verify-email.dto';
import { LoginDto } from './dto/login.dto';
import 'dotenv/config';
export declare class AuthService {
    signupUser(signupDto: SignupDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    loginUser(loginDto: LoginDto): Promise<{
        token: any;
        message: string;
        statusCode: number;
    }>;
    update(id: number, updateAuthDto: LoginDto): string;
    remove(id: number): string;
    sendVerificationCode(sendVerificationCodeDto: SendVerificationCodeDto): Promise<{
        message: string;
        statusCode: number;
    }>;
}
