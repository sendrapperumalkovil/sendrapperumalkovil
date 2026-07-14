import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { EventRow } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const normalizeEvents = (items: EventRow[]) =>
  [...items].sort((a, b) => {
    const diff = (a.sort_order ?? 0) - (b.sort_order ?? 0);
    if (diff !== 0) return diff;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return data ?? [];
};

const insertEvent = async (event: EventRow) => {
  const { data, error } = await supabase
    .from('events')
    .insert([
      {
        name: event.name,
        date: event.date,
        desc: event.desc,
        image: event.image,
        is_upcoming: event.is_upcoming,
        sort_order: event.sort_order,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const updateEvent = async (event: EventRow) => {
  const { data, error } = await supabase
    .from('events')
    .update({
      name: event.name,
      date: event.date,
      desc: event.desc,
      image: event.image,
      is_upcoming: event.is_upcoming,
      sort_order: event.sort_order,
    })
    .eq('id', event.id)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const deleteEvent = async (id: string) => {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) {
    throw error;
  }
};

export default function Events() {
  const heading = useScrollAnimation();
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const events = await fetchEvents();
      setEvents(normalizeEvents(events));
    } catch (err) {
      console.error('load events error', err);
      const message = err instanceof Error ? err.message : JSON.stringify(err);
      setError(`திருவிழாக்களை ஏற்ற முடியவில்லை. பிழை: ${message}`);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('இந்த திருவிழாவை நிச்சயம் அழிக்க வேண்டுமா?')) return;

    setLoading(true);
    setError(null);

    try {
      await deleteEvent(id);
      await load();
    } catch (err) {
      console.error('delete event error', err);
      const message = err instanceof Error ? err.message : JSON.stringify(err);
      setError(`திருவிழாவை நீக்க முடியவில்லை. பிழை: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = async (savedEvent: EventRow) => {
    setError(null);
    setLoading(true);

    try {
      if (editing) {
        await updateEvent(savedEvent);
      } else {
        await insertEvent(savedEvent);
      }
      await load();
      setShowForm(false);
      setEditing(null);
    } catch (err) {
      console.error('save event error', err);
      const message = err instanceof Error ? err.message : JSON.stringify(err);
      setError(`திருவிழாவைச் சேமிக்க முடியவில்லை. பிழை: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="events" className="py-20 md:py-28 bg-cream-50 bg-temple-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={heading.ref}
          className={`mb-16 transition-all duration-800 ${
            heading.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title mb-4">திருவிழாக்கள் & உற்சவங்கள்</h2>
          <div className="section-divider mb-6" />
          <p className="section-subtitle">
            புனித திருவிழாக்கள் மற்றும் நிகழ்வுகள் மூலம் இறைவனைக் கொண்டாட எங்களுடன் இணையுங்கள்
          </p>
          {isAdmin && (
            <div className="text-center mt-6">
              <button
                onClick={() => { setEditing(null); setShowForm(true); }}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                புதிய திருவிழா சேர்க்க
              </button>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-saffron-50 border border-saffron-200 text-center text-saffron-700 text-sm">
            திருவிழாக்களை ஏற்ற முடியவில்லை: {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 text-saffron-500 animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>தற்போது திருவிழாக்கள் ஏதும் இல்லை.</p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-800 opacity-100 translate-y-0">
            {events.map((event, i) => (
              <div
                key={event.id}
                className="card overflow-hidden group cursor-pointer relative z-10"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {event.is_upcoming && (
                    <div className="absolute top-3 right-3 bg-saffron-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      வரவிருக்கிறது
                    </div>
                  )}
                  {/* Admin controls overlay */}
                  {isAdmin && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      <button
                        onClick={() => { setEditing(event); setShowForm(true); }}
                        className="w-8 h-8 rounded-lg bg-white/90 text-maroon-600 flex items-center justify-center hover:bg-white shadow-md transition-all"
                        aria-label="திருத்து"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="w-8 h-8 rounded-lg bg-white/90 text-maroon-600 flex items-center justify-center hover:bg-white shadow-md transition-all"
                        aria-label="அழி"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-maroon-600 mb-2 group-hover:text-saffron-600 transition-colors">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gold-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{event.desc}</p>
                  <div className="flex items-center gap-1 text-saffron-600 text-sm font-medium group-hover:gap-2 transition-all">
                    மேலும் அறிய <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Form Modal */}
      {showForm && (
        <EventForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSaved={handleSaved}
        />
      )}
    </section>
  );
}

function EventForm({
  initial,
  onClose,
  onSaved,
}: {
  initial: EventRow | null;
  onClose: () => void;
  onSaved: (savedEvent: EventRow) => void;
}) {
  const savingRef = { current: false };
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    date: initial?.date ?? '',
    desc: initial?.desc ?? '',
    image: initial?.image ?? '',
    is_upcoming: initial?.is_upcoming ?? true,
    sort_order: initial?.sort_order ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      date: form.date,
      desc: form.desc,
      image: form.image,
      is_upcoming: form.is_upcoming,
      sort_order: Number(form.sort_order),
    };

    const savedEvent: EventRow = {
      id:
        initial?.id ??
        (typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `local-${Date.now()}`),
      created_at: initial?.created_at ?? new Date().toISOString(),
      ...payload,
    } as EventRow;

    savingRef.current = false;
    setSaving(false);
    onSaved(savedEvent);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent transition-all text-sm';

  return (
    <div
      className="fixed inset-0 z-[110] bg-maroon-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-maroon-500 to-maroon-600 px-8 py-6 flex items-center justify-between">
          <h3 className="font-heading text-2xl font-bold text-white">
            {initial ? 'திருவிழாவைத் திருத்து' : 'புதிய திருவிழா சேர்க்க'}
          </h3>
          <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="மூடு">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-saffron-50 border border-saffron-200 text-saffron-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">திருவிழா பெயர்</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="உதாரணம்: விநாயகர் சதுர்த்தி"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">தேதி</label>
            <input
              type="text"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
              placeholder="உதாரணம்: 27 ஆகஸ்ட் 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">விளக்கம்</label>
            <textarea
              required
              rows={3}
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className={inputClass + ' resize-none'}
              placeholder="திருவிழா பற்றிய விளக்கம்"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">பட URL</label>
            <input
              type="url"
              required
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">வரிசை எண்</label>
              <input
                type="number"
                min={0}
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: e.target.value as unknown as number })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">வரவிருக்கிறதா?</label>
              <div className="flex items-center h-[46px]">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_upcoming}
                    onChange={(e) => setForm({ ...form, is_upcoming: e.target.checked })}
                    className="w-5 h-5 rounded text-saffron-500 focus:ring-saffron-400"
                  />
                  <span className="text-sm text-gray-700">வரவிருக்கிறது பேட்ஜ் காட்டு</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'சேமிக்கிறது...' : 'சேமி'}
          </button>
        </form>
      </div>
    </div>
  );
}
