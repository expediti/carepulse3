import React, { useState } from 'react';
import { MOCK_DOCTORS } from '../../constants';
import { Doctor, Appointment } from '../../types';
import { Button } from '../ui/button';
import { X, Calendar as CalIcon, Clock, Check, User } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Omit<Appointment, 'id' | 'status'>) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && selectedDoctor) setStep(2);
    else if (step === 2 && selectedDate && selectedTime) setStep(3);
  };

  const handleConfirm = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      onConfirm({
        patientId: '', // Added by App
        patientName: '', // Added by App
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
        notes: 'Mobile booking'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-slate-900/50 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          {/* Header */}
          <div className="bg-white px-4 py-3 sm:px-6 flex justify-between items-center border-b border-slate-100">
            <h3 className="text-lg font-semibold leading-6 text-slate-900">
              {step === 1 && 'Select a Specialist'}
              {step === 2 && 'Choose Date & Time'}
              {step === 3 && 'Confirm Booking'}
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-4 py-5 sm:p-6 max-h-[70vh] overflow-y-auto">
            
            {/* Step 1: Doctor Selection */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_DOCTORS.map(doc => (
                  <div 
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-4 ${
                      selectedDoctor?.id === doc.id 
                        ? 'border-slate-900 ring-1 ring-slate-900 bg-slate-50' 
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-medium text-slate-900">{doc.name}</h4>
                      <p className="text-sm text-slate-500">{doc.specialty}</p>
                    </div>
                    {selectedDoctor?.id === doc.id && <Check className="w-5 h-5 text-slate-900 ml-auto" />}
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Available Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                       {selectedDoctor?.availability.map(time => (
                         <button
                           key={time}
                           onClick={() => setSelectedTime(time)}
                           className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                             selectedTime === time
                               ? 'bg-slate-900 text-white border-slate-900'
                               : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                           }`}
                         >
                           {time}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && selectedDoctor && (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CalIcon className="w-8 h-8 text-green-600" />
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 mb-2">Appointment Summary</h4>
                 <p className="text-slate-600 mb-6">Please verify the details below before confirming.</p>
                 
                 <div className="bg-white rounded-lg p-4 text-left space-y-3 shadow-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Doctor</span>
                      <span className="font-medium text-slate-900">{selectedDoctor.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Specialty</span>
                      <span className="font-medium text-slate-900">{selectedDoctor.specialty}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Date</span>
                      <span className="font-medium text-slate-900">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Time</span>
                      <span className="font-medium text-slate-900">{selectedTime}</span>
                    </div>
                 </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
            {step === 3 ? (
              <Button onClick={handleConfirm} className="w-full sm:w-auto">Confirm Booking</Button>
            ) : (
              <Button 
                onClick={handleNext} 
                disabled={step === 1 ? !selectedDoctor : (!selectedDate || !selectedTime)}
                className="w-full sm:w-auto"
              >
                Continue
              </Button>
            )}
            
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(s => s - 1 as 1|2|3)} className="w-full sm:w-auto mt-2 sm:mt-0">
                Back
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};