import { Injectable, Inject } from '@nestjs/common';
import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { Admin } from '../../infrastructure/database/models/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @Inject('AdminRepository') private readonly adminRepo: AdminRepository,
  ) {}

  async findByUsername(username: string) {
    return this.adminRepo.findByUsername(username);
  }

  async create(admin: Partial<Admin>) {
    return this.adminRepo.create(admin);
  }

  async update(username: string, update: Partial<Admin>) {
    return this.adminRepo.update(username, update);
  }

  async delete(username: string) {
    return this.adminRepo.delete(username);
  }
}
