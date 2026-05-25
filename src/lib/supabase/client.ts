import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
<<<<<<< HEAD
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-project.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key'
=======
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
    );
}
