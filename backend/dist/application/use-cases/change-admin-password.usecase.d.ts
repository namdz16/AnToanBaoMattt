import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { SaltGenerator } from '../../infrastructure/security/salt.generator';
export declare class ChangeAdminPasswordUseCase {
    private readonly adminRepo;
    private readonly encryptionService;
    private readonly saltGenerator;
    constructor(adminRepo: AdminRepository, encryptionService: EncryptionService, saltGenerator: SaltGenerator);
    execute(username: string, oldPassword: string, newPassword: string): Promise<string>;
}
