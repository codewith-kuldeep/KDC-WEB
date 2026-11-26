import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Award, CheckCircle, HeartPulse, Sparkles } from 'lucide-react';

export default function StatsRibbon() {
  const icons = [Award, HeartPulse, Sparkles, CheckCircle];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#DFBF6D]/30 bg-gradient-to-br from-white/95 via-[#FCFAF7]/95 to-[#F7F2E8]/95 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DDD0]">
          {CLINIC_INFO.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className={`pt-4 sm:pt-0 sm:px-6 first:pt-0 first:px-0 flex items-start space-x-4`}>
                <div className="w-10 h-10 rounded-2xl bg-[#1B382B] text-[#DFBF6D] flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1B382B] leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#2A483A] uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#697A72] font-normal leading-snug mt-1">
                    {stat.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
