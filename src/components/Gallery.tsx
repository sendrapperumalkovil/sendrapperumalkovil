import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  { src: '/images/entry.jpeg', alt: 'கோவில் நுழைவாயில்', category: 'temple' },
   { src: '/images/festival_temple.jpeg', alt: 'திருவிழா கொண்டாட்டம்', category: 'festival' },
  { src: '/images/lamp.png', alt: 'தீபாவளி விளக்குகள்', category: 'festival' },
  { src: '/images/kumbam.jpg', alt: 'பாரம்பரிய சடங்கு', category: 'event' },
  // { src: 'https://images.pexels.com/photos/3889840/pexels-photo-3889840.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'கோவில் கட்டிடக்கலை', category: 'temple' },
  // { src: 'https://images.pexels.com/photos/7245219/pexels-photo-7245219.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'புனித சடங்குகள்', category: 'event' },
  { src: '/images/gopuram1.jpeg', alt: 'கோயில் கோபுரம்', category: 'temple' },
  // { src: 'https://images.pexels.com/photos/2585389/pexels-photo-2585389.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'மாலை ஆரத்தி', category: 'event' },
  // { src: 'https://images.pexels.com/photos/1110395/pexels-photo-1110395.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'திருவிழா அலங்காரங்கள்', category: 'festival' },
  // { src: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'பிரார்த்தனை சடங்கு', category: 'event' },
  // { src: 'https://images.pexels.com/photos/8090306/pexels-photo-8090306.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'கோவில் வராந்தா', category: 'temple' },
  // { src: 'https://images.pexels.com/photos/7245065/pexels-photo-7245065.jpeg?auto=compress&cs=tinysrgb&w=600', alt: 'கலாச்சார நிகழ்ச்சி', category: 'festival' },
];

const CATEGORIES = [
  { key: 'all', label: 'அனைத்தும்' },
  { key: 'temple', label: 'கோவில்' },
  { key: 'festival', label: 'திருவிழாக்கள்' },
  { key: 'event', label: 'நிகழ்வுகள்' },
];

export default function Gallery() {
  const heading = useScrollAnimation();
  const grid = useScrollAnimation();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'all' ? IMAGES : IMAGES.filter((img) => img.category === filter);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((p) => (p !== null ? (p - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightbox((p) => (p !== null ? (p + 1) % filtered.length : null));

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={heading.ref}
          className={`mb-12 transition-all duration-800 ${
            heading.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">படத்தொகுப்பு</h2>
          <div className="section-divider mb-6" />
          <p className="section-subtitle">
            பக்தி, கொண்டாட்டம் மற்றும் கோவிலின் புனித அழகின் காட்சிகள்
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat.key
                  ? 'bg-saffron-500 text-white shadow-lg shadow-saffron-500/25'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          ref={grid.ref}
          className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 ${
            grid.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-800`}
        >
          {filtered.map((img, i) => (
            <div
              key={img.src + i}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl"
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                // loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-maroon-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-maroon-900/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="மூடு"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="முந்தைய படம்"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="அடுத்த படம்"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={filtered[lightbox].src.replace('w=600', 'w=1200')}
            alt={filtered[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
