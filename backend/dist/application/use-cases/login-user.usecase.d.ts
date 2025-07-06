import { UserRepository } from '../../domain/interfaces/user.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { LoggerRepository } from '../../domain/interfaces/logger.repository';
export declare class LoginUserUseCase {
    private readonly userRepo;
    private readonly encryption;
    private readonly logger;
    constructor(userRepo: UserRepository, encryption: EncryptionService, logger: LoggerRepository);
    execute(username: string, password: string): Promise<UserEntity>;
}
