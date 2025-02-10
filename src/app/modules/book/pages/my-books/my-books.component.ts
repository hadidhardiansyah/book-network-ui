import { BookResponse, PageResponseBookResponse } from '@/app/services/models';
import { BookService } from '@/app/services/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [
    // Components Standalone
    BookCardComponent,

    // Angular Module
    CommonModule,
  ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
})
export class MyBooksComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 5;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooksByOwner({
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
    if (this.bookResponse.totalPages !== 0) {
      return this.page === (this.bookResponse.totalPages as number) - 1;
    } else {
      return true;
    }
  }

  archiveBook(book: BookResponse) {}

  shareBook(book: BookResponse) {}

  editBook(book: BookResponse) {}
}
