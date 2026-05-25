import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
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
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // refreshing the auth token
    await supabase.auth.getUser();

    return supabaseResponse;
}
