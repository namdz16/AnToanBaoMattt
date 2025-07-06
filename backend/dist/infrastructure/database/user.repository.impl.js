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
exports.UserRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("./models/user.model");
const user_entity_1 = require("../../domain/entities/user.entity");
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAll() {
        return this.userModel.find().exec();
    }
    async findByUsername(username) {
        const user = await this.userModel.findOne({ username }).exec();
        return user ? new user_entity_1.UserEntity(user.username, user.salt, user.encryptedPassword, user.isLocked, user.failAttempts, user.createdAt) : null;
    }
    async create(user) {
        const created = new this.userModel(user);
        await created.save();
        return user;
    }
    async update(user) {
        await this.userModel.updateOne({ username: user.username }, {
            $set: {
                encryptedPassword: user.encryptedPassword,
                salt: user.salt,
                failAttempts: user.failAttempts,
                isLocked: user.isLocked,
            },
        });
    }
    async delete(username) {
        await this.userModel.deleteOne({ username });
    }
    async unlockUser(username) {
        await this.userModel.updateOne({ username }, { $set: { isLocked: false, failAttempts: 0 } });
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepositoryImpl);
//# sourceMappingURL=user.repository.impl.js.map