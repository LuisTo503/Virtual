create extension if not exists pgcrypto;

create table if not exists sessions (
  id text primary key,
  created_at timestamptz not null default now(),
  anonymous_id text not null,
  device_type text,
  viewport text,
  route_initial text,
  entry_scene text,
  referrer text
);

create table if not exists scene_views (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null references sessions(id) on delete cascade,
  scene_id text not null,
  route_id text,
  entered_at timestamptz not null default now(),
  duration_ms integer
);

create table if not exists hotspot_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null references sessions(id) on delete cascade,
  scene_id text,
  hotspot_type text,
  target_scene_id text,
  clicked_at timestamptz not null default now()
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null references sessions(id) on delete cascade,
  scene_id text,
  quiz_kind text,
  quiz_index integer,
  selected_answer text,
  is_correct boolean,
  answered_at timestamptz not null default now()
);

create table if not exists interaction_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null references sessions(id) on delete cascade,
  scene_id text,
  event_name text not null,
  payload_json jsonb not null default '{}'::jsonb
);

create index if not exists idx_scene_views_session_id on scene_views(session_id);
create index if not exists idx_scene_views_scene_id on scene_views(scene_id);
create index if not exists idx_hotspot_events_session_id on hotspot_events(session_id);
create index if not exists idx_hotspot_events_scene_id on hotspot_events(scene_id);
create index if not exists idx_quiz_attempts_session_id on quiz_attempts(session_id);
create index if not exists idx_quiz_attempts_scene_id on quiz_attempts(scene_id);
create index if not exists idx_interaction_events_session_id on interaction_events(session_id);
create index if not exists idx_interaction_events_event_name on interaction_events(event_name);

alter table sessions enable row level security;
alter table scene_views enable row level security;
alter table hotspot_events enable row level security;
alter table quiz_attempts enable row level security;
alter table interaction_events enable row level security;

drop policy if exists "public can insert sessions" on sessions;
create policy "public can insert sessions"
on sessions
for insert
to anon, authenticated
with check (true);

drop policy if exists "public can insert scene views" on scene_views;
create policy "public can insert scene views"
on scene_views
for insert
to anon, authenticated
with check (true);

drop policy if exists "public can insert hotspot events" on hotspot_events;
create policy "public can insert hotspot events"
on hotspot_events
for insert
to anon, authenticated
with check (true);

drop policy if exists "public can insert quiz attempts" on quiz_attempts;
create policy "public can insert quiz attempts"
on quiz_attempts
for insert
to anon, authenticated
with check (true);

drop policy if exists "public can insert interaction events" on interaction_events;
create policy "public can insert interaction events"
on interaction_events
for insert
to anon, authenticated
with check (true);
