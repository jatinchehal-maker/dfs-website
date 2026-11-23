-- DFS website: run once in Supabase → SQL Editor → Run.
-- Passwords are stored only by Supabase Auth (hashed). This file never touches them.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'worker' check (role in ('worker', 'client', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Each user can read only their own profile.
drop policy if exists "Read own profile" on public.profiles;
create policy "Read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

-- Each user can update only their own profile, and cannot change their own role.
drop policy if exists "Update own profile" on public.profiles;
create policy "Update own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id and role = (select p.role from public.profiles p where p.id = (select auth.uid())));

-- Create the profile automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
