import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRibbon from './components/StatsRibbon';
import SymptomChecker from './components/SymptomChecker';
import ServicesSection from './components/ServicesSection';
import SpecialistsSection from './components/SpecialistsSection';
import BookingWizard from './components/BookingWizard';
import TestimonialsSection from './components/TestimonialsSection';
import ClinicAmbience from './components/ClinicAmbience';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ReviewModal from './components/ReviewModal';
import VideoStoryModal from './components/VideoStoryModal';
import { INITIAL_TESTIMONIALS } from './data/clinicData';
import { Calendar, CheckCircle } from 'lucide-react';

export default function App() {
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [preselectedService, setPreselectedService] = useState(null);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSymptom = () => {
    const el = document.getElementById('symptom-checker');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProtocolForBooking = (service, doctor) => {
    setPreselectedService(service);
    setPreselectedDoctor(doctor);
    scrollToBooking();
    showToast(`Selected protocol: ${service.title}`);
  };

  const handleBookService = (service) => {
    setPreselectedService(service);
    scrollToBooking();
    showToast(`Selected protocol: ${service.title}`);
  };

  const handleSelectDoctor = (doctor) => {
    setPreselectedDoctor(doctor);
    scrollToBooking();
    showToast(`Selected specialist: ${doctor.name.split(',')[0]}`);
  };

  const handleAddTestimonial = (newTestimonial) => {
    setTestimonials([newTestimonial, ...testimonials]);
    showToast('Your recovery story has been verified and added to the patient gallery!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E2421]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B382B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#DFBF6D]/50 flex items-center space-x-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle className="w-5 h-5 text-[#DFBF6D] shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar 
        onBookClick={scrollToBooking} 
        onSymptomClick={scrollToSymptom} 
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero 
          onBookClick={scrollToBooking}
          onSymptomClick={scrollToSymptom}
          onWatchVideo={() => setIsVideoModalOpen(true)}
        />
        
        <StatsRibbon />

        <SymptomChecker 
          onSelectProtocolForBooking={handleSelectProtocolForBooking} 
        />

        <ServicesSection 
          onBookService={handleBookService} 
        />

        <SpecialistsSection 
          onSelectDoctor={handleSelectDoctor} 
        />

        <BookingWizard 
          preselectedService={preselectedService}
          preselectedDoctor={preselectedDoctor}
          onResetPreselected={() => {
            setPreselectedService(null);
            setPreselectedDoctor(null);
          }}
        />

        <TestimonialsSection 
          testimonials={testimonials}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
        />

        <ClinicAmbience />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onAddTestimonial={handleAddTestimonial}
      />

      <VideoStoryModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Floating Sticky Mobile Booking Button */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <button
          onClick={scrollToBooking}
          className="w-full py-3.5 px-6 rounded-full bg-[#1B382B] text-white font-bold text-sm shadow-2xl flex items-center justify-center space-x-2 border border-[#DFBF6D]/40"
        >
          <Calendar className="w-4 h-4 text-[#DFBF6D]" />
          <span>Book 1-on-1 Doctoral Evaluation</span>
        </button>
      </div>
    </div>
  );
}
