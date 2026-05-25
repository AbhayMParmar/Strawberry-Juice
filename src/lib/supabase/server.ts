import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
<<<<<<< HEAD
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy-project.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key',
=======
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
>>>>>>> e8c3c7d7d153ba0648cd7c9be385b57ab6936270
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have proxy refreshing user sessions.
                    }
                },
            },
        }
    );
}
