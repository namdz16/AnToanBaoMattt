import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
export declare class RegisterAdminUseCase {
    private readonly adminRepo;
    private readonly encryptionService;
    constructor(adminRepo: AdminRepository, encryptionService: EncryptionService);
    execute(username: string, password: string): Promise<string>;
}
