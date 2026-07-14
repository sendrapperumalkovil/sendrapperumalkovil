import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Landmark, Heart, BookOpen, Users, Flame, Sparkles, HandHeart, Sun } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Flame,
    title: 'தினசரி பூஜைகள்',
    desc: 'பண்டைய வேத மரபுகளின்படி காலையும் மாலையும் பக்தியுடன் நிகழ்த்தப்படும் புனித வழிபாடுகள்.',
    color: 'saffron',
  },
  {
    icon: Sparkles,
    title: 'பெரிய திருவிழாக்கள்',
    desc: 'இறைவனை ஆடம்பரம், இசை மற்றும் சமூக ஆன்மாவுடன் கொண்டாடும் வானளாவிய விழாக்கள்.',
    color: 'gold',
  },
  {
    icon: Users,
    title: 'சமூக நிகழ்ச்சிகள்',
    desc: 'உணவு வழங்கல், கல்வி உதவி மற்றும் சுகாதாரத் திட்டங்கள் மூலம் மனிதநேயத்திற்கு சேவை.',
    color: 'maroon',
  },
  {
    icon: Sun,
    title: 'ஆன்மீக செயல்பாடுகள்',
    desc: 'உள் சாந்திக்கும் ஞானத்திற்கும் வழிகாட்டும் யோகா, தியானம் மற்றும் உபநயாசங்கள்.',
    color: 'saffron',
  },
];

