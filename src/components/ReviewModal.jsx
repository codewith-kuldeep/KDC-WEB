import React, { useState } from 'react';
import { X, Star, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SPECIALISTS } from '../data/clinicData';
import confetti from 'canvas-confetti';

export default function ReviewModal({ isOpen, onClose, onAddTestimonial }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    condition: '',
    category: 'Spine & Disc',
    painBefore: 8,
    painAfter: 1,
    mobilityGain: 90,
    quote: '',
    therapist: SPECIALISTS[0].name
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim() || !formData.condition.trim()) {
      setError('Please provide your name, condition treated, and your recovery story.');
      return;
    }

    const newTestimonial = {
      id: `test-custom-${Date.now()}`,
      name: formData.name,
      title: formData.title || 'Verified Patient',
      age: '40s',
      condition: formData.condition,
      category: formData.category,
      rating: rating,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + (Math.floor(Math.random() * 100))}?auto=format&fit=crop&w=400&q=80`,
      quote: formData.quote,
      metrics: {
        painBefore: `${formData.painBefore}/10`,
        painAfter: `${formData.painAfter}/10`,
        mobilityGain: `+${formData.mobilityGain}%`,
        duration: 'Clinical Protocol'
      },
      therapist: formData.therapist,
      verified: true,
      highlight: `Pain reduced from ${formData.painBefore}/10 to ${formData.painAfter}/10`
    };

    onAddTestimonial(newTestimonial);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#DFBF6D', '#1B382B', '#2A483A']
      });
    } catch (e) {}

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#DFBF6D]/40 max-h-[90vh] overflow-y-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EAE3D6] text-gray-500 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#EAE2D5] text-[#1B382B] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#A37F2C]" />
              <span>Share Your Healing Journey</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B382B] mt-2">
              Submit Your Recovery Story
            </h3>
            <p className="text-xs text-gray-600">
              Inspire other patients by documenting how physical therapy restored your mobility.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            
            {/* Star Rating */}
            <div>
              <label className="text-xs font-bold text-[#1B382B] block mb-1">
                Your Rating:
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-[#C29B38] text-[#C29B38]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#1B382B] ml-2">
                  {rating}.0 out of 5
                </span>
              </div>
            </div>

            {/* Name & Occupation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1B382B] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Katherine Hayes"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD4C7] bg-white text-xs focus:ring-2 focus:ring-[#1B382B] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1B382B] block mb-1">
                  Occupation / Lifestyle
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Marathon Runner or Architect"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD4C7] bg-white text-xs focus:ring-2 focus:ring-[#1B382B] outline-none"
                />
              </div>
            </div>

            {/* Condition Treated & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1B382B] block mb-1">
                  Condition / Injury Treated *
                </label>
                <input
                  type="text"
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  placeholder="e.g. L5-S1 Disc Herniation & Sciatica"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD4C7] bg-white text-xs focus:ring-2 focus:ring-[#1B382B] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#1B382B] block mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#DDD4C7] bg-white text-xs focus:ring-2 focus:ring-[#1B382B] outline-none"
                >
                  <option value="Spine & Disc">Spine & Disc</option>
                  <option value="Sports Rehab">Sports Rehab</option>
                  <option value="Shoulder & Neck">Shoulder & Neck</option>
                  <option value="Pelvic & Core">Pelvic & Core</option>
                </select>
              </div>
            </div>

            {/* Metrics: Pain before & after + Mobility gain */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E4DBD0] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Quantifiable Clinical Improvement
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-600 block">Pain Before</label>
                  <select 
                    value={formData.painBefore}
                    onChange={(e) => setFormData({ ...formData, painBefore: parseInt(e.target.value) })}
                    className="w-full p-1.5 rounded-lg border border-[#DDD4C7] text-xs bg-white mt-0.5"
                  >
                    {[10, 9, 8, 7, 6, 5, 4].map(n => <option key={n} value={n}>{n}/10 Severe</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-600 block">Pain After</label>
                  <select 
                    value={formData.painAfter}
                    onChange={(e) => setFormData({ ...formData, painAfter: parseInt(e.target.value) })}
                    className="w-full p-1.5 rounded-lg border border-[#DDD4C7] text-xs bg-white mt-0.5"
                  >
                    {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}/10 None/Mild</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-gray-600 block">Mobility Gain</label>
                  <input
                    type="number"
                    value={formData.mobilityGain}
                    onChange={(e) => setFormData({ ...formData, mobilityGain: parseInt(e.target.value) || 0 })}
                    className="w-full p-1.5 rounded-lg border border-[#DDD4C7] text-xs bg-white mt-0.5"
                    min="10"
                    max="150"
                  />
                </div>
              </div>
            </div>

            {/* Doctor */}
            <div>
              <label className="text-xs font-bold text-[#1B382B] block mb-1">
                Attending Doctor
              </label>
              <select
                value={formData.therapist}
                onChange={(e) => setFormData({ ...formData, therapist: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#DDD4C7] bg-white text-xs focus:ring-2 focus:ring-[#1B382B] outline-none"
              >
                {SPECIALISTS.map(doc => (
                  <option key={doc.id} value={doc.name}>{doc.name}</option>
                ))}
              </select>
            </div>

            {/* Testimonial Story */}
            <div>
              <label className="text-xs font-bold text-[#1B382B] block mb-1">
                Your Story / Review *
              </label>
              <textarea
                rows="4"
                required
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Describe your symptoms before starting therapy, what treatments were most effective, and how your daily movement has improved..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DDD4C7] bg-white text-xs focus:ring-2 focus:ring-[#1B382B] outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-[#DDD4C7] text-xs font-bold hover:bg-[#EAE3D6] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#1B382B] hover:bg-[#254435] text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
              >
                <span>Publish Story</span>
                <CheckCircle2 className="w-4 h-4 text-[#DFBF6D]" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
