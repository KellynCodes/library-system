import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Book } from '../../data/Models/book.schema';
import { UpdateBookDto } from 'src/Services/book/Dto/updateBookDto';
import { User } from 'src/data/Models/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    return await this.bookModel.create(book);
  }

  async updateById(_id: ObjectId, model: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(_id, model, {
      new: true,
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async deleteById(_id: ObjectId) {
    const book = await this.bookModel.findByIdAndDelete(_id);
    if (!book) {
      throw new NotFoundException(Book, 'Book not found');
    }
    return book;
  }

  async findAll(query: Query) {
    console.log(query);

    const resPerPage: number = 2;
    const currentPage: number = Number(query.page) ?? 1;
    const skip: number = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    return await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
  }

  async findById(id: ObjectId) {
    const isValidId: boolean = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Invalid Id');
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException(Book, 'Book not found');
    }
    return book;
  }
}
