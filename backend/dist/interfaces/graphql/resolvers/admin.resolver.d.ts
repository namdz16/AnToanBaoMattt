import { LoggerRepository } from '../../../domain/interfaces/logger.repository';
import { AdminUnlockUserUseCase } from '../../../application/use-cases/admin-unlock-user.usecase';
import { UserRepository } from '../../../domain/interfaces/user.repository';
export declare class AdminResolver {
    private readonly logger;
    private readonly unlockUserUseCase;
    private readonly userRepo;
    constructor(logger: LoggerRepository, unlockUserUseCase: AdminUnlockUserUseCase, userRepo: UserRepository);
    getLoginLogs(): Promise<string[]>;
    unlockUser(username: string): Promise<string>;
    getUsers(): Promise<string[]>;
    deleteUser(username: string): Promise<string>;
}
