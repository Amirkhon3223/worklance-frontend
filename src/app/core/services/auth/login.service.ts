import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { User } from '../../../models/users';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}api/auth`;

  private errorHandler = inject(ErrorHandlerService);
  private cookieService: CookieService;
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor(cookieService: CookieService) {
    this.cookieService = cookieService;
  }

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<{ user: User; token: string }> {
    return this.http
      .post<{ user: User; token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(
          this.errorHandler.handleError<{ user: User; token: string }>('login')
        )
      );
  }

  public logout(): void {
    this.cookieService.delete('authToken');
    this.router.navigate(['/login']);
  }

  public setSession(token: string): void {
    this.cookieService.set('authToken', token);
  }

  public getSession(): string | null {
    return this.cookieService.get('authToken');
  }

  public isLoggedIn(): boolean {
    return !!this.getSession();
  }

  public getUserType(): string | null {
    const token = this.getSession();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userType;
    }
    return null;
  }

  public getUserName(): string | null {
    const token = this.getSession();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.fullName || null;  // Assuming the JWT contains a fullName field
    }
    return null;
  }
}
