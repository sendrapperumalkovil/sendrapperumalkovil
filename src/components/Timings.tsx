import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Sun, Sunrise, SunDim, Sunset, Moon, Clock, Lamp } from 'lucide-react';

const SCHEDULE = [
  { activity: 'கோவில் திறப்பு', time: 'காலை 5:00', icon: Sunrise, period: 'morning' },
  { activity: 'காலை பூஜை', time: 'காலை 6:00', icon: Sun, period: 'morning' },
  { activity: 'மதிய மூடல்', time: 'மதிய 12:00', icon: SunDim, period: 'afternoon' },
  { activity: 'மாலை திறப்பு', time: 'மாலை 4:00', icon: Sunset, period: 'evening' },
  { activity: 'மாலை ஆரத்தி', time: 'மாலை 6:30', icon: Lamp, period: 'evening' },
  { activity: 'கோவில் மூடல்', time: 'இரவு 9:00', icon: Moon, period: 'night' },
];

function getCurrentSession() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 16) return 'afternoon';
  if (hour >= 16 && hour < 21) return 'evening';
  return 'night';
}

export default function Timings() {
  const heading = useScrollAnimation();
  const card = useScrollAnimation();
  const currentSession = getCurrentSession();

  return (
    <section id="timings" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={heading.ref}
          className={`mb-16 transition-all duration-800 ${
            heading.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">கோவில் நேர அட்டவணை</h2>
          <div className="section-divider mb-6" />
          <p className="section-subtitle">
            உங்கள் வருகையைத் திட்டமிட்டு புனித வழிபாடுகளில் பங்கேற்கவும்
          </p>
        </div>

        {/* Timings Card */}
        <div
          ref={card.ref}
          className={`${
            card.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-800`}
        >
          <div className="card overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-maroon-500 to-maroon-600 px-8 py-6 text-center">
              <Clock className="w-8 h-8 text-gold-400 mx-auto mb-2" />
              <h3 className="font-heading text-2xl font-bold text-white">தினசரி அட்டவணை</h3>
              <p className="text-cream-200/80 text-sm mt-1">வருடம் முழுவதும் 365 நாட்கள் திறந்திருக்கும்</p>
            </div>

            {/* Schedule Table */}
            <div className="divide-y divide-gray-100">
              {SCHEDULE.map((item) => {
                const isActive = item.period === currentSession;
                return (
                  <div
                    key={item.activity}
                    className={`flex items-center justify-between px-8 py-5 transition-all duration-300 ${
                      isActive
                        ? 'bg-saffron-500/5 border-l-4 border-l-saffron-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive
                            ? 'bg-saffron-500 text-white'
                            : 'bg-maroon-500/10 text-maroon-500'
                        } transition-colors duration-300`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`font-medium ${
                          isActive ? 'text-saffron-700' : 'text-gray-700'
                        }`}
                      >
                        {item.activity}
                      </span>
                      {isActive && (
                        <span className="text-xs bg-saffron-500 text-white px-2 py-0.5 rounded-full font-medium">
                          இப்போது
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-heading text-lg font-semibold tabular-nums ${
                        isActive ? 'text-saffron-600' : 'text-maroon-500'
                      }`}
                    >
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer Note */}
            <div className="bg-cream-100 px-8 py-4 text-center">
              <p className="text-sm text-gray-500">
                திருவிழா நாட்களில் சிறப்பு நேர அட்டவணை உள்ளது. விவரங்களுக்கு{' '}
                <a href="#events" className="text-saffron-600 hover:text-saffron-700 font-medium underline-offset-2 hover:underline">
                  திருவிழா பகுதி
                </a>{' '}
                பார்க்கவும்.
              </p>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'காலை அமர்வு', time: 'காலை 5:00 - மதிய 12:00', color: 'saffron' },
              { label: 'மாலை அமர்வு', time: 'மாலை 4:00 - இரவு 9:00', color: 'gold' },
              { label: 'அபிஷேகம்', time: 'முன்பதிவு மூலம்', color: 'maroon' },
            ].map((info) => (
              <div
                key={info.label}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{info.label}</p>
                <p
                  className={`font-heading text-lg font-semibold ${
                    info.color === 'saffron'
                      ? 'text-saffron-600'
                      : info.color === 'gold'
                      ? 'text-gold-600'
                      : 'text-maroon-500'
                  }`}
                >
                  {info.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
