import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly encryption: EncryptionService,
  ) {}

  async execute(
    username: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new Error('Tài khoản không tồn tại');

    const encryptedOld = this.encryption.secureHash(username, oldPassword, user.salt);
    if (encryptedOld !== user.encryptedPassword) {
      throw new Error('Mật khẩu cũ không đúng');
    }

    const newSalt = this.encryption.generateSalt();
    const newEncrypted = this.encryption.secureHash(username, newPassword, newSalt);

    const updatedUser = new UserEntity(
      user.username,
      newSalt,
      newEncrypted,
      false,
      0,
      user.createdAt,
    );

    await this.userRepo.update(updatedUser);
  }
}