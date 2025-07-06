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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const CryptoJS = __importStar(require("crypto-js"));
const crypto_1 = require("crypto");
let EncryptionService = class EncryptionService {
    constructor() {
        this.desKey = '123456789012345678901234'; // 24 ký tự cho 3DES
        this.desIV = '12345678'; // 8 ký tự cho IV
    }
    generateSalt() {
        return (0, crypto_1.randomBytes)(16).toString('hex');
    }
    sha256(value) {
        return CryptoJS.SHA256(value).toString();
    }
    tripleDESEncrypt(value) {
        return CryptoJS.TripleDES.encrypt(value, CryptoJS.enc.Utf8.parse(this.desKey), {
            iv: CryptoJS.enc.Utf8.parse(this.desIV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString();
    }
    tripleDESDecrypt(cipherText) {
        const bytes = CryptoJS.TripleDES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(this.desKey), {
            iv: CryptoJS.enc.Utf8.parse(this.desIV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    secureHash(username, password, salt) {
        const hashedUsername = this.sha256(username);
        const hashedPassword = this.sha256(password + salt);
        const combined = this.sha256(hashedUsername + hashedPassword);
        return this.tripleDESEncrypt(combined);
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)()
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map