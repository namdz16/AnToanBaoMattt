import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';

@Injectable()
export class AdminUnlockUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(username: string): Promise<void> {
    await this.userRepo.unlockUser(username);
  }
}