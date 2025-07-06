import { Document } from 'mongoose';
export declare class LoginLog extends Document {
    username: string;
    success: boolean;
    timestamp: Date;
}
export declare const LoginLogSchema: import("mongoose").Schema<LoginLog, import("mongoose").Model<LoginLog, any, any, any, Document<unknown, any, LoginLog, any> & LoginLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LoginLog, Document<unknown, {}, import("mongoose").FlatRecord<LoginLog>, {}> & import("mongoose").FlatRecord<LoginLog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
