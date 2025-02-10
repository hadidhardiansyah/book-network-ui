import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const bookRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/book-list/book-list.component').then(
            (m) => m.BookListComponent
          ),
      },
      {
        path: 'my-books',
        loadComponent: () =>
          import('./pages/my-books/my-books.component').then(
            (m) => m.MyBooksComponent
          ),
      },
    ],
  },
];
