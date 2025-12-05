"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { MOCK_DOCTORS } from '@/constants';
import { Button } from '@/components/ui/button';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { Calendar, Clock, Plus, Bell, CheckCircle, User as UserIcon } from 'lucide-react';

export default function PatientDashboard() {
  const router = useRouter();
  const { currentUser, appointments, cancelAppointment, addAppointment, setCurrentUser } = useApp();
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'patient') {
      router.push('/auth');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const myAppointments = appointments.filter(a => a.patientId === currentUser.id);
  const upcomingAppointments = myAppointments.filter(a => a.status === 'scheduled' || a.status === 'pending');
  const pastAppointments = myAppointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  const getDoctor = (id: string) => MOCK_DOCTORS.find(d => d.id === id);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">MedCare</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-900">{currentUser.name}</span>
              <span className="text-xs text-slate-500">{currentUser.phone}</span>
            </div>
            <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-slate-500" />
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Patient Dashboard</h1>
            <p className="text-slate-600">Manage your appointments and health records.</p>
          </div>
          <Button onClick={() => setIsBookingOpen(true)} className="shadow-lg shadow-slate-900/20">
            <Plus className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Appointments */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upcoming Section */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-500" />
                Upcoming Appointments
              </h2>
              
              <div className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center border border-slate-200 border-dashed">
                    <p className="text-slate-500">No upcoming appointments scheduled.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsBookingOpen(true)}>
                      Find a Doctor
                    </Button>
                  </div>
                ) : (
                  upcomingAppointments.map(apt => {
                    const doctor = getDoctor(apt.doctorId);
                    return (
                      <div key={apt.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex gap-4">
                            <img 
                              src={doctor?.image || 'https://via.placeholder.com/64'} 
                              alt={doctor?.name}
                              className="w-16 h-16 rounded-lg object-cover bg-slate-100"
                            />
                            <div>
                              <h3 className="font-semibold text-lg text-slate-900">{doctor?.name}</h3>
                              <p className="text-slate-500 text-sm">{doctor?.specialty}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {apt.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {apt.time}
                                </span>
                              </div>
                              <div className="mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  apt.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:flex-col gap-2">
                            <Button variant="danger" size="sm" onClick={() => cancelAppointment(apt.id)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

             {/* Past Section */}
             <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-4 text-slate-400">History</h2>
              <div className="space-y-4 opacity-70">
                 {pastAppointments.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">No past appointments.</p>
                 ) : (
                   pastAppointments.map(apt => {
                     const doctor = getDoctor(apt.doctorId);
                     return (
                      <div key={apt.id} className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-slate-900">{doctor?.name}</p>
                          <p className="text-xs text-slate-500">{apt.date} at {apt.time}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          apt.status === 'completed' ? 'bg-slate-200 text-slate-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                     )
                   })
                 )}
              </div>
             </section>
          </div>

          {/* Sidebar - Profile & Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">My Medical Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Medical History</label>
                  <p className="text-sm text-slate-700 mt-1">{currentUser.medicalHistory || 'None recorded'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase">Age</label>
                  <p className="text-sm text-slate-700 mt-1">{currentUser.age || 'N/A'} Years</p>
                </div>
                {currentUser.identificationUrl && (
                   <div>
                   <label className="text-xs font-medium text-slate-500 uppercase">Identification</label>
                   <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded flex items-center gap-2">
                     <CheckCircle className="w-4 h-4 text-green-500" />
                     <span className="text-xs text-slate-600">Document Uploaded</span>
                   </div>
                 </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Bell className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    You will receive text alerts for appointment confirmations and reminders at <span className="font-mono bg-white/10 px-1 rounded">{currentUser.phone}</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <AppointmentForm 
            onCancel={() => setIsBookingOpen(false)}
            onSubmit={(data) => {
              addAppointment(data);
              setIsBookingOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}