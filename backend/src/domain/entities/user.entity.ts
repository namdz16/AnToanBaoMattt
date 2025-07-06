export class UserEntity {
  constructor(
    public readonly username: string,
    public readonly salt: string,
    public readonly encryptedPassword: string,
    public readonly isLocked = false,
    public readonly failAttempts = 0,
    public readonly createdAt: Date = new Date(),
  ) {}
}
