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
exports.ChangePasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../infrastructure/security/encryption.service");
const user_entity_1 = require("../../domain/entities/user.entity");
let ChangePasswordUseCase = class ChangePasswordUseCase {
    constructor(userRepo, encryption) {
        this.userRepo = userRepo;
        this.encryption = encryption;
    }
    async execute(username, oldPassword, newPassword) {
        const user = await this.userRepo.findByUsername(username);
        if (!user)
            throw new Error('Tài khoản không tồn tại');
        const encryptedOld = this.encryption.secureHash(username, oldPassword, user.salt);
        if (encryptedOld !== user.encryptedPassword) {
            throw new Error('Mật khẩu cũ không đúng');
        }
        const newSalt = this.encryption.generateSalt();
        const newEncrypted = this.encryption.secureHash(username, newPassword, newSalt);
        const updatedUser = new user_entity_1.UserEntity(user.username, newSalt, newEncrypted, false, 0, user.createdAt);
        await this.userRepo.update(updatedUser);
    }
};
exports.ChangePasswordUseCase = ChangePasswordUseCase;
exports.ChangePasswordUseCase = ChangePasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object, encryption_service_1.EncryptionService])
], ChangePasswordUseCase);
//# sourceMappingURL=change-password.usecase.js.map