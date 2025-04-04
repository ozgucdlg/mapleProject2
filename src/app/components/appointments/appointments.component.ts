import { Component, OnInit } from '@angular/core';
import { AppointmentService, Appointment } from '../../services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  error = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    console.log('AppointmentsComponent initialized');
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.error = '';
    
    console.log('Attempting to load appointments from API...');
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        console.log('Appointments loaded successfully:', data);
        this.appointments = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.error = `Failed to load appointments: ${error.message || error}`;
        this.loading = false;
      }
    });
  }

  formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
