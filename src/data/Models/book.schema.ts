import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../Enums/Category';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  @ApiProperty({ description: 'Title of the book', example: 'The wolf' })
  title: string;

  @Prop()
  @ApiProperty({
    description: 'Book description',
    example: 'The wolf devouring the hunter',
  })
  description: string;

  @Prop()
  @ApiProperty({ description: 'Author of the book', example: 'KellynCodes' })
  author: string;

  @Prop()
  @ApiProperty({
    description: 'Category of the book',
    example: 'genre',
  })
  category: Category;

  @ApiProperty({
    description: 'Foreign key to users table',
    example: 'genre',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
