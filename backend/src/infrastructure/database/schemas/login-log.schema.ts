import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LoginLog extends Document {
  @Prop({ required: true, type: String })
  username!: string;

  @Prop({ required: true, type: Boolean })
  success!: boolean;

  @Prop({ default: Date.now, type: Date })
  timestamp!: Date;
}

export const LoginLogSchema = SchemaFactory.createForClass(LoginLog);