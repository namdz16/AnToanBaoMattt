import { UserRepository } from '../../domain/interfaces/user.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
export declare class ChangePasswordUseCase {
    private readonly userRepo;
    private readonly encryption;
    constructor(userRepo: UserRepository, encryption: EncryptionService);
    execute(username: string, oldPassword: string, newPassword: string): Promise<void>;
}
