import { User } from './../../../data/Models/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  isEnum,
  isNotEmpty,
  isNumber,
  isString,
} from 'class-validator';
import { Category } from 'src/data/Enums/Category';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'Dev in the sea',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @ApiProperty({
    description: 'Book description',
    example: 'The description of in the sea',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @ApiProperty({
    description: 'Title of the book',
    example: 'Dev in the sea',
  })
  @IsNotEmpty()
  @IsString()
  readonly author: string;
  @ApiProperty({
    description: 'Title of the book',
    example: 'Dev in the sea',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @ApiProperty({
    description: 'Title of the book',
    example: 'Dev in the sea',
  })
  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'You cannot pass user Id.' })
  readonly user: User;
}
