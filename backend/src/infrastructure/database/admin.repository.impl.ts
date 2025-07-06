import { Admin, AdminSchema } from './models/admin.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class AdminRepository {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
  ) {}

  async findByUsername(username: string): Promise<Admin | null> {
    return this.adminModel.findOne({ username });
  }

  async create(admin: Partial<Admin>): Promise<Admin> {
    return this.adminModel.create(admin);
  }

  async update(username: string, update: Partial<Admin>): Promise<Admin | null> {
    return this.adminModel.findOneAndUpdate({ username }, update, { new: true });
  }

  async delete(username: string): Promise<void> {
    await this.adminModel.deleteOne({ username });
  }
}
