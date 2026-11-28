import React from 'react';
import { SPECIALISTS } from '../data/clinicData';
import { Star, Award, CheckCircle, Calendar, ArrowUpRight } from 'lucide-react';

export default function SpecialistsSection({ onSelectDoctor }) {
  return (
    <section id="specialists" className="py-24 bg-[#F5EFE6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A37F2C] block">
            Clinical Faculty & Doctoral Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
            Treated Exclusively By Doctors of PhysioTherapy
          </h2>
          <p className="text-[#4E5E55] text-base sm:text-lg">
            No unlicensed aides or rotational assistants. Your care is personally administered by Board-Certified Physiotherapy Specialists.
          </p>
        </div>

        {/* Specialists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SPECIALISTS.map((doc) => (
            <div 
              key={doc.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#E3D9CC] hover:border-[#C29B38] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Portrait */}
                <div className="relative h-72 overflow-hidden bg-[#E9E2D8]">
                  <img 
                    src={doc.avatar} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1B382B]/85 via-transparent to-transparent" />
                  
                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm border border-white/60">
                    <Star className="w-3.5 h-3.5 fill-[#C29B38] text-[#C29B38]" />
                    <span className="text-xs font-bold text-[#1B382B]">{doc.rating}</span>
                    <span className="text-[10px] text-gray-500">({doc.reviewsCount})</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFBF6D] block">
                      {doc.experience}
                    </span>
                    <p className="font-serif text-lg font-bold leading-tight">
                      {doc.name.split(',')[0]}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#2A483A] block">
                      {doc.role}
                    </span>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {doc.credentials}
                    </p>
                  </div>

                  <p className="text-xs text-[#4A5951] leading-relaxed line-clamp-3">
                    {doc.bio}
                  </p>

                  {/* Core Focus tags */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1">
                      {doc.specialties.map((spec, idx) => (
                        <span key={idx} className="text-[10px] font-medium bg-[#FAF7F2] text-[#2C3831] px-2 py-0.5 rounded border border-[#E9E1D6]">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectDoctor(doc)}
                  className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF7F2] text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 border border-[#DFBF6D]/30 group/btn"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#A37F2C] group-hover/btn:text-[#DFBF6D]" />
                  <span>Book with {doc.name.split(' ')[1]}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
