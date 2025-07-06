export class PasswordVO {
  constructor(public readonly value: string) {
    if (!value || value.length < 6) {
      throw new Error('Password phải có ít nhất 6 ký tự');
    }
  }
}