import { useState, useEffect } from 'react';
import { Menu, X, Church } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import AdminLogin from './AdminLogin';

const NAV_LINKS = [
  { id: 'home', label: 'முகப்பு' },
  { id: 'about', label: 'கோவில் பற்றி' },
  { id: 'timings', label: 'நேர அட்டவணை' },
  { id: 'events', label: 'திருவிழாக்கள்' },
  { id: 'gallery', label: 'படத்தொகுப்பு' },
  { id: 'villages', label: 'கிராமங்கள்' },
  { id: 'contact', label: 'தொடர்பு' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-maroon-500/95 backdrop-blur-md shadow-xl py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                scrolled
                  ? 'bg-saffron-500 shadow-lg'
                  : 'bg-saffron-500/80 backdrop-blur-sm'
              }`}
            >
              <Church className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-white leading-tight">
                ஸ்ரீ ஸ்ரீ தேவி ஸ்ரீ பூதேவி ஸ்ரீ சென்றாயப்பெருமாள் திருக்கோவில்
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === link.id
                    ? 'text-saffron-500 bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-saffron-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Admin Button (desktop) */}
          <div className="hidden lg:flex items-center">
            <AdminLogin />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="பட்டியல்"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-maroon-600/95 backdrop-blur-md border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-saffron-500 bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex justify-start">
            <AdminLogin />
          </div>
        </div>
      </div>
    </nav>
  );
}
