import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { LoggerRepository } from '../../domain/interfaces/logger.repository';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly encryption: EncryptionService,
    @Inject('LoggerRepository') private readonly logger: LoggerRepository, 
  ) {}

  async execute(username: string, password: string): Promise<UserEntity> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      await this.logger.logLogin(username, false, new Date());
      throw new Error('Tài khoản không tồn tại');
    }

    if (user.isLocked) {
      await this.logger.logLogin(username, false, new Date());
      throw new Error('Tài khoản bị khóa');
    }

    const encrypted = this.encryption.secureHash(username, password, user.salt);
    const isMatch = encrypted === user.encryptedPassword;

    if (!isMatch) {
      const attempts = user.failAttempts + 1;
      const isLocked = attempts >= 5;

      const updatedUser = new UserEntity(
        user.username,
        user.salt,
        user.encryptedPassword,
        isLocked,
        attempts,
        user.createdAt,
      );

      await this.userRepo.update(updatedUser);
      await this.logger.logLogin(username, false, new Date());
      const remaining = 5 - attempts;
      throw new Error(`Sai mật khẩu. Bạn còn ${remaining > 0 ? remaining : 0} lần thử`);
    }

    const updatedUser = new UserEntity(
      user.username,
      user.salt,
      user.encryptedPassword,
      false,
      0,
      user.createdAt,
    );

    await this.userRepo.update(updatedUser);
    await this.logger.logLogin(username, true, new Date());
    return updatedUser;
  }
}