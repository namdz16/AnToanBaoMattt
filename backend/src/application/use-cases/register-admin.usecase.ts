import { Injectable, Inject } from '@nestjs/common';
import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { EncryptionService } from '../../infrastructure/security/encryption.service';
import { SaltGenerator } from '../../infrastructure/security/salt.generator';

@Injectable()
export class RegisterAdminUseCase {
  constructor(
    @Inject('AdminRepository') private readonly adminRepo: AdminRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async execute(username: string, password: string): Promise<string> {
    const existed = await this.adminRepo.findByUsername(username);
    if (existed) throw new Error('Admin đã tồn tại');
    const salt = SaltGenerator.generate();
    const encryptedPassword = this.encryptionService.secureHash(username, password, salt);
    await this.adminRepo.create({ username, salt, encryptedPassword });
    return 'Đăng ký admin thành công';
  }
}
