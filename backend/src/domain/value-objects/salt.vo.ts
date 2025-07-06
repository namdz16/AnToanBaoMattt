export class SaltVO {
  constructor(public readonly value: string) {
    if (!value || value.length < 16) {
      throw new Error('Salt không hợp lệ');
    }
  }
}