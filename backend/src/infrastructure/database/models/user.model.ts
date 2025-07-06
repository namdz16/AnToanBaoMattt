import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
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

export const UserSchema = SchemaFactory.createForClass(User);
