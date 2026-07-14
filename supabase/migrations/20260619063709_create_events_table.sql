/*
# Create events table for admin-managed temple events

1. New Tables
- `events`
- `id` (uuid, primary key)
- `name` (text, not null) — event name (Tamil)
- `date` (text, not null) — human-readable date string (Tamil)
- `desc` (text, not null) — description (Tamil)
- `image` (text, not null) — image URL
- `is_upcoming` (boolean, default true) — whether to show "Upcoming" badge
- `sort_order` (integer, default 0) — display ordering
- `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `events`.
- SELECT policy: public (anon + authenticated) — all site visitors can read events.
- INSERT/UPDATE/DELETE: authenticated admins only (any signed-in user).
  This is a single-admin app; the one admin account is the only authenticated user.
*/
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date text NOT NULL,
  "desc" text NOT NULL,
  image text NOT NULL,
  is_upcoming boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_events" ON events;
CREATE POLICY "public_select_events"
ON events FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events"
ON events FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events"
ON events FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events"
ON events FOR DELETE
TO authenticated USING (true);
