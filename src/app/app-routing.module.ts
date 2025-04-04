import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ServicesComponent } from './components/services/services.component';
import { AppointmentFormComponent } from './components/appointments/appointment-form/appointment-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected routes
  { 
    path: 'dashboard', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'appointments', 
    component: AppointmentsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'appointments/book', 
    component: AppointmentFormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'doctors', 
    component: DoctorsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'services', 
    component: ServicesComponent, 
    canActivate: [AuthGuard] 
  },
  
  // Redirect to login by default
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Catch all route (fallback)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
