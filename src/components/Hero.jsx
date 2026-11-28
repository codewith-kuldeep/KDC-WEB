import React from 'react';
import { 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Star,
  Activity,
  Compass
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function Hero({ onBookClick, onSymptomClick, onWatchVideo }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Aesthetic Ambient Glowing Fluid Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-tr from-[#E0D5C1]/40 via-[#C29B38]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute -top-20 -right-20 w-112.5 h-112.5 bg-[#2A483A]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-10 -left-20 w-100 h-100 bg-[#DFBF6D]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#EFE9DD] border border-[#D5C9B8] text-[#1B382B] text-xs font-semibold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#A37F2C]" />
              <span>World-Class Musculoskeletal & Spine center</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-[#14231B] leading-[1.08]">
              Precision Kinetic Healing. <br />
              <span className="italic font-light text-[#2A483A]">Restoring</span> Effortless <br />
              <span className="gold-accent-text">Movement.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-[#3D4C44] max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Moving beyond temporary adjustments. We combine computerized spinal decompression, and 1-on-1 doctoral care to resolve chronic pain at its biological root.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1B382B] text-[#FAF7F2] font-semibold text-base tracking-wide shadow-xl shadow-[#1B382B]/20 hover:shadow-2xl hover:bg-[#254435] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-3 border border-[#DFBF6D]/30 group"
              >
                <span>Schedule Doctoral Evaluation</span>
                <ArrowRight className="w-5 h-5 text-[#DFBF6D] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <button
                onClick={onWatchVideo}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/80 hover:bg-white text-[#1B382B] font-semibold text-base border border-[#D6CCC0] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#1B382B] text-[#DFBF6D] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-[#DFBF6D] translate-x-0.5" />
                </div>
                <span>Patient Transformation (2 Min)</span>
              </button>
            </div>

            {/* Key Clinical Guarantees */}
            <div className="pt-4 border-t border-[#E6DDD0] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-[#46564E]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A37F2C] shrink-0" />
                <span>Strictly 1-on-1 Doctor Care</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A37F2C] shrink-0" />
                <span>Private Acoustic Site</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#A37F2C] shrink-0" />
                <span>Non-Invasive Protocols</span>
              </div>
            </div>

          </div>

          {/* Right Column: Aesthetic Imagery with Interactive Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Classy Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 group">
                <img 
                  src="/KDC-Photos/HeroImgs/Hero_Image.avif" 
                  alt="Modern Physiotherapy Treatment Suite" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1B382B]/80 via-transparent to-black/20" />
                
                {/* Bottom Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-[#DFBF6D] font-bold">
                    Private Rehabilitation Site
                  </span>
                  <p className="font-serif text-2xl font-light text-white mt-1">
                    Kinetic analysis meets restorative physical medicine.
                  </p>
                </div>
              </div>

              {/* Floating Aesthetic Card 1: Live Recovery Metric (Top Right) */}
              <div className="absolute -top-6 -right-4 sm:-right-8 glass-panel p-4 rounded-2xl shadow-xl max-w-60 animate-float-slow hidden sm:block border border-white/80">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Sciatica Protocol</span>
                    <p className="text-xs font-bold text-[#1B382B]">-92% Nerve Pain</p>
                  </div>
                </div>
                <div className="w-full bg-[#E5DFD4] h-2 rounded-full overflow-hidden">
                  <div className="bg-linear-to-r from-emerald-600 to-[#C29B38] h-full w-[92%] rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mt-1 font-medium">
                  <span>Resolved in 5 wks</span>
                  <span className="text-emerald-700 font-bold">Verified</span>
                </div>
              </div>

              {/* Floating Aesthetic Card 2: Senior Specialist Availability (Bottom Left) */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 glass-panel-dark p-4 rounded-2xl shadow-2xl max-w-67.5 text-white animate-float-reverse border border-[#DFBF6D]/40">
                <div className="flex items-center space-x-3">
                  <img 
                    src="" 
                    alt="Dr. Muskan, P.T." 
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#DFBF6D]"
                  />
                  <div>
                    <div className="flex items-center space-x-1 text-[#DFBF6D] text-xs">
                      <Star className="w-3.5 h-3.5 fill-[#DFBF6D]" />
                      <span className="font-bold">4.99</span>
                      <span className="text-white/60 text-[10px]">(384 reviews)</span>
                    </div>
                    <p className="text-xs font-semibold text-white leading-tight">Dr. Muskan, P.T.</p>
                    <p className="text-[10px] text-[#DFBF6D] flex items-center space-x-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Next Slot: Today 3:30 PM</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onBookClick}
                  className="mt-3 w-full py-1.5 rounded-lg bg-[#DFBF6D] hover:bg-[#ebd494] text-[#1B382B] text-[11px] font-bold text-center transition-colors"
                >
                  Quick Reserve Slot
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
