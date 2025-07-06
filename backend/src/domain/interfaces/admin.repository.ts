export interface AdminRepository {
  findByUsername(username: string): Promise<any>;
  create(admin: any): Promise<any>;
  update(username: string, update: any): Promise<any>;
  delete(username: string): Promise<void>;
}
