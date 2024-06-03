import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { LoginService } from '../../core/services/auth/login.service';

interface NavLink {
  path: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgClass, NgForOf, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = signal(false);

  navLinks: NavLink[] = [
    { path: '/home', label: 'Главная' },
    { path: '/jobs', label: 'Работы' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' }
  ];
  
  public loginService = inject(LoginService);

  public toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  public logout() {
    this.loginService.logout();
  }
}
