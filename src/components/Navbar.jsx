import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  PhoneCall, 
  Menu, 
  X, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Navbar({ onBookClick, onSymptomClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top micro-bar for clinic hours & VIP concierge */}
      <div className="bg-[#1B382B] text-[#E6E1D8] text-xs font-medium py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] tracking-wide font-semibold bg-[#2A483A] text-[#DFBF6D] border border-[#DFBF6D]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
              SAME-DAY EVALUATIONS
            </span>
            <span className="hidden md:inline text-[#B5C2BA]">
             E.K. Road, Near Sainik Board, Meerut • 1-on-1 Doctor Care • Zero  Crowded  Waitrooms
            </span>
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <a 
              href={`tel:${CLINIC_INFO.phone}`} 
              className="flex items-center space-x-1.5 text-[#DFBF6D] hover:text-white transition-colors duration-200"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="font-semibold">{CLINIC_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/70">{CLINIC_INFO.hours}</span>
          </div>
        </div>
      </div>

      {/* Main Floating Glass Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#FAF7F2]/90 backdrop-blur-xl shadow-lg shadow-[#1B382B]/5 py-3 border-b border-[#E7DFD4]' 
          : 'bg-[#FAF7F2]/70 backdrop-blur-md py-5 border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="group flex items-center space-x-3">
              <div className="relative w-11 h-11 rounded-2xl bg-linear-to-br from-[#1B382B] to-[#2A483A] flex items-center justify-center text-[#DFBF6D] shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#DFBF6D]/30">
                <Activity className="w-6 h-6 stroke-[2.2] animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#DFBF6D] rounded-full border-2 border-[#FAF7F2]"></div>
              </div>
              <div>
                <span className="block font-serif text-2xl tracking-[0.08em] font-bold text-[#1B382B] leading-none">
                  {CLINIC_INFO.name}
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#A37F2C] uppercase font-semibold mt-1">
                  & Rehabilitation Center
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-15 text-sm font-medium text-[#2C3831] tracking-wide ">
              <a 
                href="#services" 
                className="hover:text-[#A37F2C] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#A37F2C] hover:after:w-full after:transition-all after:duration-300"
              >
                Treatments & Protocols
              </a>
              <button 
                onClick={onSymptomClick}
                className="hover:text-[#A37F2C] transition-colors duration-200 py-1 text-left flex items-center space-x-1"
              >
                <span>Symptom Checker</span>
              </button>
              <a 
                href="#specialists" 
                className="hover:text-[#A37F2C] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#A37F2C] hover:after:w-full after:transition-all after:duration-300"
              >
                Senior Clinicians
              </a>
              <a 
                href="#testimonials" 
                className="hover:text-[#A37F2C] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#A37F2C] hover:after:w-full after:transition-all after:duration-300"
              >
                Patient Recoveries
              </a>
              <a 
                href="#faqs" 
                className="hover:text-[#A37F2C] transition-colors duration-200 py-1"
              >
                FAQ
              </a>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center shrink-0" >
              <button
                onClick={onBookClick}
                className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-[#1B382B] text-[#FAF7F2] font-semibold text-sm tracking-wide shadow-md hover:shadow-xl hover:shadow-[#1B382B]/20 transition-all duration-300 hover:-translate-y-0.5 border border-[#DFBF6D]/30 flex items-center space-x-1 whitespace-nowrap shrink-0"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#DFBF6D]" />
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4 text-[#DFBF6D] transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-[#2A483A] via-[#3E6552] to-[#1B382B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-1">
              <button
                onClick={onBookClick}
                className="px-3.5 py-1.5 rounded-full bg-[#1B382B] text-[#FAF7F2] text-xs font-semibold"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#1B382B] hover:bg-[#EAE4D9] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E2DAD0] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col space-y-3 text-base font-medium text-[#1B382B]">
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F2ECE1]"
              >
                Treatments & Protocols
              </a>
              <button 
                onClick={() => { setMobileMenuOpen(false); onSymptomClick(); }}
                className="px-3 py-2 rounded-lg hover:bg-[#F2ECE1] text-left flex items-center justify-between"
              >
                <span>Interactive Symptom Checker</span>
                <span className="text-xs bg-[#DFBF6D]/20 text-[#8F6C1E] px-2 py-0.5 rounded-full font-bold">New</span>
              </button>
              <a 
                href="#specialists" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F2ECE1]"
              >
                Senior Clinicians
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F2ECE1]"
              >
                Patient Recoveries & Reviews
              </a>
              <a 
                href="#faqs" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#F2ECE1]"
              >
                Frequently Asked Questions
              </a>
            </nav>

            <div className="pt-2 border-t border-[#E2DAD0] flex flex-col space-y-3">
              <button
                onClick={() => { setMobileMenuOpen(false); onBookClick(); }}
                className="w-full py-3 rounded-full bg-[#1B382B] text-white font-semibold flex items-center justify-center space-x-2 shadow"
              >
                <Calendar className="w-4 h-4 text-[#DFBF6D]" />
                <span>Book Priority Appointment</span>
              </button>
              <a 
                href={`tel:${CLINIC_INFO.phone}`} 
                className="w-full py-2.5 rounded-full border border-[#1B382B]/30 text-[#1B382B] text-center font-medium text-sm flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-[#A37F2C]" />
                <span>Call Attendant: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
