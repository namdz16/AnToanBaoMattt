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
exports.AdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const admin_unlock_user_usecase_1 = require("../../../application/use-cases/admin-unlock-user.usecase");
const common_2 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
let AdminResolver = class AdminResolver {
    constructor(logger, unlockUserUseCase, userRepo) {
        this.logger = logger;
        this.unlockUserUseCase = unlockUserUseCase;
        this.userRepo = userRepo;
    }
    async getLoginLogs() {
        const logs = await this.logger.getLogs();
        return logs.map((log) => `${log.timestamp.toISOString()} - ${log.username} - ${log.success ? 'Thành công' : 'Thất bại'}`);
    }
    async unlockUser(username) {
        await this.unlockUserUseCase.execute(username);
        return 'Đã mở khóa tài khoản';
    }
    async getUsers() {
        const users = await this.userRepo.getAll();
        return users.map(u => `${u.username} - ${u.isLocked ? 'Bị khóa' : 'Hoạt động'} - ${u.createdAt.toISOString()}`);
    }
    async deleteUser(username) {
        await this.userRepo.delete(username);
        return 'Đã xóa tài khoản';
    }
};
exports.AdminResolver = AdminResolver;
__decorate([
    (0, graphql_1.Query)(() => [String]),
    (0, common_2.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getLoginLogs", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_2.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, graphql_1.Args)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "unlockUser", null);
__decorate([
    (0, graphql_1.Query)(() => [String]),
    (0, common_2.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    (0, common_2.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, graphql_1.Args)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteUser", null);
exports.AdminResolver = AdminResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __param(0, (0, common_1.Inject)('LoggerRepository')),
    __param(2, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object, admin_unlock_user_usecase_1.AdminUnlockUserUseCase, Object])
], AdminResolver);
//# sourceMappingURL=admin.resolver.js.map