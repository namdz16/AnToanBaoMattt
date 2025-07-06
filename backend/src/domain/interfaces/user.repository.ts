import { UserEntity } from '../entities/user.entity';

export interface UserRepository {
  findByUsername(username: string): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<void>;
  delete(username: string): Promise<void>;
  unlockUser(username: string): Promise<void>;
  getAll(): Promise<UserEntity[]>; 
}
