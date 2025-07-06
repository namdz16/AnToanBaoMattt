"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const register_user_usecase_1 = require("../../../application/use-cases/register-user.usecase");
const login_user_usecase_1 = require("../../../application/use-cases/login-user.usecase");
const change_password_usecase_1 = require("../../../application/use-cases/change-password.usecase");
let UserResolver = class UserResolver {
    constructor(registerUseCase, loginUseCase, changePasswordUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.changePasswordUseCase = changePasswordUseCase;
    }
    async register(username, password) {
        await this.registerUseCase.execute(username, password);
        return 'Đăng ký thành công';
    }
    async login(username, password) {
        await this.loginUseCase.execute(username, password);
        return 'Đăng nhập thành công';
    }
    async changePassword(username, oldPassword, newPassword) {
        await this.changePasswordUseCase.execute(username, oldPassword, newPassword);
        return 'Đổi mật khẩu thành công';
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('oldPassword')),
    __param(2, (0, graphql_1.Args)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [register_user_usecase_1.RegisterUserUseCase,
        login_user_usecase_1.LoginUserUseCase,
        change_password_usecase_1.ChangePasswordUseCase])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map