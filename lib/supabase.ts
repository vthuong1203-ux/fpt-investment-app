import { createClient } from "@supabase/supabase-js";

// Fallback chỉ để module load được khi thiểu env (vd. CI, `next build` local).
// Production / Vercel: luôn cấu hình NEXT_PUBLIC_SUPABASE_* (và SERVICE_ROLE server-side khi dùng).
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "https://placeholder.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjYxNzMyMDAsImV4cCI6MTkzMTc4MDgwMH0.build-placeholder";

// Client cho phía Client (Browser)
export const supabase = createClient(url, anonKey);

// Client cho phía Server (để bypass RLS và lấy dữ liệu chắc chắn)
export const supabaseAdmin = createClient(
  url,
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || anonKey,
);
