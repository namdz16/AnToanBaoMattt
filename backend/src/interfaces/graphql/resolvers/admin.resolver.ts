import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { LoggerRepository } from '../../../domain/interfaces/logger.repository';
import { AdminUnlockUserUseCase } from '../../../application/use-cases/admin-unlock-user.usecase';
import { UserRepository } from '../../../domain/interfaces/user.repository';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';

@Resolver()
export class AdminResolver {
  constructor(
    @Inject('LoggerRepository') private readonly logger: LoggerRepository,
    private readonly unlockUserUseCase: AdminUnlockUserUseCase,
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  @Query(() => [String])
  @UseGuards(AdminGuard)
  async getLoginLogs(): Promise<string[]> {
    const logs = await this.logger.getLogs();
    return logs.map(
      (log) => `${log.timestamp.toISOString()} - ${log.username} - ${log.success ? 'Thành công' : 'Thất bại'}`,
    );
  }

  @Mutation(() => String)
  @UseGuards(AdminGuard)
  async unlockUser(@Args('username') username: string): Promise<string> {
    await this.unlockUserUseCase.execute(username);
    return 'Đã mở khóa tài khoản';
  }

  @Query(() => [String])
  @UseGuards(AdminGuard)
  async getUsers(): Promise<string[]> {
    const users = await this.userRepo.getAll();
    return users.map(u => `${u.username} - ${u.isLocked ? 'Bị khóa' : 'Hoạt động'} - ${u.createdAt.toISOString()}`);
  }

  @Mutation(() => String)
  @UseGuards(AdminGuard)
  async deleteUser(@Args('username') username: string): Promise<string> {
    await this.userRepo.delete(username);
    return 'Đã xóa tài khoản';
  }
}