import React from 'react';

export type UserRole = 'patient' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  medicalHistory?: string;
  age?: number;
  identificationUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availability: string[]; // e.g., ["09:00", "10:00"]
}

export type AppointmentStatus = 'scheduled' | 'pending' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  date: string; // ISO Date string YYYY-MM-DD
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}