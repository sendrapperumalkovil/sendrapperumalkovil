import { ChevronDown, Clock, Calendar } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
<div className="absolute inset-0 -z-10">
  {/* Background Image */}
  <img
    src="public/images/temple-bg.png"
    alt="Temple Background"
    className="w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>

  {/* Optional Temple Pattern Overlay */}
  <div className="absolute inset-0 bg-temple-pattern opacity-20"></div>
</div>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">

        <div className="animate-fade-in mb-6 flex justify-center">
  <img
    src="/images/god.png"
    alt="Temple Logo"
    className="w-28 h-28 md:w-36 md:h-36 object-contain"
  />
</div>

        {/* Temple Name */}
        <h1 className="animate-fade-in-up font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-shadow mb-6 leading-tight">
          ஸ்ரீ சென்றாயப்பெருமாள் திருக்கோவில்
        </h1>

        {/* Tagline */}
        <p className="animate-fade-in-up font-heading text-xl sm:text-2xl md:text-3xl text-cream-200/90 mb-4 leading-relaxed" style={{ animationDelay: '0.3s' }}>
          பக்தி, சாந்தி,
          <span className="text-gold-400"> ஆன்மீகம்</span> மற்றும் பாரம்பரியம் நிறைந்த இடம்.
        </p>

        {/* Decorative line */}
        <div className="animate-fade-in my-8 flex items-center justify-center gap-3" style={{ animationDelay: '0.5s' }}>
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
          <span className="w-2 h-2 bg-gold-400 rotate-45" />
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
        </div>

        {/* Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.6s' }}>
          <button onClick={() => scrollTo('timings')} className="btn-primary flex items-center gap-2">
            <Clock className="w-5 h-5" />
            நேர அட்டவணை பார்க்க
          </button>
          <button onClick={() => scrollTo('events')} className="btn-outline flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            வரவிருக்கும் திருவிழாக்கள்
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white animate-float transition-colors"
        aria-label="கீழே உருள்"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
