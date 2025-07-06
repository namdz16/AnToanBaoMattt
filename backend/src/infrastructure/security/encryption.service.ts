import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { randomBytes } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly desKey = '123456789012345678901234'; // 24 ký tự cho 3DES
  private readonly desIV = '12345678'; // 8 ký tự cho IV

  generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  sha256(value: string): string {
    return CryptoJS.SHA256(value).toString();
  }

  tripleDESEncrypt(value: string): string {
    return CryptoJS.TripleDES.encrypt(
      value,
      CryptoJS.enc.Utf8.parse(this.desKey),
      {
        iv: CryptoJS.enc.Utf8.parse(this.desIV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();
  }

  tripleDESDecrypt(cipherText: string): string {
    const bytes = CryptoJS.TripleDES.decrypt(
      cipherText,
      CryptoJS.enc.Utf8.parse(this.desKey),
      {
        iv: CryptoJS.enc.Utf8.parse(this.desIV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  secureHash(username: string, password: string, salt: string): string {
    const hashedUsername = this.sha256(username);
    const hashedPassword = this.sha256(password + salt);
    const combined = this.sha256(hashedUsername + hashedPassword);
    return this.tripleDESEncrypt(combined);
  }
}