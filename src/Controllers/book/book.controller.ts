import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BookService } from 'src/Services/book/book.service';
import { Book } from 'src/data/Models/book.schema';
import { CreateBookDto } from '../../Services/book/Dto/createBookDto';
import { UpdateBookDto } from '../../Services/book/Dto/updateBookDto';
import { Error, ObjectId } from 'mongoose';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body() book: CreateBookDto,
    @Req() req: any,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Put('/update/:_id')
  async updateBook(
    @Param() _id: ObjectId,
    @Body() model: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(_id, model);
  }

  @Delete(':_id')
  async deleteBook(@Param() _id: ObjectId): Promise<Book> {
    return this.bookService.deleteById(_id);
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all the available book with pagination available',
    type: Book,
  })
  @ApiBadRequestResponse({
    description: 'Validation Error Occured.',
    type: Error,
  })
  async getAllBook(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Get(':_id')
  async getBook(@Param() id: ObjectId): Promise<Book> {
    return this.bookService.findById(id);
  }
}
