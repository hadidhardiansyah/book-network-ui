import {
  BorrowedBookResponse,
  PageResponseBorrowedBookResponse,
} from '@/app/services/models';
import { BookService } from '@/app/services/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss',
})
export class ReturnBooksComponent implements OnInit {
  returnedBooks: PageResponseBorrowedBookResponse = {};

  page: number = 0;
  size: number = 5;

  message: string = '';
  level: string = 'success';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService
      .findAllReturnedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (res) => {
          this.returnedBooks = res;
        },
      });
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'The book is not yet return ';
      return;
    }
    this.bookService
      .approveReturnBorrowBook({
        'book-id': book.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book return approved';
          this.findAllReturnedBooks();
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = (this.returnedBooks.totalPages as number) - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    if (this.returnedBooks.totalPages !== 0) {
      return this.page === (this.returnedBooks.totalPages as number) - 1;
    } else {
      return true;
    }
  }
}
