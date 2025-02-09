import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    // Components Standalone
    MenuComponent,

    // Angular Modules
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
