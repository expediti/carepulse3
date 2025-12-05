"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Calendar, Clock, Activity, ArrowRight, UserCheck, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="bg-slate-900 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">MedCare Connect</span>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" size="sm" onClick={handleGetStarted}>Sign In</Button>
             <Button size="sm" onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Accepting New Patients
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
                Your Health, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500">
                  Our Priority.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Experience the new standard in healthcare. Book top specialists instantly, manage medical records securely, and receive care when you need it most.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto" onClick={handleGetStarted}>
                  Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto bg-white" onClick={handleGetStarted}>
                  Patient Portal
                </Button>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 text-sm font-medium">
                <span className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Verified Doctors</span>
                <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Secure Data</span>
              </div>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Why Choose MedCare?</h2>
              <p className="mt-4 text-slate-600">Comprehensive care management at your fingertips.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <FeatureCard 
                 icon={<Calendar className="w-6 h-6 text-white" />}
                 title="Instant Scheduling"
                 description="Browse doctor availability in real-time and book appointments that fit your schedule perfectly."
               />
               <FeatureCard 
                 icon={<Activity className="w-6 h-6 text-white" />}
                 title="Digital Health Records"
                 description="Securely upload and access your medical history and ID documents. Never lose a prescription again."
               />
               <FeatureCard 
                 icon={<Clock className="w-6 h-6 text-white" />}
                 title="Smart Notifications"
                 description="Stay on track with automated SMS reminders for upcoming appointments and status updates."
               />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-white" />
              <span className="font-bold text-xl text-white tracking-tight">MedCare Connect</span>
            </div>
            <div className="flex gap-6 mb-8 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
            <p className="text-sm text-slate-500">© 2024 MedCare Connect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);