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
exports.ChangeAdminPasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../infrastructure/security/encryption.service");
const salt_generator_1 = require("../../infrastructure/security/salt.generator");
let ChangeAdminPasswordUseCase = class ChangeAdminPasswordUseCase {
    constructor(adminRepo, encryptionService, saltGenerator) {
        this.adminRepo = adminRepo;
        this.encryptionService = encryptionService;
        this.saltGenerator = saltGenerator;
    }
    async execute(username, oldPassword, newPassword) {
        const admin = await this.adminRepo.findByUsername(username);
        if (!admin)
            throw new Error('Không tồn tại admin');
        const encrypted = this.encryptionService.secureHash(username, oldPassword, admin.salt);
        if (encrypted !== admin.encryptedPassword)
            throw new Error('Sai mật khẩu cũ');
        const newSalt = salt_generator_1.SaltGenerator.generate();
        const newEncrypted = this.encryptionService.secureHash(username, newPassword, newSalt);
        await this.adminRepo.update(username, { salt: newSalt, encryptedPassword: newEncrypted });
        return 'Đổi mật khẩu admin thành công';
    }
};
exports.ChangeAdminPasswordUseCase = ChangeAdminPasswordUseCase;
exports.ChangeAdminPasswordUseCase = ChangeAdminPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AdminRepository')),
    __metadata("design:paramtypes", [Object, encryption_service_1.EncryptionService,
        salt_generator_1.SaltGenerator])
], ChangeAdminPasswordUseCase);
//# sourceMappingURL=change-admin-password.usecase.js.map