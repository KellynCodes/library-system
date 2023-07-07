import { User } from './../../../data/Models/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from 'src/data/Enums/Category';

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'Dev in the sea',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Author of the bool',
    example: 'Kelly',
  })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({
    description: 'Price of the book',
    example: 5000,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'Category of the book',
    example: 'Adventure',
  })
  @IsNotEmpty()
  @IsEnum(Category, { message: 'Enter a valid category' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user Id.' })
  readonly user: User;
}
