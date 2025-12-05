import React, { useState } from 'react';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Phone, User as UserIcon, FileText, Upload, Shield } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Registration State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [history, setHistory] = useState('');
  const [idFile, setIdFile] = useState<File | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation: Admin login check
    if (phoneNumber === '0000') {
      onLogin({
        id: 'admin',
        name: 'Administrator',
        phone: phoneNumber,
        role: 'admin'
      });
      return;
    }
    
    // Simple patient login simulation
    if (phoneNumber.length >= 10) {
       onLogin({
        id: 'u-' + phoneNumber,
        name: 'Returning Patient',
        phone: phoneNumber,
        role: 'patient',
        medicalHistory: 'No significant history.'
      });
    } else {
      alert('Please enter a valid phone number');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNumber || !age) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate successful registration
    onLogin({
      id: 'u-' + Date.now(),
      name,
      phone: phoneNumber,
      age: parseInt(age),
      medicalHistory: history,
      identificationUrl: idFile ? URL.createObjectURL(idFile) : undefined,
      role: 'patient'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-8 text-center">
          <div className="mx-auto bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">MedCare Connect</h1>
          <p className="text-slate-400 mt-2">Your health, our priority.</p>
        </div>

        <div className="p-8">
          {isRegistering ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Patient Registration</h2>
              
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <Input
                  label="Age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Medical History</label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 h-24 resize-none"
                  placeholder="Brief medical history (allergies, conditions...)"
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Identification Document</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-4 hover:bg-slate-50 transition-colors text-center cursor-pointer">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                    accept="image/*,.pdf"
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">
                      {idFile ? idFile.name : 'Upload ID (Driver\'s License/Passport)'}
                    </span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" size="lg">
                Complete Registration
              </Button>
              
              <p className="text-center text-sm text-slate-600 mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-slate-900 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
               <h2 className="text-xl font-semibold text-slate-900 mb-6">Welcome Back</h2>
              
              <div className="space-y-4">
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  type="tel"
                />
                <p className="text-xs text-slate-500">Tip: Use '0000' for Admin access.</p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In with OTP
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">New to MedCare?</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsRegistering(true)}
              >
                Create Account
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};