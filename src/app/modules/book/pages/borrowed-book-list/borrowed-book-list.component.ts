import {
  BorrowedBookResponse,
  FeedbackRequest,
  PageResponseBorrowedBookResponse,
} from '@/app/services/models';
import { BookService, FeedbackService } from '@/app/services/services';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../components/rating/rating.component';

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [
    // Components Standalone
    RatingComponent,

    // Angular Modules
    CommonModule,
    FormsModule,
  ],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss',
})
export class BorrowedBookListComponent implements OnInit {
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook: BorrowedBookResponse = {};
  feedbackRequest: FeedbackRequest = {
    bookId: 0,
    comment: '',
    note: 0,
  };

  page: number = 0;
  size: number = 5;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  returnBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService
      .returnBorrowBook({
        'book-id': this.selectedBook?.id as number,
      })
      .subscribe({
        next: () => {
          if (withFeedback) {
            this.giveFeedback();
          }

          this.selectedBook = {};
          this.findAllBorrowedBooks();
        },
      });
  }

  private giveFeedback() {
    this.feedbackService
      .saveFeedback({
        body: this.feedbackRequest,
      })
      .subscribe({
        next: () => {},
      });
  }

  private findAllBorrowedBooks() {
    this.bookService
      .findAllBorrowedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (res) => {
          this.borrowedBooks = res;
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page = (this.borrowedBooks.totalPages as number) - 1;
    this.findAllBorrowedBooks();
  }

  get isLastPage(): boolean {
    if (this.borrowedBooks.totalPages !== 0) {
      return this.page === (this.borrowedBooks.totalPages as number) - 1;
    } else {
      return true;
    }
  }
}
