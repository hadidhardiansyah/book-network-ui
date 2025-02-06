import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach((link) => {
      link.classList.remove('active');
    });
    linkColor.forEach((link) => {
      link.addEventListener('click', () => {
        linkColor.forEach((l) => l.classList.remove('active'));

        link.classList.add('active');
      });
    });
  }

  logout() {}
}
