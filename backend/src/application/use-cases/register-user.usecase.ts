import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly encryption: EncryptionService,
  ) {}

  async execute(username: string, password: string): Promise<UserEntity> {
    const existing = await this.userRepo.findByUsername(username);
    if (existing) {
      throw new Error('Tài khoản đã tồn tại');
    }

    const salt = this.encryption.generateSalt();
    const encrypted = this.encryption.secureHash(username, password, salt);

    const newUser = new UserEntity(username, salt, encrypted);
    return this.userRepo.create(newUser);
  }
}