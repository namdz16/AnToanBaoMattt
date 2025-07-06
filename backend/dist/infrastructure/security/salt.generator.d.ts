export declare class SaltGenerator {
    static generate(): string;
}
import { UserRepository } from '../../domain/interfaces/user.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { UserEntity } from '../../domain/entities/user.entity';
export declare class RegisterUserUseCase {
    private readonly userRepo;
    private readonly encryption;
    constructor(userRepo: UserRepository, encryption: EncryptionService);
    execute(username: string, password: string): Promise<UserEntity>;
}
