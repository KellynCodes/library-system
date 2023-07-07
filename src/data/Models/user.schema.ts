import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  @ApiProperty({
    description: 'Users full name',
    example: 'kellyncodes',
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: 'username',
    example: 'kellyncodes',
  })
  username: string;

  @ApiProperty({
    description: 'User email',
    example: 'kellyncodes@gmail.com',
  })
  @Prop({ unique: [true, 'User already exist.'] })
  email: string;

  @Prop()
  @ApiProperty({
    description: 'username',
    example: 'Wkr6ltYqglaQr39fadf',
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
