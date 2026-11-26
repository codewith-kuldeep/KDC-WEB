import React, { useState } from 'react';
import { FAQS } from '../data/clinicData';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-24 bg-[#F5EFE6] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A37F2C] block">
            Clinical Transparency & Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
            Frequently Addressed Inquiries
          </h2>
          <p className="text-[#4E5E55] text-base">
            Everything you need to know about your 1-on-1 doctoral care experience.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#E3D9CC] overflow-hidden shadow-xs transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#1B382B]">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 border border-[#E3D9CC] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#1B382B] text-white' : 'text-[#1B382B]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#4E5E55] leading-relaxed border-t border-[#F2ECE1] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Concierge Prompt */}
        <div className="mt-12 bg-white/80 p-6 rounded-2xl border border-[#DFBF6D]/40 text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1B382B]">
            Have a specific clinical question or complex surgery history?
          </p>
          <p className="text-xs text-gray-500">
            Our Doctor of PhysioTherapy concierge team is available to review your case prior to booking.
          </p>
          <div className="pt-2">
            <a 
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#1B382B] hover:text-[#A37F2C] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#A37F2C]" />
              <span>Direct Doctor Line: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
