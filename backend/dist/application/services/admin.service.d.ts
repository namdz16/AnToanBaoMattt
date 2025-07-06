import { AdminRepository } from '../../domain/interfaces/admin.repository';
import { Admin } from '../../infrastructure/database/models/admin.model';
export declare class AdminService {
    private readonly adminRepo;
    constructor(adminRepo: AdminRepository);
    findByUsername(username: string): Promise<any>;
    create(admin: Partial<Admin>): Promise<any>;
    update(username: string, update: Partial<Admin>): Promise<any>;
    delete(username: string): Promise<void>;
}
