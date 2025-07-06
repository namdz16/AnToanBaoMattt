import { Injectable, Inject } from '@nestjs/common';
import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { SaltGenerator } from '../../infrastructure/security/salt.generator';

@Injectable()
export class ChangeAdminPasswordUseCase {
  constructor(
    @Inject('AdminRepository') private readonly adminRepo: AdminRepository,
    private readonly encryptionService: EncryptionService,
    private readonly saltGenerator: SaltGenerator,
  ) {}

  async execute(username: string, oldPassword: string, newPassword: string): Promise<string> {
    const admin = await this.adminRepo.findByUsername(username);
    if (!admin) throw new Error('Không tồn tại admin');
    const encrypted = this.encryptionService.secureHash(username, oldPassword, admin.salt);
    if (encrypted !== admin.encryptedPassword) throw new Error('Sai mật khẩu cũ');
    const newSalt = SaltGenerator.generate();
    const newEncrypted = this.encryptionService.secureHash(username, newPassword, newSalt);
    await this.adminRepo.update(username, { salt: newSalt, encryptedPassword: newEncrypted });
    return 'Đổi mật khẩu admin thành công';
  }
}
