import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from '../users/dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }
    @Post('post')
    postGenre(@Body() book: CreateBookDto) {
        return this.booksService.insert(book);
    }
    @Get()
    getAll() {
        return this.booksService.getAllBooks();
    }

    @Delete('delete/:bookId')
    deleteBook(@Param('bookId') bookId: Number) {
        return this.booksService.deleteBook(bookId);
    }
}
