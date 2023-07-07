import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from '../../Services/book/book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../../data/Models/book.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
