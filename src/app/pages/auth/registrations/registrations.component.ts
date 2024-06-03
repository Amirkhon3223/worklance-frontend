import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { Employer, JobSeeker } from '../../../models/users';
import { RegistrationService } from '../../../core/services/auth/registration.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [InputFieldComponent, FormsModule, NgClass, NgIf, HttpClientModule],
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent {
  accountType = signal<string>('client');
  
  employerFormData = signal<Employer>({
    userId: 0,
    fullName: '',
    email: '',
    phoneNo: '',
    country: '',
    city: '',
    about: '',
    userType: 'Employer',
    age: 0,
    rating: 0,
    logoURL: '',
    socialLinks: []
  });

  jobSeekerFormData = signal<JobSeeker>({
    userId: 0,
    fullName: '',
    email: '',
    phoneNo: '',
    country: '',
    city: '',
    about: '',
    userType: 'JobSeeker',
    age: 0,
    rating: 0,
    experienceStatus: '',
    resumeURL: '',
    jobSeekerSkills: [],
    jobSeekerWorkExperiences: [],
    socialLinks: []
  });

  password: string = '';

  private registrationService = inject(RegistrationService);

  get email(): string {
    return this.accountType() === 'Employer'
      ? this.employerFormData().email
      : this.jobSeekerFormData().email;
  }

  set email(value: string) {
    if (this.accountType() === 'Employer') {
      this.employerFormData.set({
        ...this.employerFormData(),
        email: value
      });
    } else {
      this.jobSeekerFormData.set({
        ...this.jobSeekerFormData(),
        email: value
      });
    }
  }

  get mobileNo(): string {
    return this.accountType() === 'Employer'
      ? this.employerFormData().phoneNo
      : this.jobSeekerFormData().phoneNo;
  }

  set mobileNo(value: string) {
    if (this.accountType() === 'Employer') {
      this.employerFormData.set({
        ...this.employerFormData(),
        phoneNo: value
      });
    } else {
      this.jobSeekerFormData.set({
        ...this.jobSeekerFormData(),
        phoneNo: value
      });
    }
  }

  public setAccountType(type: string): void {
    this.accountType.set(type);
  }

  public submit(): void {
    const formData =
      this.accountType() === 'Employer'
        ? this.employerFormData()
        : this.jobSeekerFormData();

    const payload = {
      ...formData,
      password: this.password
    };
    console.log('Payload', payload);
    this.registrationService.registerUsers(payload).subscribe({
      next: response => {
        console.log(`${this.accountType()} registered Successfully`, response);
        alert(`${this.accountType()} registered successfully`);
      },
      error: (error: any) => {
        console.error(`Error registering user: ${this.accountType()}`, error);
      }
    });
  }
}
