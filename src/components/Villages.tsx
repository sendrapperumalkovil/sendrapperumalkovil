import { MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const VILLAGES = [
  'வேலாயுதபுரம்',
  'சண்முகாபுரம்',
  'குருஞ்சாக்குளம்',
  'மேல மருதப்புரம்',
  'துரைச்சாமி புரம்',
  'ரெங்கநாதபுரம்',
  'முத்தச்செல்லையாபுரம்',
  'அருணாசலபுரம்',
  'வெள்ளூர்',
  'சாமிநாதபுரம்',
  'சுப்பிரமணியபுரம்',
  'முல்லாப்புரம்',
  'சென்னமரெட்டி பட்டி',
  'சிவஞானபுரம்',
  'துரைச்சாமிபுரம்',
  'E. T. ரெட்டியபட்டி',
  'வேடபட்டி',
  'முத்து சுவாமிநாதபுரம்',
  'முத்துசாமிபுரம்',
  'சாத்தூர்',
  'கந்தசாமிபுரம்',
  'கவுல்பட்டி',
  'சிதம்பரம் பட்டி',
  'மிளகுநத்தம்',
  'வீரப்பட்டி',
];

export default function Villages() {
  const heading = useScrollAnimation();
  const list = useScrollAnimation();

  return (
    <section id="villages" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`mb-12 transition-all duration-800 ${
            heading.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">இந்த கோவிலுக்கு பாத்தியப்பட்ட கிராமங்கள்</h2>
          <div className="section-divider mb-6" />
          <p className="section-subtitle">
            இந்த திருக்கோவிலுடன் நேரடி உறவு கொண்ட பக்தி, பாரம்பரியம் மற்றும் சமூக நெடுங்கால தொடர்புள்ள கிராமங்களின் பட்டியல்
          </p>
        </div>

        <div
          ref={list.ref}
          className={`transition-all duration-800 ${
            list.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {VILLAGES.map((village, index) => (
              <div
                key={village}
                className="group rounded-2xl border border-maroon-100 bg-gradient-to-br from-maroon-50 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${index * 0.04}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-saffron-500/10 text-saffron-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-maroon-700">{village}</p>
                    <p className="mt-1 text-sm text-gray-500">திருக்கோவில் தொடர்புடைய கிராமம்</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
