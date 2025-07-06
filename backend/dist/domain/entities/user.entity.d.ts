export declare class UserEntity {
    readonly username: string;
    readonly salt: string;
    readonly encryptedPassword: string;
    readonly isLocked: boolean;
    readonly failAttempts: number;
    readonly createdAt: Date;
    constructor(username: string, salt: string, encryptedPassword: string, isLocked?: boolean, failAttempts?: number, createdAt?: Date);
}
