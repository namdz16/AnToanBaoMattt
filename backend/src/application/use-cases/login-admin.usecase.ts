import { Injectable, Inject } from '@nestjs/common';
import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';

@Injectable()
export class LoginAdminUseCase {
  constructor(
    @Inject('AdminRepository') private readonly adminRepo: AdminRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(username: string, password: string): Promise<string> {
    const admin = await this.adminRepo.findByUsername(username);
    if (!admin) throw new Error('Không tồn tại admin');
    if (admin.isLocked) throw new Error('Tài khoản admin bị khóa');
    const encrypted = this.encryptionService.secureHash(username, password, admin.salt);
    if (encrypted !== admin.encryptedPassword) {
      await this.adminRepo.update(username, { failAttempts: (admin.failAttempts || 0) + 1, isLocked: (admin.failAttempts || 0) + 1 >= 5 });
      throw new Error('Sai mật khẩu admin');
    }
    await this.adminRepo.update(username, { failAttempts: 0 });
    return 'Đăng nhập admin thành công';
  }
}
