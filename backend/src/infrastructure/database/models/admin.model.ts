import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  salt!: string;

  @Prop({ required: true })
  encryptedPassword!: string;

  @Prop({ default: 0 })
  failAttempts!: number;

  @Prop({ default: false })
  isLocked!: boolean;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
