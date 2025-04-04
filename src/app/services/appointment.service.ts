import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Appointment {
  _id?: string;
  patient: string | any;
  doctor: string | any;
  appointmentDate: Date;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  createdBy: string | any;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // Using the base URL from environment
  private apiUrl = `${environment.apiUrl}/appointments`;

  constructor(private http: HttpClient) {
    console.log('AppointmentService initialized with API URL:', this.apiUrl);
  }

  // Get all appointments
  getAppointments(): Observable<Appointment[]> {
    console.log('Fetching appointments from:', this.apiUrl);
    return this.http.get<Appointment[]>(this.apiUrl)
      .pipe(
        tap(appointments => console.log('Appointments fetched:', appointments.length)),
        catchError(error => {
          console.error('Error fetching appointments:', error);
          throw error;
        })
      );
  }

  // Get appointment by ID
  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  // Create appointment
  createAppointment(appointmentData: any): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointmentData);
  }

  // Update appointment
  updateAppointment(id: string, appointmentData: any): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}`, appointmentData);
  }

  // Delete appointment
  deleteAppointment(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
} 