-- Fingertips: artworks schema, RLS policies, and storage bucket.
-- Paste this whole file into the Supabase SQL Editor and run it once.

create extension if not exists "pgcrypto";

create table public.artworks (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_pt text not null,
  description_en text not null default '',
  description_pt text not null default '',
  size text not null default '',
  price numeric,
  category text not null check (category in ('finished', 'unfinished')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.artwork_images (
  id uuid primary key default gen_random_uuid(),
  artwork_id uuid not null references public.artworks(id) on delete cascade,
  storage_path text not null,
  sort_order integer not null default 0,
  is_cover boolean not null default false
);

alter table public.artworks enable row level security;
alter table public.artwork_images enable row level security;

-- The site is read-only for visitors: anyone can read artworks/images.
create policy "Public artworks are viewable by everyone"
  on public.artworks for select
  using (true);

create policy "Public artwork images are viewable by everyone"
  on public.artwork_images for select
  using (true);

-- Only logged-in admin portal accounts can write.
create policy "Authenticated users can insert artworks"
  on public.artworks for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update artworks"
  on public.artworks for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete artworks"
  on public.artworks for delete
  to authenticated
  using (true);

create policy "Authenticated users can insert artwork images"
  on public.artwork_images for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update artwork images"
  on public.artwork_images for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete artwork images"
  on public.artwork_images for delete
  to authenticated
  using (true);

-- Storage bucket for the actual photo files (public read).
insert into storage.buckets (id, name, public)
values ('artwork-images', 'artwork-images', true)
on conflict (id) do nothing;

create policy "Public can view artwork images in storage"
  on storage.objects for select
  using (bucket_id = 'artwork-images');

create policy "Authenticated users can upload artwork images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'artwork-images');

create policy "Authenticated users can update artwork images in storage"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'artwork-images');

create policy "Authenticated users can delete artwork images in storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'artwork-images');
