
import React, { useState, useEffect } from 'react';
import { User, Appointment, AppointmentStatus } from './types';
import { INITIAL_APPOINTMENTS } from './constants';
import { AuthScreen } from './components/Auth/AuthScreen';
import { PatientDashboard } from './components/Patient/Dashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { LandingPage } from './components/LandingPage';

// Simple Notification Component
const Notification = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transform transition-all animate-in slide-in-from-top-2 ${
      type === 'success' ? 'bg-slate-900' : 'bg-red-600'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    showNotification(`Welcome back, ${user.name}`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLanding(true); // Return to landing page on logout
  };

  const handleBookAppointment = (data: Omit<Appointment, 'id' | 'status'>) => {
    if (!currentUser) return;
    
    const newAppointment: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      patientId: currentUser.id,
      patientName: currentUser.name,
      status: 'pending' // Default to pending for admin approval simulation
    };

    setAppointments(prev => [...prev, newAppointment]);
    showNotification(`Booking Request Sent! SMS sent to ${currentUser.phone}`, 'success');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
    showNotification('Appointment cancelled successfully.', 'success');
  };

  const handleAdminUpdateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
    showNotification(`Appointment marked as ${status}`, 'success');
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <div className="antialiased text-slate-900 min-h-screen pb-6">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      {!currentUser ? (
        <AuthScreen onLogin={handleLogin} />
      ) : currentUser.role === 'admin' ? (
        <AdminDashboard 
          appointments={appointments} 
          onUpdateStatus={handleAdminUpdateStatus}
          onLogout={handleLogout}
        />
      ) : (
        <PatientDashboard 
          user={currentUser}
          appointments={appointments}
          onBookAppointment={handleBookAppointment}
          onCancelAppointment={handleCancelAppointment}
          onLogout={handleLogout}
        />
      )}

      {/* Footer Credit - Only visible when inside the app (Landing page has its own footer) */}
      <footer className="fixed bottom-0 w-full text-center py-2 text-[10px] text-slate-400 pointer-events-none bg-gradient-to-t from-white via-white to-transparent z-10">
        created by nidhi and kashish
      </footer>
    </div>
  );
}
