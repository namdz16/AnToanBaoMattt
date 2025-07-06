import { Model } from 'mongoose';
import { LoginLog } from '../database/schemas/login-log.schema';
import { LoggerRepository } from '../../domain/interfaces/logger.repository';
export declare class LoggerService implements LoggerRepository {
    private readonly logModel;
    constructor(logModel: Model<LoginLog>);
    logLogin(username: string, success: boolean, timestamp: Date): Promise<void>;
    getLogs(): Promise<Array<{
        username: string;
        success: boolean;
        timestamp: Date;
    }>>;
}
