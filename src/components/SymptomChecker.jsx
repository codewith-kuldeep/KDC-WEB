import React, { useState } from 'react';
import { SYMPTOM_BODY_ZONES, SERVICES, SPECIALISTS } from '../data/clinicData';
import { 
  Activity, 
  ArrowRight, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  Sparkles,
  ChevronRight,
  Flame
} from 'lucide-react';

export default function SymptomChecker({ onSelectProtocolForBooking }) {
  const [selectedZoneId, setSelectedZoneId] = useState(SYMPTOM_BODY_ZONES[1].id); // default to Lumbar
  const [painLevel, setPainLevel] = useState(6);

  const activeZone = SYMPTOM_BODY_ZONES.find(z => z.id === selectedZoneId) || SYMPTOM_BODY_ZONES[0];
  const recommendedService = SERVICES.find(s => s.id === activeZone.recommendedServiceId);
  const specialist = SPECIALISTS.find(sp => sp.id === activeZone.recommendedSpecialist);

  // Pain severity commentary
  const getPainDescriptor = (val) => {
    if (val <= 3) return { text: "Mild / Intermittent Discomfort", color: "text-emerald-700 bg-emerald-50 border-emerald-200", advice: "Ideal for early preventive intervention before tissue inflammation solidifies." };
    if (val <= 6) return { text: "Moderate Functional Restriction", color: "text-amber-700 bg-amber-50 border-amber-200", advice: "Biomechanics are compensating. Immediate joint decompression and manual stabilization recommended." };
    return { text: "Acute / Severe Radiating Pain", color: "text-rose-700 bg-rose-50 border-rose-200", advice: "High nerve or disc sensitivity. Priority doctoral evaluation and non-invasive pain modulation required." };
  };

  const painInfo = getPainDescriptor(painLevel);

  return (
    <section id="symptom-checker" className="py-24 bg-[#F5EFE6] relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1B382B_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFBF6D]/40 text-[#1B382B] text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[#A37F2C]" />
            <span>Interactive Diagnostic Visualizer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#14231B] tracking-tight">
            Where Does Your Body Feel Restricted?
          </h2>
          <p className="text-[#4E5E55] text-base sm:text-lg">
            Select the affected area and pain intensity below to preview your customized clinical restoration roadmap.
          </p>
        </div>

        {/* Visualizer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Zone Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2A483A] block px-1">
              Select Anatomical Zone:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {SYMPTOM_BODY_ZONES.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-[#1B382B] text-[#FAF7F2] border-[#1B382B] shadow-lg shadow-[#1B382B]/15 translate-x-1 sm:translate-x-2'
                        : 'bg-white hover:bg-[#FDFBF7] text-[#1E2421] border-[#E3D9CC] hover:border-[#C29B38]'
                    }`}
                  >
                    <div>
                      <p className={`font-serif text-lg font-bold leading-tight ${isSelected ? 'text-[#DFBF6D]' : 'text-[#1B382B]'}`}>
                        {zone.title}
                      </p>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'text-[#D0DCD5]' : 'text-gray-500'}`}>
                        {zone.subtitle}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-[#DFBF6D] translate-x-1' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Pain Scale Slider */}
            <div className="bg-white p-5 rounded-2xl border border-[#E3D9CC] mt-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B382B] flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Reported Pain Intensity</span>
                </span>
                <span className="text-sm font-bold text-[#1B382B] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full border border-[#DFBF6D]/30">
                  {painLevel} / 10
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
                className="w-full accent-[#1B382B] cursor-pointer h-2 bg-[#E6DDD0] rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-gray-400 font-semibold mt-1">
                <span>1 - Mild Ache</span>
                <span>5 - Moderate</span>
                <span>10 - Severe Sharp</span>
              </div>

              <div className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${painInfo.color}`}>
                <p className="font-bold">{painInfo.text}</p>
                <p className="mt-0.5 opacity-90">{painInfo.advice}</p>
              </div>
            </div>
          </div>

          {/* Interactive Protocol Diagnostic Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl border border-[#DFBF6D]/40 bg-white/95">
              
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE3D6] pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A37F2C]">
                    Recommended Clinical Roadmap
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] mt-1">
                    {recommendedService?.title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1B382B] text-[#DFBF6D]">
                  {activeZone.recoveryTimeline} Expected
                </span>
              </div>

              {/* Symptoms Matched */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Primary Symptoms Addressed:
                  </h4>
                  <p className="text-sm sm:text-base text-[#2C3831] font-medium mt-1 italic bg-[#FAF7F2] p-3 rounded-xl border border-[#EBE4D8]">
                    "{activeZone.commonComplaints}"
                  </p>
                </div>

                {/* Treatment Methodology */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Evidence-Based Techniques Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendedService?.techniques.map((tech, i) => (
                      <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-[#EAE4D8] text-[#1B382B]">
                        ✓ {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specialist Recommendation */}
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#DFBF6D]/30 flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={specialist?.avatar} 
                      alt={specialist?.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#1B382B]"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#A37F2C] tracking-wider">
                        Assigned Lead Clinician
                      </span>
                      <p className="text-sm font-bold text-[#1B382B] leading-tight">
                        {specialist?.name}
                      </p>
                      <p className="text-xs text-gray-600">{specialist?.role}</p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Accepting Patients
                  </span>
                </div>

                {/* Protocol Action Button */}
                <div className="pt-4">
                  <button
                    onClick={() => onSelectProtocolForBooking(recommendedService, specialist)}
                    className="w-full py-4 rounded-full bg-[#1B382B] hover:bg-[#254435] text-[#FAF7F2] font-semibold text-base shadow-lg shadow-[#1B382B]/20 flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.01] border border-[#DFBF6D]/40 group"
                  >
                    <span>Reserve Assessment for {activeZone.title}</span>
                    <ArrowRight className="w-5 h-5 text-[#DFBF6D] transition-transform group-hover:translate-x-1.5" />
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Includes initial 75-min doctoral physical examination, 3D posture scan, & first day manual relief.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
