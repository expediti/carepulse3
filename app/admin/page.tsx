"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { Users, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { currentUser, appointments, updateAppointmentStatus, setCurrentUser } = useApp();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/auth');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const scheduled = appointments.filter(a => a.status === 'scheduled').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">MedAdmin</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-white">
            <Calendar className="w-5 h-5" />
            Appointments
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            Patients
          </a>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 rounded-lg transition-colors mt-auto absolute bottom-4 w-[calc(100%-2rem)]">
            <XCircle className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-8 md:hidden">
            <span className="font-bold text-slate-900">MedAdmin Panel</span>
            <Button size="sm" variant="outline" onClick={handleLogout}>Logout</Button>
        </header>

        <div className="p-8 pb-20">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Appointments</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{total}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">{pending}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Scheduled</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{scheduled}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">{cancelled}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Manage Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{apt.patientName}</p>
                          <p className="text-xs text-slate-500">ID: {apt.patientId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span>{apt.date}</span>
                          <span className="text-slate-400">{apt.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                            apt.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {apt.status}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {apt.status === 'pending' && (
                           <>
                            <button 
                              onClick={() => updateAppointmentStatus(apt.id, 'scheduled')}
                              className="text-green-600 hover:text-green-800 font-medium text-xs border border-green-200 bg-green-50 px-3 py-1 rounded"
                            >
                              Approve
                            </button>
                           </>
                        )}
                        {apt.status !== 'cancelled' && (
                          <button 
                            onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                            className="text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 bg-red-50 px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {appointments.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}