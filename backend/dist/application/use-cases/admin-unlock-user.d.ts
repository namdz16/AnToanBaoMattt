import { UserRepository } from '../../domain/interfaces/user.repository';
export declare class AdminUnlockUserUseCase {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(username: string): Promise<void>;
}
