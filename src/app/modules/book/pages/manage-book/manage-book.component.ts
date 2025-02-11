import { BookRequest } from '@/app/services/models';
import { BookService } from '@/app/services/services';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent {
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };
  errorMsg: Array<string> = [];
  selectedBookCover: any;
  selectedPicture: string | undefined;

  constructor(private bookService: BookService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];

    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService
      .saveBook({
        body: this.bookRequest,
      })
      .subscribe({
        next: (bookId) => {
          this.bookService
            .uploadBookCoverPicture({
              'book-id': bookId,
              body: {
                file: this.selectedBookCover,
              },
            })
            .subscribe({
              next: () => {
                this.router.navigate(['/books/my-books']);
              },
            });
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        },
      });
  }
}
