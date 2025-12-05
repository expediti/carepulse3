import { Doctor, Appointment } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Hariom Dubey',
    specialty: 'Cardiologist',
    image: 'https://picsum.photos/100/100?random=1',
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00']
  },
  {
    id: 'd2',
    name: 'Dr. Anant Gupta',
    specialty: 'Dermatologist',
    image: 'https://picsum.photos/100/100?random=2',
    availability: ['10:00', '11:30', '13:00', '16:00']
  },
  {
    id: 'd3',
    name: 'Dr. Harshit Gupta',
    specialty: 'Pediatrician',
    image: 'https://picsum.photos/100/100?random=3',
    availability: ['08:30', '09:30', '10:30', '12:00', '14:30']
  },
  {
    id: 'd4',
    name: 'Dr. Pranav Pandey',
    specialty: 'Neurologist',
    image: 'https://picsum.photos/100/100?random=4',
    availability: ['11:00', '13:00', '15:00', '17:00']
  },
  {
    id: 'd5',
    name: 'Dr. Ashish Tiwari',
    specialty: 'Orthopedic Surgeon',
    image: 'https://picsum.photos/100/100?random=5',
    availability: ['09:00', '12:00', '14:00', '16:00']
  },
  {
    id: 'd6',
    name: 'Dr. Ayushi Jaiswal',
    specialty: 'Gynecologist',
    image: 'https://picsum.photos/100/100?random=6',
    availability: ['10:00', '11:00', '13:00', '15:00']
  },
  {
    id: 'd7',
    name: 'Dr. Nidhi Yadav',
    specialty: 'General Practitioner',
    image: 'https://picsum.photos/100/100?random=7',
    availability: ['09:30', '10:30', '11:30', '14:30']
  },
  {
    id: 'd8',
    name: 'Dr. Kashish Yadav',
    specialty: 'Psychiatrist',
    image: 'https://picsum.photos/100/100?random=8',
    availability: ['11:00', '12:00', '15:00', '16:30']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'John Doe',
    doctorId: 'd1',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'scheduled',
    notes: 'Regular checkup'
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Jane Smith',
    doctorId: 'd2',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    status: 'pending',
    notes: 'Skin rash consultation'
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'Alice Johnson',
    doctorId: 'd1',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: '14:00',
    status: 'cancelled',
    notes: 'Patient requested cancellation'
  }
];