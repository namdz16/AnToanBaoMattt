import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';

@Injectable()
export class AdminUnlockUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(username: string): Promise<void> {
    await this.userRepo.unlockUser(username);
  }
}
