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
exports.LoginUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../infrastructure/security/encryption.service");
const user_entity_1 = require("../../domain/entities/user.entity");
let LoginUserUseCase = class LoginUserUseCase {
    constructor(userRepo, encryption, logger) {
        this.userRepo = userRepo;
        this.encryption = encryption;
        this.logger = logger;
    }
    async execute(username, password) {
        const user = await this.userRepo.findByUsername(username);
        if (!user) {
            await this.logger.logLogin(username, false, new Date());
            throw new Error('Tài khoản không tồn tại');
        }
        if (user.isLocked) {
            await this.logger.logLogin(username, false, new Date());
            throw new Error('Tài khoản bị khóa');
        }
        const encrypted = this.encryption.secureHash(username, password, user.salt);
        const isMatch = encrypted === user.encryptedPassword;
        if (!isMatch) {
            const attempts = user.failAttempts + 1;
            const isLocked = attempts >= 5;
            const updatedUser = new user_entity_1.UserEntity(user.username, user.salt, user.encryptedPassword, isLocked, attempts, user.createdAt);
            await this.userRepo.update(updatedUser);
            await this.logger.logLogin(username, false, new Date());
            const remaining = 5 - attempts;
            throw new Error(`Sai mật khẩu. Bạn còn ${remaining > 0 ? remaining : 0} lần thử`);
        }
        const updatedUser = new user_entity_1.UserEntity(user.username, user.salt, user.encryptedPassword, false, 0, user.createdAt);
        await this.userRepo.update(updatedUser);
        await this.logger.logLogin(username, true, new Date());
        return updatedUser;
    }
};
exports.LoginUserUseCase = LoginUserUseCase;
exports.LoginUserUseCase = LoginUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __param(2, (0, common_1.Inject)('LoggerRepository')),
    __metadata("design:paramtypes", [Object, encryption_service_1.EncryptionService, Object])
], LoginUserUseCase);
//# sourceMappingURL=login-user.usecase.js.map