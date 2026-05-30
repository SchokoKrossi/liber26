/**
 * js/supabase.js — Supabase client singleton
 *
 * Loaded after the @supabase/supabase-js CDN script and before all
 * other app scripts, so `sb` is globally available everywhere.
 *
 * The anon key is safe to ship in frontend code: row-level security
 * policies in the database control who can read/write what.
 */
const SUPABASE_URL      = 'https://hfbqnjuxuvmmakhxgqbp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmYnFuanV4dXZtbWFraHhncWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDI5MTcsImV4cCI6MjA5NDg3ODkxN30.It_38kzIHZ6iF_7q33lx4E55esRow2U4CByJUMEVTRY';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Upload an image File to the public `media` bucket. Returns the public URL. */
async function uploadMediaFile(file, folder = 'misc') {
  const ext  = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
  const { error } = await sb.storage.from('media').upload(name, file, {
    cacheControl: '3600', upsert: false, contentType: file.type,
  });
  if (error) { console.error(error); throw error; }
  const { data } = sb.storage.from('media').getPublicUrl(name);
  return data.publicUrl;
}
