import React, { useState, useEffect } from 'react';
import { 
  SERVICES, 
  SPECIALISTS, 
  AVAILABLE_TIME_SLOTS, 
  CLINIC_INFO 
} from '../data/clinicData';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  buildWhatsAppUrl,
  submitBookingToWhatsAppApi
} from '../utils/whatsappBooking';

export default function BookingWizard({ preselectedService, preselectedDoctor, onResetPreselected }) {
  const [step, setStep] = useState(1);
  
  // Selection States
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedService?.id || SERVICES[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState(preselectedDoctor?.id || SPECIALISTS[0].id);
  const [appointmentType, setAppointmentType] = useState("In-Clinic Suite");

  // Date and Time
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // default tomorrow
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIME_SLOTS.morning[1]);

  // Patient Intake
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    painLevel: 5,
    chiefComplaint: "",
    hasImaging: false,
    hasPriorSurgery: false
  });

  const [bookingReference, setBookingReference] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [whatsappNotice, setWhatsappNotice] = useState("");

  // Sync if preselected props change
  useEffect(() => {
    if (preselectedService) {
      setSelectedServiceId(preselectedService.id);
    }
    if (preselectedDoctor) {
      setSelectedDoctorId(preselectedDoctor.id);
    }
  }, [preselectedService, preselectedDoctor]);

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const activeDoctor = SPECIALISTS.find(d => d.id === selectedDoctorId) || SPECIALISTS[0];

  // Validation
  const validateStep3 = () => {
    const newErrors = {};
    if (!patientData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!patientData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!patientData.email.trim() || !patientData.email.includes("@")) newErrors.email = "Valid email is required";
    if (!patientData.phone.trim() || patientData.phone.length < 8) newErrors.phone = "Valid contact phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (step === 3) {
      if (!validateStep3() || isSubmitting) return;
      
      // Generate booking reference & send details to clinic WhatsApp
      const ref = `ELAN-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingPayload = {
        bookingReference: ref,
        appointmentType,
        serviceTitle: activeService.title,
        serviceDuration: activeService.duration,
        doctorName: activeDoctor.name,
        selectedDate,
        selectedTime,
        ...patientData
      };

      const waUrl = buildWhatsAppUrl(bookingPayload, CLINIC_INFO.phone);
      setWhatsappUrl(waUrl);

      if (import.meta.env.VITE_USE_WHATSAPP_API === "true") {
        setIsSubmitting(true);
        try {
          await submitBookingToWhatsAppApi(bookingPayload);
          setWhatsappNotice("Appointment details were sent automatically to our clinic WhatsApp.");
        } catch {
          setWhatsappNotice("Automatic dispatch was unavailable—tap 'Send Details on WhatsApp' below.");
        } finally {
          setIsSubmitting(false);
        }
      } else {
        window.open(waUrl, "_blank", "noopener,noreferrer");
        setWhatsappNotice("WhatsApp opened with your booking summary—tap Send if it didn't open automatically.");
      }

      setBookingReference(ref);
      setStep(4);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1B382B', '#C29B38', '#DFBF6D', '#2A483A']
        });
      } catch (err) {
        // fallback if canvas blocked
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  // Generate .ics calendar download
  const handleDownloadCalendar = () => {
    const calendarDate = selectedDate.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Élan Physiotherapy//Appointment Booking//EN
BEGIN:VEVENT
SUMMARY:${activeService.title} - ${CLINIC_INFO.name}
DESCRIPTION:1-on-1 Doctoral Rehabilitation Session with ${activeDoctor.name}. Reference: ${bookingReference}
LOCATION:${CLINIC_INFO.address}
STATUS:CONFIRMED
DTSTART:${calendarDate}T100000Z
DTEND:${calendarDate}T111500Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Elan-Physio-Appointment-${bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate calendar dates for the next 14 days
  const upcomingDates = Array.from({ length: 14 }).map((_, index) => {
    const d = new Date();
    d.setDate(d.getDate() + index + 1);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const fullDate = d.toISOString().split('T')[0];
    return { dayName, dayNumber, monthName, fullDate };
  });

  return (
    <section id="booking" className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A37F2C] block">
            Priority Concierge Reservation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
            Schedule Your Clinical Evaluation
          </h2>
          <p className="text-[#4E5E55] text-base">
            Private 1-on-1 doctoral care. Choose your preferred specialist, treatment protocol, and date below.
          </p>
        </div>

        {/* Multi-step progress bar */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E6DDD0] -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#1B382B] -translate-y-1/2 transition-all duration-500 -z-0"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: "Protocol & Doctor" },
              { num: 2, label: "Date & Time" },
              { num: 3, label: "Patient Profile" },
              { num: 4, label: "Confirmation" }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  step > s.num 
                    ? 'bg-[#1B382B] text-[#DFBF6D]' 
                    : step === s.num
                      ? 'bg-[#1B382B] text-white ring-4 ring-[#DFBF6D]/30'
                      : 'bg-white text-gray-400 border border-[#DDD4C7]'
                }`}>
                  {step > s.num ? <Check className="w-4 h-4 stroke-3" /> : s.num}
                </div>
                <span className={`text-[11px] font-bold mt-2 whitespace-nowrap ${
                  step >= s.num ? 'text-[#1B382B]' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Booking Card Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#DFBF6D]/40 bg-white/95">
          
          {/* STEP 1: Select Protocol & Specialist */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1B382B] mb-1">
                  1. Select Clinical Protocol & Setting
                </h3>
                <p className="text-xs text-gray-500">
                  Select your treatment program and consultation venue.
                </p>

                {/* Consultation Venue Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  {[
                    { title: "In-Clinic Site", desc: "E.K. Road, Near Sainik Board, Meerut", fee: "Rs 0 addon" },
                    { title: "At-Home Visit", desc: "Doctor visits your residence", fee: "Rs 1000  fee" },
                    { title: "HD Telehealth", desc: "High-definition video consult", fee: "Save Rs 1000" }
                  ].map((venue) => (
                    <button
                      key={venue.title}
                      type="button"
                      onClick={() => setAppointmentType(venue.title)}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        appointmentType === venue.title
                          ? 'border-[#1B382B] bg-[#FAF7F2] ring-2 ring-[#1B382B]/20'
                          : 'border-[#E3D9CC] bg-white hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#1B382B]">{venue.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{venue.desc}</p>
                      <span className="inline-block text-[10px] font-semibold text-[#A37F2C] mt-1">{venue.fee}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2A483A] block mb-3">
                  Choose Clinical Service:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        selectedServiceId === srv.id
                          ? 'border-[#1B382B] bg-[#1B382B] text-white shadow-md'
                          : 'border-[#E3D9CC] bg-white hover:border-[#C29B38]'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          selectedServiceId === srv.id ? 'text-[#DFBF6D]' : 'text-[#A37F2C]'
                        }`}>
                          {srv.category}
                        </span>
                        <span className={`text-xs font-bold ${
                          selectedServiceId === srv.id ? 'text-white' : 'text-[#1B382B]'
                        }`}>
                          Rs {srv.price}
                        </span>
                      </div>
                      <p className={`font-serif text-lg font-bold mt-1 leading-snug ${
                        selectedServiceId === srv.id ? 'text-white' : 'text-[#1B382B]'
                      }`}>
                        {srv.title}
                      </p>
                      <p className={`text-xs mt-2 line-clamp-2 ${
                        selectedServiceId === srv.id ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {srv.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        <span className={selectedServiceId === srv.id ? 'text-[#DFBF6D]' : 'text-gray-400'}>
                          ⏱ {srv.duration}
                        </span>
                        <span className="font-semibold underline">Select</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2A483A] block mb-3">
                  Select Attending Doctor:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {SPECIALISTS.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                        selectedDoctorId === doc.id
                          ? 'border-[#1B382B] bg-[#FAF7F2] ring-2 ring-[#1B382B]'
                          : 'border-[#E3D9CC] bg-white hover:bg-[#FDFBF7]'
                      }`}
                    >
                      <img 
                        src={doc.avatar} 
                        alt={doc.name} 
                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#DFBF6D]"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-[#1B382B] truncate">{doc.name.split(',')[0]}</p>
                        <p className="text-[10px] text-gray-500 truncate">{doc.role.split('&')[0]}</p>
                        <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">★ {doc.rating}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1 Footer */}
              <div className="flex justify-end pt-4 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-[#1B382B] hover:bg-[#254435] text-white text-sm font-semibold flex items-center space-x-2 shadow-md transition-all group"
                >
                  <span>Continue to Date & Time</span>
                  <ChevronRight className="w-4 h-4 text-[#DFBF6D] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Date & Time */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE3D6]">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B382B] mb-1">
                    2. Choose Date & Time Slot
                  </h3>
                  <p className="text-xs text-gray-500">
                    With {activeDoctor.name.split(',')[0]} for {activeService.title} ({activeService.duration})
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <span className="text-xs text-gray-500 block">Total Investment</span>
                  <span className="text-xl font-bold text-[#1B382B] font-serif">${activeService.price}</span>
                </div>
              </div>

              {/* Date Horizontal Carousel */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2A483A] block mb-3">
                  Select Preferred Day:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {upcomingDates.slice(0, 7).map((d) => (
                    <button
                      key={d.fullDate}
                      type="button"
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`p-3 rounded-2xl text-center border transition-all ${
                        selectedDate === d.fullDate
                          ? 'bg-[#1B382B] text-[#FAF7F2] border-[#1B382B] shadow-md'
                          : 'bg-white hover:bg-[#FDFBF7] text-[#1E2421] border-[#E3D9CC]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold block opacity-75">{d.dayName}</span>
                      <span className="font-serif text-2xl font-bold block my-0.5">{d.dayNumber}</span>
                      <span className="text-[10px] block opacity-75">{d.monthName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Divided by Period */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2A483A] block">
                  Select Starting Time:
                </label>

                {/* Morning Slots */}
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                    🌅 Morning Evaluations
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {AVAILABLE_TIME_SLOTS.morning.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          selectedTime === slot
                            ? 'bg-[#1B382B] text-[#DFBF6D] border-[#1B382B] shadow'
                            : 'bg-white text-[#2C3831] border-[#E3D9CC] hover:border-[#C29B38]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                    ☀️ Afternoon Sessions
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {AVAILABLE_TIME_SLOTS.afternoon.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          selectedTime === slot
                            ? 'bg-[#1B382B] text-[#DFBF6D] border-[#1B382B] shadow'
                            : 'bg-white text-[#2C3831] border-[#E3D9CC] hover:border-[#C29B38]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evening Slots */}
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                    🌙 Evening Executive Slots
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AVAILABLE_TIME_SLOTS.evening.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                          selectedTime === slot
                            ? 'bg-[#1B382B] text-[#DFBF6D] border-[#1B382B] shadow'
                            : 'bg-white text-[#2C3831] border-[#E3D9CC] hover:border-[#C29B38]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full border border-[#DDD4C7] hover:bg-[#F2ECE1] text-xs font-bold text-[#1B382B] flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-[#1B382B] hover:bg-[#254435] text-white text-sm font-semibold flex items-center space-x-2 shadow-md transition-all group"
                >
                  <span>Continue to Intake Profile</span>
                  <ChevronRight className="w-4 h-4 text-[#DFBF6D] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Intake Profile */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="pb-4 border-b border-[#EAE3D6]">
                <h3 className="font-serif text-2xl font-bold text-[#1B382B] mb-1">
                  3. Confidential Patient Intake & Symptoms
                </h3>
                <p className="text-xs text-gray-500">
                  All medical information is strictly encrypted under HIPAA standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1B382B] block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={patientData.firstName}
                    onChange={(e) => setPatientData({ ...patientData, firstName: e.target.value })}
                    placeholder="e.g. Julian"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B382B] ${
                      errors.firstName ? 'border-red-500' : 'border-[#DDD4C7]'
                    }`}
                  />
                  {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1B382B] block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={patientData.lastName}
                    onChange={(e) => setPatientData({ ...patientData, lastName: e.target.value })}
                    placeholder="e.g. Mercer"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B382B] ${
                      errors.lastName ? 'border-red-500' : 'border-[#DDD4C7]'
                    }`}
                  />
                  {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1B382B] block mb-1">
                    Email Address (For Calendar & Confirmation) *
                  </label>
                  <input
                    type="email"
                    value={patientData.email}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                    placeholder="julian.mercer@gmail.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B382B] ${
                      errors.email ? 'border-red-500' : 'border-[#DDD4C7]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1B382B] block mb-1">
                    Mobile Phone (For SMS Reminders) *
                  </label>
                  <input
                    type="tel"
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B382B] ${
                      errors.phone ? 'border-red-500' : 'border-[#DDD4C7]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Pain Scale in Step 3 */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DDD0] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B382B]">
                  <span>Current Discomfort Level</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-[#DDD4C7]">
                    {patientData.painLevel} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={patientData.painLevel}
                  onChange={(e) => setPatientData({ ...patientData, painLevel: parseInt(e.target.value) })}
                  className="w-full accent-[#1B382B] cursor-pointer"
                />
              </div>

              {/* Chief Complaint */}
              <div>
                <label className="text-xs font-bold text-[#1B382B] block mb-1">
                  Describe What Movement or Activity Causes Pain
                </label>
                <textarea
                  rows="3"
                  value={patientData.chiefComplaint}
                  onChange={(e) => setPatientData({ ...patientData, chiefComplaint: e.target.value })}
                  placeholder="e.g. Pain shoots down right leg when sitting for more than 20 minutes, or sharp ache in left shoulder when reaching behind car seat."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DDD4C7] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B382B]"
                />
              </div>

              {/* Medical History Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center space-x-2 text-xs text-[#2C3831] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={patientData.hasImaging}
                    onChange={(e) => setPatientData({ ...patientData, hasImaging: e.target.checked })}
                    className="rounded text-[#1B382B] focus:ring-[#1B382B]"
                  />
                  <span>I have recent MRI / X-Ray imaging reports to bring to evaluation</span>
                </label>
                <label className="flex items-center space-x-2 text-xs text-[#2C3831] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={patientData.hasPriorSurgery}
                    onChange={(e) => setPatientData({ ...patientData, hasPriorSurgery: e.target.checked })}
                    className="rounded text-[#1B382B] focus:ring-[#1B382B]"
                  />
                  <span>I have had previous orthopedic or spinal surgery in this area</span>
                </label>
              </div>

              {/* Step 3 Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-full border border-[#DDD4C7] hover:bg-[#F2ECE1] text-xs font-bold text-[#1B382B] flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-full bg-[#1B382B] hover:bg-[#254435] disabled:opacity-60 text-white text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-[#1B382B]/20 transition-all group"
                >
                  <span>{isSubmitting ? "Confirming..." : "Confirm Priority Booking"}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#DFBF6D]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Classy Boarding-Pass Confirmation */}
          {step === 4 && (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              
              {/* Success Banner */}
              <div className="text-center space-y-2 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-md">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1B382B]">
                  Appointment Confirmed & Reserved
                </h3>
                <p className="text-xs text-[#3E4F45] max-w-md mx-auto">
                  A concierge welcome confirmation packet has been dispatched to <span className="font-bold text-[#1B382B]">{patientData.email}</span>.
                </p>
                {whatsappNotice && (
                  <p className="text-xs font-medium text-emerald-800 max-w-md mx-auto">
                    {whatsappNotice}
                  </p>
                )}
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="max-w-xl mx-auto rounded-3xl overflow-hidden border-2 border-[#DFBF6D]/60 shadow-2xl bg-gradient-to-b from-[#1B382B] to-[#254435] text-white">
                
                {/* Ticket Header */}
                <div className="p-6 border-b border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#DFBF6D] font-bold block">
                      VIP Clinical Access Pass
                    </span>
                    <span className="font-serif text-xl font-bold tracking-wider text-white">
                      {CLINIC_INFO.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/60 block">Booking Reference</span>
                    <span className="font-mono text-xs font-bold text-[#DFBF6D] bg-white/10 px-2 py-0.5 rounded">
                      {bookingReference}
                    </span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Patient Name</span>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {patientData.firstName} {patientData.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Lead Clinician</span>
                      <p className="text-sm font-bold text-[#DFBF6D] mt-0.5">
                        {activeDoctor.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Date & Time</span>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {selectedDate} • {selectedTime}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Protocol & Duration</span>
                      <p className="text-xs font-bold text-white mt-0.5">
                        {activeService.title} ({activeService.duration})
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#DFBF6D]" />
                      <span className="text-[11px] truncate max-w-70">{CLINIC_INFO.address}</span>
                    </div>
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* Ticket Bottom Tear & Barcode Simulation */}
                <div className="bg-black/30 p-4 border-t border-dashed border-white/20 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Simulated QR Code SVG */}
                    <div className="w-12 h-12 bg-white p-1 rounded-lg">
                      <div className="w-full h-full bg-[#1B382B] flex items-center justify-center text-[8px] font-mono text-[#DFBF6D]">
                        QR-PASS
                      </div>
                    </div>
                    <div className="text-[10px] text-white/70">
                      <p className="font-semibold text-white">Present at Concierge Check-in</p>
                      <p>Complimentary Valet Parking Provided</p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadCalendar}
                    className="px-3.5 py-2 rounded-xl bg-[#DFBF6D] hover:bg-[#ebd494] text-[#1B382B] text-xs font-bold transition-colors flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </button>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1fb858] text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Details on WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1B382B] text-white text-xs font-bold flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4 text-[#DFBF6D]" />
                  <span>Download Calendar (.ics)</span>
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setWhatsappUrl("");
                    setWhatsappNotice("");
                    setPatientData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      painLevel: 5,
                      chiefComplaint: "",
                      hasImaging: false,
                      hasPriorSurgery: false
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#DDD4C7] hover:bg-[#F2ECE1] text-xs font-bold text-[#1B382B]"
                >
                  Reserve Another Consultation
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
