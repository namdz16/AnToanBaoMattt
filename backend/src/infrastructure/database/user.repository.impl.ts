import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user ? new UserEntity(
      user.username,
      user.salt,
      user.encryptedPassword,
      user.isLocked,
      user.failAttempts,
      user.createdAt
    ) : null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const created = new this.userModel(user);
    await created.save();
    return user;
  }

  async update(user: UserEntity): Promise<void> {
    await this.userModel.updateOne(
      { username: user.username },
      {
        $set: {
          encryptedPassword: user.encryptedPassword,
          salt: user.salt,
          failAttempts: user.failAttempts,
          isLocked: user.isLocked,
        },
      },
    );
  }

  async delete(username: string): Promise<void> {
    await this.userModel.deleteOne({ username });
  }

  async unlockUser(username: string): Promise<void> {
    await this.userModel.updateOne(
      { username },
      { $set: { isLocked: false, failAttempts: 0 } },
    );
  }
}
