import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { User } from '../../../models/users';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);
  isLoading = signal<boolean>(true); // Новый сигнал

  private apiUrl = `${environment.apiUrl}api/auth`;
  private errorHandler = inject(ErrorHandlerService);
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {
    this.loadUserFromToken();
  }

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<{ user: User; token: string }> {
    return this.http
      .post<{ user: User; token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.setSession(response.token);
          this.currentUser.set(response.user);
          this.isLoggedIn.set(true);
          this.isLoading.set(false); // Завершение загрузки
        }),
        catchError(
          this.errorHandler.handleError<{ user: User; token: string }>('login')
        )
      );
  }

  public logout(): void {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']);
  }

  public setSession(token: string): void {
    this.cookieService.set('authToken', token);
    this.loadUserFromToken(); // Загрузка пользователя после установки сессии
  }

  public getSession(): string | null {
    return this.cookieService.get('authToken');
  }

  public loadUserFromToken(): void {
    const token = this.getSession();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Loaded user from token:', payload); // Debug log
        this.fetchUserDetails(payload.userId);
      } catch (error) {
        console.error('Error parsing token payload:', error); // Debug log
        this.currentUser.set(null);
        this.isLoggedIn.set(false);
        this.isLoading.set(false); // Завершение загрузки при ошибке
      }
    } else {
      console.log('No token found in cookies'); // Debug log
      this.currentUser.set(null);
      this.isLoggedIn.set(false);
      this.isLoading.set(false); // Завершение загрузки при отсутствии токена
    }
  }

  public getUserName(): string | null {
    return this.currentUser()?.fullName || null;
  }

  public getUserType(): string | null {
    return this.currentUser()?.userType || null;
  }

  private fetchUserDetails(userId: string): void {
    this.http
      .get<User>(`${this.apiUrl}/user/${userId}`)
      .pipe(
        tap(user => {
          this.currentUser.set(user);
          this.isLoggedIn.set(true);
          this.isLoading.set(false); // Завершение загрузки после получения данных пользователя
        }),
        catchError(this.errorHandler.handleError<User>('fetchUserDetails'))
      )
      .subscribe();
  }
}