export default function About() {
  const heading = useScrollAnimation();
  const history = useScrollAnimation();
  const mission = useScrollAnimation();
  const highlights = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-28 bg-temple-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={heading.ref}
          className={`mb-16 transition-all duration-800 ${
            heading.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">எமது கோவில் பற்றி</h2>
          <div className="section-divider mb-6" />
          <p className="section-subtitle">
            1846 முதல் பக்தி, பாரம்பரியம் மற்றும் சமூகத்தின் புனித இடம்
          </p>
        </div>

        {/* History & Mission — 2-column layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* History */}
          <div
            ref={history.ref}
            className={`card p-8 lg:p-10 border-l-4 border-saffron-500 ${
              history.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-800`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-saffron-500/10 flex items-center justify-center">
                <Landmark className="w-6 h-6 text-saffron-500" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-maroon-500">
                கோவில் வரலாறு
              </h3>
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed text-justify">
              <p>
                <span className="font-semibold text-maroon-600">1982</span> - ஸ்ரீ சென்றாயப்பெருமாள் இத்திருக்கோவில் முதன் முதலில் கண்ணகட்டை தளவாய்புரம் கிராமத்தில் இருந்து சுமார் 180 ஆண்டுகளுக்கு முன்பு பிடிமண் எடுத்து க. வேலாயுதபுரம் கிராமத்தில்  நிறுவபட்டது இந்த திருக்கோவில் முதன் முதலில் கூரை கோவிலாகவும், அதன் பிறகு ஒட்டு கோவிலாக மாற்றப்பட்டது, அதன் பிறகு குறுகிய காலத்தில் கான்கிரேட் தளங்களாக மாற்றப்பட்டது அதன் பிறகு முதன் முதலில் திருக்கோவிலுக்கு 1982 ம் ஆண்டு கும்பாபிஷேகம் நடத்தபட்டது அதன் பிறகு அதன் பிறகு 12 ஆண்டுகளுக்கு ஒரு முறை (1994,2006,2018) ஆகிய முறையே கும்பாபிஷேகம் நடைபெற்றது அதன் பிறகு 2015 ம் ஆண்டு திருக்கோவிலில் அணைத்து கிராம மக்களால் கூட்டம் நடைபெற்று கோவில் முழுவதும் கல் காரப்பணிகள் கட்டுவதற்கு முடிவு எடுக்க பட்டு அதன் பிறகு அதற்கு என குழு அமைத்து சுமார் 3 ஆண்டுகள் இத்திருப்பணி நிறைவு பெற்று 2018 ம் ஆண்டு (3-6-18) கும்பாபிஷேகம் வெகு விமர்சியாகா நடைபெற்றது கும்பாபிஷேகதை தொடர்ந்து 10 வேலை அண்ணதனம் நடைபெற்றது அன்று மாலை நமது திருக்கோவிலுக்கு என உற்சவமூர்த்தி மற்றும் தயார் சிலைகள் ஐயா திரு ராஜகோபால் ரெட்டியார் குடும்பத்தின் சார்பாக அன்பளிப்பாக கொடுக்கப்பட்டது கும்பாபிஷேகம் அன்று இரவு உற்சவ மூர்த்திக்கும் தயாருக்கும் திருக்கல்யாணம் நடைபெற்றது இத் திருக்கோவிலுக்கு ஏராளமான அன்பார்களால் நன்கொடை வழங்கப்பட்டது இத் திருக்கோவிலில் இப்பொழுது நித்தமும் பூஜைகள் நடைபெறுகிறது 
              </p>
              <div className="flex items-start gap-2 pt-2">
              </div>
            </div>
          </div>

          {/* Mission */}
          <div
            ref={mission.ref}
            className={`card p-8 lg:p-10 border-l-4 border-gold-400 ${
              mission.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-800`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-maroon-500">
                எமது நோக்கம்
              </h3>
            </div>
            <div className="space-y-5">
              {[
                {
                  icon: Sparkles,
                  title: 'ஆன்மீக வளர்ச்சி',
                  desc: `மன அமைதி மற்றும் மன அழுத்தம் குறைதல்: தினமும் தியானம், வழிபாடு செய்வதன் மூலம் மன இறுக்கம் நீங்கி தெளிவு பிறக்கும்.
                         பொறுமை மற்றும் அன்பு: பிறரிடம் அன்பாக இருப்பதும், அனைவரையும் மதிப்பதும் ஆன்மிகத்தின் முக்கிய பலன்களாகும்.
                         சுயக்கட்டுப்பாடு: உங்களை நீங்கள் அறிந்துகொள்ளவும், தீய பழக்கவழக்கங்களை வென்று நேர்மையாக வாழவும் உதவும்.
                         வாழ்க்கை முறை மாற்றம்: இறை நம்பிக்கையும், நல்லெண்ணங்களும் நமது கடமைகளைச் சரியாகச் செய்யத் தூண்டும்.`,
                },
                {
                  icon: HandHeart,
                  title: 'சமூக சேவை',
                  desc: `சமூக சேவை என்பது சுயநலமற்ற மனப்பான்மையுடன் பிறர் நலனுக்காக உழைப்பதாகும். "மக்களுக்குத் தொண்டு செய்வது கடவுளுக்குத் தொண்டு" என்பார் விவேகானந்தர். ஒரு நாட்டின் உண்மையான வளர்ச்சி, அந்நாட்டின் பொருளாதாரத்தை விட மக்களின் சமூகப் பொறுப்புணர்வு மற்றும் ஒற்றுமையில்தான் அடங்கியுள்ளது.`,
                },
                {
                  icon: BookOpen,
                  title: 'மரபுகளின் பாதுகாப்பு',
                  desc: `கோயில் மரபுகளின் பாதுகாப்பு என்பது ஆன்மீக நம்பிக்கைகள், வழிபாட்டு முறைகள் மற்றும் காலம் காலமாகப் பின்பற்றப்படும் ஆகம விதிகளைக் காப்பதாகும். இது வெறும் பழக்கம் மட்டுமல்லாமல், கலாச்சாரத்தைப் பேணும் ஒரு வழிமுறையாகும். பெருமாள் (விஷ்ணு) கோயில்கள், ஆன்மீகத்தையும் தமிழ்நாட்டின் பாரம்பரிய கலைகளையும் பாதுகாப்பதில் முக்கியப் பங்கு வகிக்கின்றன.`,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-maroon-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-maroon-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-maroon-600 text-sm">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed text-justify">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div
          ref={highlights.ref}
          className={`${
            highlights.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-800`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={item.title}
                className="card p-6 text-center group hover:border-saffron-500/30 border border-transparent"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    item.color === 'saffron'
                      ? 'bg-saffron-500/10 group-hover:bg-saffron-500/20'
                      : item.color === 'gold'
                      ? 'bg-gold-400/10 group-hover:bg-gold-400/20'
                      : 'bg-maroon-500/10 group-hover:bg-maroon-500/20'
                  }`}
                >
                  <item.icon
                    className={`w-7 h-7 ${
                      item.color === 'saffron'
                        ? 'text-saffron-500'
                        : item.color === 'gold'
                        ? 'text-gold-500'
                        : 'text-maroon-500'
                    }`}
                  />
                </div>
                <h4 className="font-heading text-xl font-bold text-maroon-600 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
