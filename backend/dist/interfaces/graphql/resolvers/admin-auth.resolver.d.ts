import { RegisterAdminUseCase } from '../../../application/use-cases/register-admin.usecase';
import { LoginAdminUseCase } from '../../../application/use-cases/login-admin.usecase';
import { ChangeAdminPasswordUseCase } from '../../../application/use-cases/change-admin-password.usecase';
export declare class AdminAuthResolver {
    private readonly registerAdminUseCase;
    private readonly loginAdminUseCase;
    private readonly changeAdminPasswordUseCase;
    constructor(registerAdminUseCase: RegisterAdminUseCase, loginAdminUseCase: LoginAdminUseCase, changeAdminPasswordUseCase: ChangeAdminPasswordUseCase);
    registerAdmin(username: string, password: string): Promise<string>;
    loginAdmin(username: string, password: string): Promise<string>;
    changeAdminPassword(username: string, oldPassword: string, newPassword: string): Promise<string>;
}
