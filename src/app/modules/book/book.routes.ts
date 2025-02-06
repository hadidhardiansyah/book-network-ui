import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';

export const bookRoutes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
  },
];
