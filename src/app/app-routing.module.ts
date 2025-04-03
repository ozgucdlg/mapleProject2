import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'services', component: ServicesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
