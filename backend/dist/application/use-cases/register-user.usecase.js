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
exports.RegisterUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const encryption_service_1 = require("../../infrastructure/security/encryption.service");
const user_entity_1 = require("../../domain/entities/user.entity");
let RegisterUserUseCase = class RegisterUserUseCase {
    constructor(userRepo, encryption) {
        this.userRepo = userRepo;
        this.encryption = encryption;
    }
    async execute(username, password) {
        const existing = await this.userRepo.findByUsername(username);
        if (existing) {
            throw new Error('Tài khoản đã tồn tại');
        }
        const salt = this.encryption.generateSalt();
        const encrypted = this.encryption.secureHash(username, password, salt);
        const newUser = new user_entity_1.UserEntity(username, salt, encrypted);
        return this.userRepo.create(newUser);
    }
};
exports.RegisterUserUseCase = RegisterUserUseCase;
exports.RegisterUserUseCase = RegisterUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object, encryption_service_1.EncryptionService])
], RegisterUserUseCase);
//# sourceMappingURL=register-user.usecase.js.map