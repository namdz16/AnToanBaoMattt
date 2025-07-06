export declare class EncryptionService {
    private readonly desKey;
    private readonly desIV;
    generateSalt(): string;
    sha256(value: string): string;
    tripleDESEncrypt(value: string): string;
    tripleDESDecrypt(cipherText: string): string;
    secureHash(username: string, password: string, salt: string): string;
}
