import { Component, inject, signal } from '@angular/core';

import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../core/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, FormsModule, NgClass, NgIf, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginFormData = signal<{ email: string; password: string }>({
    email: '',
    password: ''
  });

  private loginService = inject(LoginService);
  private router = inject(Router);

  public submit(): void {
    const payload = this.loginFormData();

    this.loginService.login(payload).subscribe({
      next: response => {
        console.log('Login successful', response);
        alert('Login successful');
        this.loginService.setSession(response.token);
        this.router.navigate(['/home']);
      },
      error: (error: unknown) => {
        console.log('Error logging in user', error);
        alert('Login failed');
      }
    });
  }
}
