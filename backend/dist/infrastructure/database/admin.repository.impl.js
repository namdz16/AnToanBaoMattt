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
exports.AdminRepository = void 0;
const admin_model_1 = require("./models/admin.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AdminRepository = class AdminRepository {
    constructor(adminModel) {
        this.adminModel = adminModel;
    }
    async findByUsername(username) {
        return this.adminModel.findOne({ username });
    }
    async create(admin) {
        return this.adminModel.create(admin);
    }
    async update(username, update) {
        return this.adminModel.findOneAndUpdate({ username }, update, { new: true });
    }
    async delete(username) {
        await this.adminModel.deleteOne({ username });
    }
};
exports.AdminRepository = AdminRepository;
exports.AdminRepository = AdminRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)(admin_model_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AdminRepository);
//# sourceMappingURL=admin.repository.impl.js.map