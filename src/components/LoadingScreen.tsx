import { useState, useEffect } from 'react';
import { Church } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-maroon-500 flex items-center justify-center transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-saffron-500 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <Church className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-white mb-1">ஸ்ரீ சென்றாயப்பெருமாள் திருக்கோவில்</h2>
        <div className="flex items-center justify-center gap-1 mt-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gold-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
