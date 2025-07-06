"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const register_admin_usecase_1 = require("../../../application/use-cases/register-admin.usecase");
const login_admin_usecase_1 = require("../../../application/use-cases/login-admin.usecase");
const change_admin_password_usecase_1 = require("../../../application/use-cases/change-admin-password.usecase");
const jwt = __importStar(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'SECRET_KEY';
let AdminAuthResolver = class AdminAuthResolver {
    constructor(registerAdminUseCase, loginAdminUseCase, changeAdminPasswordUseCase) {
        this.registerAdminUseCase = registerAdminUseCase;
        this.loginAdminUseCase = loginAdminUseCase;
        this.changeAdminPasswordUseCase = changeAdminPasswordUseCase;
    }
    async registerAdmin(username, password) {
        return this.registerAdminUseCase.execute(username, password);
    }
    async loginAdmin(username, password) {
        await this.loginAdminUseCase.execute(username, password);
        // thành công => trả về JWT
        const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
    async changeAdminPassword(username, oldPassword, newPassword) {
        return this.changeAdminPasswordUseCase.execute(username, oldPassword, newPassword);
    }
};
exports.AdminAuthResolver = AdminAuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminAuthResolver.prototype, "registerAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminAuthResolver.prototype, "loginAdmin", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('oldPassword')),
    __param(2, (0, graphql_1.Args)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminAuthResolver.prototype, "changeAdminPassword", null);
exports.AdminAuthResolver = AdminAuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [register_admin_usecase_1.RegisterAdminUseCase,
        login_admin_usecase_1.LoginAdminUseCase,
        change_admin_password_usecase_1.ChangeAdminPasswordUseCase])
], AdminAuthResolver);
//# sourceMappingURL=admin-auth.resolver.js.map