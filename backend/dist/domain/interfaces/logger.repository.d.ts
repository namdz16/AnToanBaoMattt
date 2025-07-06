export interface LoggerRepository {
    logLogin(username: string, success: boolean, timestamp: Date): Promise<void>;
    getLogs(): Promise<Array<{
        username: string;
        success: boolean;
        timestamp: Date;
    }>>;
}
