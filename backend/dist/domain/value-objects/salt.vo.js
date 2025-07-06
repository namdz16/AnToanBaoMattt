"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaltVO = void 0;
class SaltVO {
    constructor(value) {
        this.value = value;
        if (!value || value.length < 16) {
            throw new Error('Salt không hợp lệ');
        }
    }
}
exports.SaltVO = SaltVO;
//# sourceMappingURL=salt.vo.js.map