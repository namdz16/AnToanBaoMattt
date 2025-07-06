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
exports.RegisterAdminUseCase = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../infrastructure/security/encryption.service");
const salt_generator_1 = require("../../infrastructure/security/salt.generator");
let RegisterAdminUseCase = class RegisterAdminUseCase {
    constructor(adminRepo, encryptionService) {
        this.adminRepo = adminRepo;
        this.encryptionService = encryptionService;
    }
    async execute(username, password) {
        const existed = await this.adminRepo.findByUsername(username);
        if (existed)
            throw new Error('Admin đã tồn tại');
        const salt = salt_generator_1.SaltGenerator.generate();
        const encryptedPassword = this.encryptionService.secureHash(username, password, salt);
        await this.adminRepo.create({ username, salt, encryptedPassword });
        return 'Đăng ký admin thành công';
    }
};
exports.RegisterAdminUseCase = RegisterAdminUseCase;
exports.RegisterAdminUseCase = RegisterAdminUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AdminRepository')),
    __metadata("design:paramtypes", [Object, encryption_service_1.EncryptionService])
], RegisterAdminUseCase);
//# sourceMappingURL=register-admin.usecase.js.map