-- DFS website database, matching the live Supabase project (dfs-website, Canada Central).
-- Passwords are stored only by Supabase Auth (hashed). Re-runnable on a fresh project via SQL Editor.

create schema if not exists private;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'worker' check (role in ('worker', 'client', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

CREATE OR REPLACE FUNCTION private.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''));
  return new;
end;
$function$;
CREATE OR REPLACE FUNCTION private.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$function$;
CREATE OR REPLACE FUNCTION private.profiles_before_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if new.role is distinct from old.role
     and coalesce(auth.role(), '') <> 'service_role'
     and not private.is_admin() then
    raise exception 'Only an admin can change roles';
  end if;
  if new.id is distinct from old.id then
    raise exception 'Profile id cannot be changed';
  end if;
  new.updated_at := now();
  return new;
end;
$function$;

drop policy if exists "Read own profile, admins read all" on public.profiles;
create policy "Read own profile, admins read all" on public.profiles
  for select to authenticated
  using (((( SELECT auth.uid() AS uid) = id) OR ( SELECT private.is_admin() AS is_admin)));
drop policy if exists "Update own profile, admins update all" on public.profiles;
create policy "Update own profile, admins update all" on public.profiles
  for update to authenticated
  using (((( SELECT auth.uid() AS uid) = id) OR ( SELECT private.is_admin() AS is_admin)))
  with check (((( SELECT auth.uid() AS uid) = id) OR ( SELECT private.is_admin() AS is_admin)));

drop trigger if exists profiles_before_update on public.profiles;
create trigger profiles_before_update before update on public.profiles for each row execute function private.profiles_before_update();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function private.handle_new_user();
