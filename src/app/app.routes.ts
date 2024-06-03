import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobListingComponent } from './pages/job-listing/job-listing.component';
import { CreateNewJobComponent } from './pages/create-new-job/create-new-job.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationsComponent } from './pages/auth/registrations/registrations.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sign-up',
    component: RegistrationsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'job-detail',
    component: JobDetailsComponent
  },
  {
    path: 'job-list',
    component: JobListingComponent
  },
  {
    path: 'create-job',
    component: CreateNewJobComponent
  },
  {
    path: 'my-jobs',
    component: JobDetailsComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];
