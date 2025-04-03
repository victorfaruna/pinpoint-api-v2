import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: any): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: any): string;
    remove(id: string): string;
}
