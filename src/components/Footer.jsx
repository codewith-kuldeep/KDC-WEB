import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { 
  Activity, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ArrowUp, 
  CheckCircle2, 
  ShieldCheck,
  Send
} from 'lucide-react';

export default function Footer() {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14231B] text-[#E6E1D8] pt-20 pb-12 border-t border-[#2A483A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#DFBF6D] text-[#14231B] flex items-center justify-center font-bold">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="block font-serif text-2xl tracking-wider font-bold text-white leading-none">
                  {CLINIC_INFO.name}
                </span>
                <span className="block text-[9px] tracking-[0.25em] text-[#DFBF6D] uppercase font-semibold mt-1">
                  & Rehabilitation Center
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B2C0B7] leading-relaxed max-w-sm">
              World-renowned clinic specializing in non-surgical spinal decompression, Olympic sports kinetics, and precision trigger point therapy. Every session is strictly 1-on-1 with a Doctor of PhysioTherapy.
            </p>

            <div className="flex items-center space-x-3 pt-2 text-xs text-[#DFBF6D]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-white/80">HIPAA Compliant & Fully Board Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFBF6D]">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs text-[#B2C0B7]">
              <li><a href="#services" className="hover:text-white transition-colors">Spinal Decompression</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Sports Knee & ACL</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Post-Op Restoration</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Ergonomic Posture</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Pelvic Floor Health</a></li>
            </ul>
          </div>

          {/* Location & Direct Line */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFBF6D]">
              Navigation & Contact
            </h4>
            <ul className="space-y-3 text-xs text-[#B2C0B7]">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#DFBF6D] shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <PhoneCall className="w-4 h-4 text-[#DFBF6D] shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white">{CLINIC_INFO.phone}</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#DFBF6D] shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">{CLINIC_INFO.email}</a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-[#DFBF6D] shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Biomechanical Insights */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFBF6D]">
              Longevity & Movement Insights
            </h4>
            <p className="text-xs text-[#B2C0B7]">
              Receive monthly physician-authored protocols on ergonomic spinal health and joint preservation.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#2A483A] text-emerald-300 text-xs flex items-center space-x-2 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are subscribed to clinical insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white/10 text-white text-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#DFBF6D] border border-white/20"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#DFBF6D] hover:text-white p-1"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#86998E] block">
                  Zero spam. Unsubscribe with 1 click anytime.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Micro-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86998E] gap-4">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All Rights Reserved. Licensed INDIA Physiotherapy Practice.</p>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
            <a href="#" className="hover:text-white transition-colors">HIPAA Disclosure</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Care</a>
            
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#DFBF6D] hover:text-[#14231B] text-white flex items-center justify-center transition-colors ml-4"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
