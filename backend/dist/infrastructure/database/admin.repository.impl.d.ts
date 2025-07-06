import { Admin } from './models/admin.model';
import { Model } from 'mongoose';
export declare class AdminRepository {
    private adminModel;
    constructor(adminModel: Model<Admin>);
    findByUsername(username: string): Promise<Admin | null>;
    create(admin: Partial<Admin>): Promise<Admin>;
    update(username: string, update: Partial<Admin>): Promise<Admin | null>;
    delete(username: string): Promise<void>;
}
