import { useState, FormEvent } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Send, Clock, CheckCircle } from 'lucide-react';

export default function Contact() {
  const heading = useScrollAnimation();
  const left = useScrollAnimation();
  const right = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'பெயர் தேவை';
    if (!form.email.trim()) e.email = 'மின்னஞ்சல் தேவை';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'சரியான மின்னஞ்சல் இல்லை';
    if (!form.phone.trim()) e.phone = 'தொலைபேசி எண் தேவை';
    else if (!/^[+]?\d[\d\s-]{6,14}$/.test(form.phone.trim())) e.phone = 'சரியான எண் இல்லை';
    if (!form.message.trim()) e.message = 'செய்தி தேவை';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSending(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/vigneshwaran8489@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          _subject: 'Temple website message',
          _template: 'table',
        }),
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Message delivery failed');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setSubmitError(
        'செய்தியை அனுப்ப முடியவில்லை. தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும்.'
      );
      console.error('Contact form submit error:', error);
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[field] ? 'border-saffron-400 bg-saffron-50/50' : 'border-gray-200 bg-white'
    } focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-cream-50 bg-temple-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={heading.ref}
          className={`mb-16 transition-all duration-800 ${
            heading.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">தொடர்பு கொள்ள</h2>
          <div className="section-divider mb-6" />
          <p className="section-subtitle">
            உங்கள் விசாரணைகள், கருத்துக்கள் மற்றும் எமது ஆன்மீக சமூகத்தில் பங்கேற்பதை வரவேற்கிறோம்
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info + Map */}
          <div
            ref={left.ref}
            className={`space-y-6 ${
              left.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-800`}
          >
            {/* Address Card */}
            <div className="card p-8">
              <h3 className="font-heading text-2xl font-bold text-maroon-500 mb-6">
                தொடர்பு விவரங்கள்
              </h3>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: 'முகவரி',
                    value: 'கே.வேலாயுதபுரம், கயத்தாறு தாலுகா, தூத்துக்குடி மாவட்டம், தமிழ்நாடு - 628552, இந்தியா.',
                  },
                  {
                    icon: Phone,
                    label: 'தொலைபேசி',
                    value: '+91 63820 67847',
                  },
                  {
                    icon: Mail,
                    label: 'மின்னஞ்சல்',
                    value: 'srisendrayaperumalkovil@gmail.com',
                  },
                  {
                    icon: Clock,
                    label: 'அலுவலக நேரம்',
                    value: 'திங்கள் - சனி: காலை 9:00 - மாலை 6:00',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-saffron-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-saffron-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-gray-700 font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           {/* Google Map */}
<div className="card overflow-hidden h-56 relative rounded-2xl">
  <iframe
    title="Temple Location"
    src="https://www.google.com/maps?q=4P85+292,+K.+Velayuthapuram+Main+Rd,+K.+Velayuthapuram,+K.Subramaniapuram,+Tamil+Nadu+628552&output=embed"
    className="absolute inset-0 w-full h-full border-0"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
  {/* Decorative border */}
  <div className="absolute inset-0 border-2 border-gold-400/20 rounded-2xl pointer-events-none"></div>
</div>

          {/* Contact Form */}
          <div
            ref={right.ref}
            className={`${
              right.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-800`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="card p-8">
              <h3 className="font-heading text-2xl font-bold text-maroon-500 mb-6">
                செய்தி அனுப்ப
              </h3>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <p className="text-green-700 text-sm font-medium">
                    உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது. 24 மணி நேரத்திற்குள் பதிலளிப்போம்.
                  </p>
                </div>
              )}
              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-saffron-50 border border-saffron-200 text-saffron-700 text-sm">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    முழுப் பெயர்
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass('name')}
                    placeholder="உங்கள் முழுப் பெயரை உள்ளிடவும்"
                  />
                  {errors.name && <p className="text-saffron-700 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    மின்னஞ்சல் முகவரி
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass('email')}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-saffron-700 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                    தொலைபேசி எண்
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass('phone')}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-saffron-700 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    செய்தி
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass('message') + ' resize-none'}
                    placeholder="உங்களுக்கு எப்படி உதவ முடியும்?"
                  />
                  {errors.message && <p className="text-saffron-700 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {sending ? 'அனுப்புகிறது...' : 'செய்தி அனுப்ப'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
