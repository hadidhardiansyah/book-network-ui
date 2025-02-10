import { CommonModule } from '@angular/common';
import { BookResponse, PageResponseBookResponse } from '@/app/services/models';
import { BookService } from '@/app/services/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    // Components Standalone
    BookCardComponent,

    // Angular Module
    CommonModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

  message: string = '';
  level: string = 'success';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
        },
        error: (err) => {
          console.log('Error getting book data', err);
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = (this.bookResponse.totalPages as number) - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page === (this.bookResponse.totalPages as number) - 1;
  }

  borrowBook(book: BookResponse) {
    this.message = '';
    this.bookService
      .borrowBook({
        'book-id': book.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book successfully added to your list';
        },
        error: (err) => {
          this.level = 'error';
          this.message = err.error.error;
        },
      });
  }
}
