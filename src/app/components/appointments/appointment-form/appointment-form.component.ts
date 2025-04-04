import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../services/appointment.service';
import { DoctorService, Doctor } from '../../../services/doctor.service';
import { PatientService, Patient } from '../../../services/patient.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  timeSlots: string[] = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];
  loading = false;
  submitted = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private authService: AuthService
  ) {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      reason: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();
  }

  // Load all doctors
  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
        this.error = 'Failed to load doctors.';
      }
    });
  }

  // Load all patients
  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        this.error = 'Failed to load patients.';
      }
    });
  }

  // Getter for form controls
  get f() { return this.appointmentForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // Stop if form is invalid
    if (this.appointmentForm.invalid) {
      return;
    }

    this.loading = true;

    // Format the date
    const formValue = this.appointmentForm.value;
    const appointmentDate = new Date(formValue.appointmentDate);
    
    const appointmentData = {
      patientId: formValue.patientId,
      doctorId: formValue.doctorId,
      appointmentDate: appointmentDate.toISOString(),
      timeSlot: formValue.timeSlot,
      reason: formValue.reason,
      notes: formValue.notes
    };

    this.appointmentService.createAppointment(appointmentData).subscribe({
      next: (appointment) => {
        this.loading = false;
        this.success = 'Appointment booked successfully!';
        // Reset form
        this.appointmentForm.reset();
        this.submitted = false;
        
        // Navigate to appointments list after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/appointments']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error booking appointment:', error);
        this.error = error.error?.message || 'Failed to book appointment. Please try again.';
      }
    });
  }
} 