import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../../../application/use-cases/login-user.usecase';
import { ChangePasswordUseCase } from '../../../application/use-cases/change-password.usecase';

@Resolver()
export class UserResolver {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Mutation(() => String)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    await this.registerUseCase.execute(username, password);
    return 'Đăng ký thành công';
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    await this.loginUseCase.execute(username, password);
    return 'Đăng nhập thành công';
  }

  @Mutation(() => String)
  async changePassword(
    @Args('username') username: string,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    await this.changePasswordUseCase.execute(username, oldPassword, newPassword);
    return 'Đổi mật khẩu thành công';
  }
}
