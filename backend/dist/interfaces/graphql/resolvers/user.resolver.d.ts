import { RegisterUserUseCase } from '../../../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../../../application/use-cases/login-user.usecase';
import { ChangePasswordUseCase } from '../../../application/use-cases/change-password.usecase';
export declare class UserResolver {
    private readonly registerUseCase;
    private readonly loginUseCase;
    private readonly changePasswordUseCase;
    constructor(registerUseCase: RegisterUserUseCase, loginUseCase: LoginUserUseCase, changePasswordUseCase: ChangePasswordUseCase);
    register(username: string, password: string): Promise<string>;
    login(username: string, password: string): Promise<string>;
    changePassword(username: string, oldPassword: string, newPassword: string): Promise<string>;
}
