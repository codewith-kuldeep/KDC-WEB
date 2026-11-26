import React, { useState } from 'react';
import { SERVICES, SPECIALISTS } from '../data/clinicData';
import { Clock, DollarSign, ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function ServicesSection({ onBookService }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Spine & Neck", "Sports Rehab", "Pain Modulation", "Post-Operative", "Specialized Health"];

  const filteredServices = activeCategory === "All" 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="services" className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A37F2C] block">
              Doctoral Clinical Protocols
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
              Targeted Rehabilitation For Lasting Biomechanical Health
            </h2>
            <p className="text-[#4E5E55] text-base sm:text-lg">
              Every appointment is strictly 1-on-1 inside our acoustic therapy suites. <br /> No rushed 15-minute handoffs.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#1B382B] text-[#FAF7F2] shadow-md border border-[#1B382B]'
                    : 'bg-white text-[#2C3831] border border-[#DDD4C7] hover:border-[#A37F2C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const specialist = SPECIALISTS.find(sp => sp.id === service.leadSpecialist);

            return (
              <div 
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E6DDD0] hover:border-[#C29B38] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Image & Tag */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#1B382B]/90 text-[#DFBF6D] backdrop-blur-md border border-[#DFBF6D]/30 shadow">
                      {service.tag}
                    </span>
                  </div>

                  {/* Duration and Pricing pills on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-[#DFBF6D]" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="bg-[#DFBF6D] text-[#1B382B] px-3 py-1 rounded-full font-bold shadow">
                      ${service.price} / Session
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A37F2C]">
                      {service.category}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1B382B] mt-1 leading-snug group-hover:text-[#2A483A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#4E5E55] mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Recommended For Conditions */}
                  <div className="pt-2 border-t border-[#F0EAE1]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Target Conditions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.recommendedFor.map((item, idx) => (
                        <span key={idx} className="text-[11px] font-medium bg-[#F6F1EA] text-[#2C3831] px-2.5 py-0.5 rounded-md border border-[#E9E1D6]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Doctor signature & Action */}
                  <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={specialist?.avatar} 
                        alt={specialist?.name} 
                        className="w-8 h-8 rounded-full object-cover border border-[#DFBF6D]"
                      />
                      <div className="text-[11px]">
                        <p className="font-bold text-[#1B382B] leading-none">{specialist?.name.split(',')[0]}</p>
                        <p className="text-gray-500 text-[10px]">Lead Clinician</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onBookService(service)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-[#1B382B] group-hover:text-[#A37F2C] transition-colors"
                    >
                      <span>Book Protocol</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
