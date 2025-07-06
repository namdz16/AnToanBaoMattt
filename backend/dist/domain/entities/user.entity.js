"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(username, salt, encryptedPassword, isLocked = false, failAttempts = 0, createdAt = new Date()) {
        this.username = username;
        this.salt = salt;
        this.encryptedPassword = encryptedPassword;
        this.isLocked = isLocked;
        this.failAttempts = failAttempts;
        this.createdAt = createdAt;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map