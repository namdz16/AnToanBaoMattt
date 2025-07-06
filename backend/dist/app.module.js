"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const user_resolver_1 = require("./interfaces/graphql/resolvers/user.resolver");
const admin_resolver_1 = require("./interfaces/graphql/resolvers/admin.resolver");
const admin_auth_resolver_1 = require("./interfaces/graphql/resolvers/admin-auth.resolver");
const encryption_service_1 = require("./infrastructure/security/encryption.service");
const salt_generator_1 = require("./infrastructure/security/salt.generator");
const login_log_schema_1 = require("./infrastructure/database/schemas/login-log.schema");
const user_model_1 = require("./infrastructure/database/models/user.model");
const admin_model_1 = require("./infrastructure/database/models/admin.model");
const logger_service_1 = require("./infrastructure/logger/logger.service");
const user_repository_impl_1 = require("./infrastructure/database/user.repository.impl");
const admin_repository_impl_1 = require("./infrastructure/database/admin.repository.impl");
const register_user_usecase_1 = require("./application/use-cases/register-user.usecase");
const login_user_usecase_1 = require("./application/use-cases/login-user.usecase");
const change_password_usecase_1 = require("./application/use-cases/change-password.usecase");
const admin_unlock_user_usecase_1 = require("./application/use-cases/admin-unlock-user.usecase");
const register_admin_usecase_1 = require("./application/use-cases/register-admin.usecase");
const login_admin_usecase_1 = require("./application/use-cases/login-admin.usecase");
const change_admin_password_usecase_1 = require("./application/use-cases/change-admin-password.usecase");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/secure-auth'),
            mongoose_1.MongooseModule.forFeature([
                { name: login_log_schema_1.LoginLog.name, schema: login_log_schema_1.LoginLogSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: admin_model_1.Admin.name, schema: admin_model_1.AdminSchema },
            ]),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            }),
        ],
        providers: [
            // Resolvers
            user_resolver_1.UserResolver,
            admin_resolver_1.AdminResolver,
            admin_auth_resolver_1.AdminAuthResolver,
            // Use cases
            register_user_usecase_1.RegisterUserUseCase,
            login_user_usecase_1.LoginUserUseCase,
            change_password_usecase_1.ChangePasswordUseCase,
            admin_unlock_user_usecase_1.AdminUnlockUserUseCase,
            register_admin_usecase_1.RegisterAdminUseCase,
            login_admin_usecase_1.LoginAdminUseCase,
            change_admin_password_usecase_1.ChangeAdminPasswordUseCase,
            encryption_service_1.EncryptionService,
            salt_generator_1.SaltGenerator,
            // Repositories
            { provide: 'LoggerRepository', useClass: logger_service_1.LoggerService },
            { provide: 'UserRepository', useClass: user_repository_impl_1.UserRepositoryImpl },
            { provide: 'AdminRepository', useClass: admin_repository_impl_1.AdminRepository },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map