import { Component, computed, inject, OnInit, signal } from '@angular/core';

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
export class NavbarComponent implements OnInit {
  public loginService = inject(LoginService);

  navLinks: NavLink[] = [
    { path: '/home', label: 'Главная' },
    { path: '/jobs', label: 'Работы' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' }
  ];

  menuOpen = signal(false);
  isLoggedIn = computed(() => this.loginService.isLoggedIn());
  userName = computed(() => this.loginService.currentUser()?.fullName || null);
  userType = computed(() => this.loginService.currentUser()?.userType || null);
  isLoading = computed(() => this.loginService.isLoading());

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      console.log('USER NAME', this.userName());
    } else {
      console.log('User is not logged in'); // Debug log
    }
  }

  public toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  public logout() {
    this.loginService.logout();
  }
}
