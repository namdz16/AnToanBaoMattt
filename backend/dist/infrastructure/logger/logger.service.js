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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const login_log_schema_1 = require("../database/schemas/login-log.schema");
let LoggerService = class LoggerService {
    constructor(logModel) {
        this.logModel = logModel;
    }
    async logLogin(username, success, timestamp) {
        await this.logModel.create({ username, success, timestamp });
    }
    async getLogs() {
        const logs = await this.logModel.find().sort({ timestamp: -1 }).lean();
        return logs.map((log) => {
            var _a, _b, _c;
            return ({
                username: (_a = log.username) !== null && _a !== void 0 ? _a : '',
                success: (_b = log.success) !== null && _b !== void 0 ? _b : false,
                timestamp: (_c = log.timestamp) !== null && _c !== void 0 ? _c : new Date(0),
            });
        });
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(login_log_schema_1.LoginLog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LoggerService);
//# sourceMappingURL=logger.service.js.map