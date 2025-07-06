import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginLog } from '../database/schemas/login-log.schema';
import { LoggerRepository } from '../../domain/interfaces/logger.repository';

@Injectable()
export class LoggerService implements LoggerRepository {
  constructor(
    @InjectModel(LoginLog.name)
    private readonly logModel: Model<LoginLog>,
  ) {}

  async logLogin(username: string, success: boolean, timestamp: Date): Promise<void> {
    await this.logModel.create({ username, success, timestamp });
  }

  async getLogs(): Promise<Array<{ username: string; success: boolean; timestamp: Date }>> {
    const logs = await this.logModel.find().sort({ timestamp: -1 }).lean();
    return logs.map((log) => ({
      username: log.username ?? '',
      success: log.success ?? false,
      timestamp: log.timestamp ?? new Date(0),
    }));
  }
}
