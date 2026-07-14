import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type EventRow = {
  id: string;
  name: string;
  date: string;
  desc: string;
  image: string;
  is_upcoming: boolean;
  sort_order: number;
  created_at: string;
};
