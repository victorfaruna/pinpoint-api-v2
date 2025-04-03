import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SendVerificationCodeDto, VerifyEmailDto } from './dto/verify-email.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    sendVerificationCode(sendVerificationCodeDto: SendVerificationCodeDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    update(id: string, updateAuthDto: LoginDto): string;
    remove(id: string): string;
}
