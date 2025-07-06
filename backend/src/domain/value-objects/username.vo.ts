export class UsernameVO {
  constructor(public readonly value: string) {
    if (!value || value.length < 4) {
      throw new Error('Username phải có ít nhất 4 ký tự');
    }
  }
}