"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordVO = void 0;
class PasswordVO {
    constructor(value) {
        this.value = value;
        if (!value || value.length < 6) {
            throw new Error('Password phải có ít nhất 6 ký tự');
        }
    }
}
exports.PasswordVO = PasswordVO;
//# sourceMappingURL=password.vo.js.map