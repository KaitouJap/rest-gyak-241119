import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  books : Book[] = [
    {
      id: 0,
      title: "Carrie",
      author: "Stephen King",
      isbn: "978-0-385-08695-0",
      publishYear: 1974,
      reserved: false
    },
    {
      id: 1,
      title: "'Salem's Lot",
      author: "Stephen King",
      isbn: "978-0-385-00751-1",
      publishYear: 1975,
      reserved: true
    },
    {
      id: 2,
      title: "The Shining",
      author: "Stephen King",
      isbn: "978-0-385-12167-5",
      publishYear: 1977,
      reserved: false
    }
  ];
  nextID = 3;

  create(createBookDto: CreateBookDto) {
    const newBook: Book = {
      ...createBookDto,
      id: this.nextID++,
      reserved: false,
    }

    this.books.push(newBook);
    return ;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find(book => book.id == id);
    if(!book) throw new NotFoundException("Nem letezik a konyv amit keresel!");
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const origBookID = this.books.findIndex(book => book.id == id);
    if(origBookID == -1) throw new NotFoundException("Nem letezik a konyv!");

    const origBook = this.books[origBookID];
    const newBook: Book = {
      ...origBook,
      ...updateBookDto,
    }

    this.books[origBookID] = newBook;
    return newBook;
  }

  remove(id: number) {
    const idx = this.books.findIndex(book => book.id == id);
    if(idx == -1) throw new NotFoundException("Nem letezik a konyv amit torolni szeretnel!");
    this.books.splice(idx,1);
  }
}
