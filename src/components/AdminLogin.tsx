import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, Mail, LogOut, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const [open, setOpen] = useState(false);
  const { isAdmin, session, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (signInError) {
      setError('செல்லுபடியாகும் மின்னஞ்சல்/கடவுச்சொல் இல்லை. மீண்டும் முயற்சிக்கவும்.');
      return;
    }
    setOpen(false);
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-saffron-500 transition-colors duration-300"
        aria-label="நிர்வாகம்"
        title={isAdmin ? 'நிர்வாகம்' : 'நிர்வாக உள்நுழைவு'}
      >
        <Shield className="w-4 h-4" />
      </button>

      {/* Dropdown when logged in */}
      {isAdmin && session && !open && (
        <div className="hidden">
          <span>{session.user.email}</span>
          <button onClick={handleLogout}>வெளியேறு</button>
        </div>
      )}

      {/* Modal */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[220] bg-maroon-900/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-maroon-500 to-maroon-600 px-8 py-6 relative">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                  aria-label="மூடு"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-11 h-11 rounded-full bg-saffron-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      {isAdmin ? 'நிர்வாக கணக்கு' : 'நிர்வாக உள்நுழைவு'}
                    </h3>
                    <p className="text-cream-200/80 text-sm">
                      {isAdmin ? 'நீங்கள் உள்நுழைந்துள்ளீர்கள்' : 'திருவிழாக்களை நிர்வகிக்க'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              {!loading && isAdmin ? (
                <div className="p-8">
                  <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-4 mb-6">
                    <p className="text-sm text-maroon-600">
                      <span className="font-semibold">உள்நுழைந்த மின்னஞ்சல்:</span>
                      <br />
                      {session?.user.email}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    திருவிழா பகுதியில் உள்ள நிர்வாக கட்டுப்பாடுகளைப் பயன்படுத்தி திருவிழாக்களைச்
                    சேர்க்கலாம், திருத்தலாம் அல்லது அழிக்கலாம்.
                  </p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    வெளியேறு
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="p-8 space-y-5">
                  {error && (
                    <div className="p-3 rounded-lg bg-saffron-50 border border-saffron-200 text-saffron-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      மின்னஞ்சல்
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="admin-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                      கடவுச்சொல்
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="admin-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Shield className="w-4 h-4" />
                    {submitting ? 'உள்நுழைகிறது...' : 'உள்நுழைய'}
                  </button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
