import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  MessageSquarePlus, 
  Sparkles,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function TestimonialsSection({ testimonials, onOpenReviewModal }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const categories = ["All", "Spine & Disc", "Sports Rehab", "Shoulder & Neck", "Pelvic & Core"];

  const filtered = activeCategory === "All"
    ? testimonials
    : testimonials.filter(t => t.category.toLowerCase().includes(activeCategory.toLowerCase()));

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay || filtered.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % filtered.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, filtered.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filtered.length);
  };

  const currentTestimonial = filtered[currentIndex] || testimonials[0];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-[#FAF7F2] relative overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-125 h-125 bg-[#C29B38]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAE2D5] text-[#1B382B] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#A37F2C]" />
              <span>Verified Patient Recoveries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
              Real Clinical Transformations. <br />
              <span className="italic font-light text-[#2A483A]">Documented</span> In Movement.
            </h2>
            <p className="text-[#4E5E55] text-base sm:text-lg">
              Explore how targeted doctoral care restored quality of life for our patients—without surgical intervention or chronic dependency.
            </p>
          </div>

          {/* Action to share a review */}
          <div className="mt-6 md:mt-0 flex items-center space-x-3">
            <button
              onClick={onOpenReviewModal}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#1B382B] text-[#1B382B] hover:text-white border border-[#DFBF6D]/40 text-xs font-bold transition-all duration-300 shadow-sm flex items-center space-x-2 group"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#A37F2C] group-hover:text-[#DFBF6D]" />
              <span>Submit Your Recovery Story</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1B382B] text-[#FAF7F2] shadow-sm'
                  : 'bg-white/80 hover:bg-white text-[#2C3831] border border-[#DDD4C7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Animated Testimonial Showcase */}
        {currentTestimonial && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#DFBF6D]/40 bg-white/95 transition-all duration-500 relative">
            
            {/* Elegant Quotation Mark watermark */}
            <Quote className="absolute top-8 right-8 sm:right-12 w-24 h-24 sm:w-32 sm:h-32 text-[#EFE7D8]/60 z-0 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Patient Profile & Recovery Metrics */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Patient Avatar & Verified Badge */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={currentTestimonial.avatar} 
                      alt={currentTestimonial.name} 
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-[#1B382B] shadow-md"
                    />
                    {currentTestimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow" title="Verified Clinical Patient">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1B382B] leading-none">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-xs text-[#2A483A] font-semibold mt-1">
                      {currentTestimonial.title}
                    </p>
                    <div className="flex items-center space-x-1 mt-1.5">
                      {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C29B38] text-[#C29B38]" />
                      ))}
                      <span className="text-xs font-bold text-[#1B382B] ml-1">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Condition Treated Badge */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DFC8]">
                  <span className="text-[10px] uppercase font-bold text-[#A37F2C] tracking-wider block">
                    Clinical Diagnosis
                  </span>
                  <p className="text-xs font-bold text-[#1B382B] mt-0.5">
                    {currentTestimonial.condition}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Care led by <span className="font-semibold text-[#1B382B]">{currentTestimonial.therapist}</span>
                  </p>
                </div>

                {/* Measurable Clinical Improvements */}
                <div className="bg-[#1B382B] text-white p-4 rounded-2xl space-y-3 shadow-lg border border-[#DFBF6D]/30">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#DFBF6D] font-bold">
                      Clinical Milestone
                    </span>
                    <span className="text-[10px] text-white/70">
                      {currentTestimonial.metrics?.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-[10px] text-white/60 block">Pain Reduction</span>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">
                        {currentTestimonial.metrics?.painBefore} ➔ {currentTestimonial.metrics?.painAfter}
                      </p>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <span className="text-[10px] text-white/60 block">Mobility Gain</span>
                      <p className="text-sm font-bold text-[#DFBF6D] mt-0.5">
                        {currentTestimonial.metrics?.mobilityGain}
                      </p>
                    </div>
                  </div>

                  {currentTestimonial.highlight && (
                    <div className="pt-1 text-[11px] text-center text-emerald-300 font-semibold italic">
                      "{currentTestimonial.highlight}"
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Narrative Story & Controls */}
              <div className="lg:col-span-8 space-y-8 flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAE2D5] text-[#1B382B] text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Documented Full Recovery</span>
                  </div>

                  <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-[#1B382B] leading-relaxed italic">
                    "{currentTestimonial.quote}"
                  </blockquote>
                </div>

                {/* Carousel Controls & Thumbnails */}
                <div className="pt-6 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  {/* Indicators */}
                  <div className="flex items-center space-x-2">
                    {filtered.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          idx === currentIndex
                            ? 'w-8 bg-[#1B382B]'
                            : 'w-2.5 bg-[#D7CFC2] hover:bg-[#BDB4A5]'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 font-medium ml-2">
                      {currentIndex + 1} of {filtered.length}
                    </span>
                  </div>

                  {/* Prev / Next Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrev}
                      className="w-11 h-11 rounded-full bg-white hover:bg-[#1B382B] hover:text-white text-[#1B382B] border border-[#DDD3C4] flex items-center justify-center transition-all duration-200 shadow-sm"
                      aria-label="Previous recovery story"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-11 h-11 rounded-full bg-white hover:bg-[#1B382B] hover:text-white text-[#1B382B] border border-[#DDD3C4] flex items-center justify-center transition-all duration-200 shadow-sm"
                      aria-label="Next recovery story"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Mini Grid of Other Patient Stories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item, idx) => (
            <div 
              key={item.id} 
              onClick={() => {
                const foundIdx = filtered.findIndex(f => f.id === item.id);
                if (foundIdx !== -1) setCurrentIndex(foundIdx);
              }}
              className="bg-white/80 hover:bg-white p-5 rounded-2xl border border-[#E5DDD0] hover:border-[#C29B38] transition-all cursor-pointer shadow-xs hover:shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A37F2C]">
                  {item.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-[#C29B38] text-[#C29B38]" />
                  <span className="text-xs font-bold text-[#1B382B]">5.0</span>
                </div>
              </div>
              <p className="text-xs text-[#2C3831] line-clamp-2 italic font-serif">
                "{item.quote}"
              </p>
              <div className="flex items-center space-x-2.5 pt-2 border-t border-[#F0EBE2]">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="text-[11px]">
                  <p className="font-bold text-[#1B382B] leading-none">{item.name}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{item.condition.split('(')[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
