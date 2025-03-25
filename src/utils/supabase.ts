import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseAuthUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAuthServiceRole = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabaseAuth = createClient(supabaseAuthUrl, supabaseAuthServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export { supabase, supabaseAuth };