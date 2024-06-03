import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ErrorHandlerService } from './error-handler.service';
import { Employer, JobSeeker, User } from '../../../models/users';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = `${environment.apiUrl}api/auth`;

  private errorHandler = inject(ErrorHandlerService);
  constructor(
    private http: HttpClient,
  ) { }

  public registerUsers(user: Employer | JobSeeker): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.errorHandler.handleError<User>('registerUsers'))
    );
  }
}
