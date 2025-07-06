import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterAdminUseCase } from '../../../application/use-cases/register-admin.usecase';
import { LoginAdminUseCase } from '../../../application/use-cases/login-admin.usecase';
import { ChangeAdminPasswordUseCase } from '../../../application/use-cases/change-admin-password.usecase';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'SECRET_KEY';

@Resolver()
export class AdminAuthResolver {
  constructor(
    private readonly registerAdminUseCase: RegisterAdminUseCase,
    private readonly loginAdminUseCase: LoginAdminUseCase,
    private readonly changeAdminPasswordUseCase: ChangeAdminPasswordUseCase,
  ) {}

  @Mutation(() => String)
  async registerAdmin(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    return this.registerAdminUseCase.execute(username, password);
  }

  @Mutation(() => String)
  async loginAdmin(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    await this.loginAdminUseCase.execute(username, password);
    // thành công => trả về JWT
    const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  @Mutation(() => String)
  async changeAdminPassword(
    @Args('username') username: string,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    return this.changeAdminPasswordUseCase.execute(username, oldPassword, newPassword);
  }
}
