import { Church, Facebook, Instagram, Youtube, Twitter, Heart } from 'lucide-react';

const QUICK_LINKS = [
  { id: 'home', label: 'முகப்பு' },
  { id: 'about', label: 'கோவில் பற்றி' },
  { id: 'timings', label: 'நேர அட்டவணை' },
  { id: 'events', label: 'திருவிழாக்கள்' },
  { id: 'gallery', label: 'படத்தொகுப்பு' },
  { id: 'contact', label: 'தொடர்பு' },
];

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-maroon-500 text-white">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-saffron-500 via-gold-400 to-saffron-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-saffron-500 flex items-center justify-center">
                <Church className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white leading-tight block">
                  ஸ்ரீ ஸ்ரீ தேவி ஸ்ரீ பூதேவி ஸ்ரீ சென்றாயப்பெருமாள் திருக்கோவில்
                </span>
              </div>
            </button>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              1952 முதல் பக்தி, சாந்தி, ஆன்மீகம் மற்றும் பாரம்பரியத்தின் புனித இடமாக
              சமூகத்திற்கு சேவை செய்கிறது.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-saffron-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-gold-400">விரைவு இணைப்புகள்</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/60 hover:text-saffron-400 text-sm transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Temple Hours */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-gold-400">கோவில் நேரம்</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/60">
                <span>காலை</span>
                <span className="text-white/80">காலை 5:00 - மதிய 12:00</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>மாலை</span>
                <span className="text-white/80">மாலை 4:00 - இரவு 9:00</span>
              </div>
              <div className="h-px bg-white/10 my-3" />
              <p className="text-white/50 text-xs">வருடம் முழுவதும் 365 நாட்கள் திறந்திருக்கும்</p>
              <p className="text-white/50 text-xs">திருவிழா நாட்களில் சிறப்பு நேரம்</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-gold-400">தொடர்பு</h4>
            <div className="space-y-3 text-sm text-white/60">
              <p>123 கோவில் தெரு</p>
              <p>சென்னை, தமிழ்நாடு</p>
              <p>இந்தியா 600001</p>
              <div className="h-px bg-white/10 my-3" />
              <p>+91 44 2345 6789</p>
              <p>info@sridivinetemple.org</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            &copy; 2026 ஸ்ரீ ஸ்ரீ தேவி ஸ்ரீ பூதேவி ஸ்ரீ சென்றாயப்பெருமாள் திருக்கோவில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            பக்தர்களுக்காக <Heart className="w-3 h-3 text-saffron-500" /> உடன் உருவாக்கப்பட்டுள்ளது
          </p>
        </div>
      </div>
    </footer>
  );
}
