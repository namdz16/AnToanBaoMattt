"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameVO = void 0;
class UsernameVO {
    constructor(value) {
        this.value = value;
        if (!value || value.length < 4) {
            throw new Error('Username phải có ít nhất 4 ký tự');
        }
    }
}
exports.UsernameVO = UsernameVO;
//# sourceMappingURL=username.vo.js.map