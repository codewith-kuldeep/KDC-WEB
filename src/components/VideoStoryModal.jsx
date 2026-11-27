import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VideoStoryModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#1B382B] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#DFBF6D]/40 text-white relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black text-white/80 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Canvas Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85" 
            alt="Patient Physical Therapy Session" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#1B382B] via-transparent to-black/60" />

          {/* Central Play/Pause Watermark Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-[#DFBF6D] hover:bg-[#ebd494] text-[#1B382B] flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
          </button>

          {/* Video Status Header */}
          <div className="absolute top-4 left-6 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/90">
              Clinical Case Study • Dr. Muskan P.T.
            </span>
          </div>

          {/* Video Progress Bar Simulation */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
            <div className="h-full bg-[#DFBF6D] w-2/3 animate-pulse" />
          </div>
        </div>

        {/* Story Narrative & Protocol Details */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#DFBF6D] font-bold">
                Spinal Microdiscectomy Alternative Case
              </span>
              <h4 className="font-serif text-2xl font-bold text-white mt-0.5">
                From Severe Sciatica to Solo Piano Concert in 6 Weeks
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full font-bold">
                100% Pain Free
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[#DFBF6D] font-bold block mb-1">Week 1: Decompression</span>
              <p className="text-white/70">Axial computerized traction reduced nerve impingement at L4-L5 disc by 60%.</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[#DFBF6D] font-bold block mb-1">Week 3: Deep Core Restructure</span>
              <p className="text-white/70">Transversus abdominis kinetic firing re-trained to protect lumbar spine.</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[#DFBF6D] font-bold block mb-1">Week 6: Full Discharge</span>
              <p className="text-white/70">Returned to full seated posture at piano for 4 hours without pain.</p>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-white/60">
            <span>Care Directed by Dr. Muskan, P.T.</span>
            <button
              onClick={onClose}
              className="text-[#DFBF6D] hover:underline font-bold"
            >
              Close Story
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
