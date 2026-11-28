import React from 'react';
import { Sparkles, Shield, Coffee, VolumeX, Eye } from 'lucide-react';

export default function ClinicAmbience() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      title: "Private Acoustic Therapy Suites",
      desc: "Soundproofed natural oak suites with circadian restorative lighting."
    },
    {
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      title: "Spinal Decompression Unit",
      desc: "Computerized axial traction tables providing non-surgical disc relief."
    },
    {
      url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
      title: "Kinetic Reformer Studio",
      desc: "Custom clinical reformers restoring postural core stabilization."
    },
    {
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
      title: "Olympic Biomechanics Zone",
      desc: "Multi-axis force plate sensors tracking dynamic joint loading."
    }
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A37F2C] block">
            The Healing Environment
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
            Designed for Serenity. Engineered for Precision.
          </h2>
          <p className="text-[#4E5E55] text-base sm:text-lg">
            Say goodbye to fluorescent hospital hallways and open crowded gyms. Kaushish Physiotherapy & Rehabilitation Center is purposefully created as a luxury restorative center.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: VolumeX, text: "Acoustic Noise Cancellation" },
            { icon: Shield, text: "Strictly 1-on-1 Doctoral Privacy" },
            { icon: Coffee, text: "Herbal Adaptogen Refreshments" },
            { icon: Eye, text: "Circadian Warm Ambient Lighting" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E2D9CC] flex items-center space-x-3 shadow-xs">
                <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#1B382B] flex items-center justify-center shrink-0 border border-[#DFBF6D]/30">
                  <Icon className="w-4 h-4 text-[#A37F2C]" />
                </div>
                <span className="text-xs font-bold text-[#1B382B]">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Ambience Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((item, idx) => (
            <div 
              key={idx}
              className="group relative rounded-3xl overflow-hidden aspect-4/5 shadow-lg border border-white/60"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif text-xl font-bold text-[#DFBF6D]">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
