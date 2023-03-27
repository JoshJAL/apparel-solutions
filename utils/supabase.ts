import { createClient } from '@supabase/supabase-js';

export default createClient(import.meta.env.PUBLIC_SUPABASE_URL!, import.meta.env.PUBLIC_SUPABASE_CLIENT_ANON_KEY!);
