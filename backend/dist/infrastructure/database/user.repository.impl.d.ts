import { Model } from 'mongoose';
import { User } from './models/user.model';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
export declare class UserRepositoryImpl implements UserRepository {
    private userModel;
    constructor(userModel: Model<User>);
    getAll(): Promise<User[]>;
    findByUsername(username: string): Promise<UserEntity | null>;
    create(user: UserEntity): Promise<UserEntity>;
    update(user: UserEntity): Promise<void>;
    delete(username: string): Promise<void>;
    unlockUser(username: string): Promise<void>;
}
