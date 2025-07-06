// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { UserResolver } from './interfaces/graphql/resolvers/user.resolver';
import { AdminResolver } from './interfaces/graphql/resolvers/admin.resolver';
import { AdminAuthResolver } from './interfaces/graphql/resolvers/admin-auth.resolver';

import { LoggerService } from './infrastructure/logger/logger.service';
import { EncryptionService } from './infrastructure/security/encryption.service';
import { SaltGenerator } from './infrastructure/security/salt.generator';

import { LoginLog, LoginLogSchema } from './infrastructure/database/schemas/login-log.schema';
import { User, UserSchema } from './infrastructure/database/models/user.model';
import { Admin, AdminSchema } from './infrastructure/database/models/admin.model';

import { LoggerRepository } from './domain/interfaces/logger.repository';
import { UserRepository } from './domain/interfaces/user.repository';
import { AdminRepository } from './domain/interfaces/admin.repository';
import { LoggerService as LoggerServiceImpl } from './infrastructure/logger/logger.service';
import { UserRepositoryImpl } from './infrastructure/database/user.repository.impl';
import { AdminRepository as AdminRepositoryImpl } from './infrastructure/database/admin.repository.impl';

import { RegisterUserUseCase } from './application/use-cases/register-user.usecase';
import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { ChangePasswordUseCase } from './application/use-cases/change-password.usecase';
import { AdminUnlockUserUseCase } from './application/use-cases/admin-unlock-user.usecase';
import { RegisterAdminUseCase } from './application/use-cases/register-admin.usecase';
import { LoginAdminUseCase } from './application/use-cases/login-admin.usecase';
import { ChangeAdminPasswordUseCase } from './application/use-cases/change-admin-password.usecase';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/secure-auth'),
    MongooseModule.forFeature([
      { name: LoginLog.name, schema: LoginLogSchema },
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    UserResolver,
    AdminResolver,
    AdminAuthResolver, 

    // Use cases
    RegisterUserUseCase,
    LoginUserUseCase,
    ChangePasswordUseCase,
    AdminUnlockUserUseCase,
    RegisterAdminUseCase,
    LoginAdminUseCase,
    ChangeAdminPasswordUseCase,
    EncryptionService,    
    SaltGenerator,

    // Repositories
    { provide: 'LoggerRepository', useClass: LoggerServiceImpl },
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    { provide: 'AdminRepository', useClass: AdminRepositoryImpl },
  ],
})
export class AppModule {}
