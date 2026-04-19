import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testFetch() {
  console.log('🔍 Testing public fetch from Supabase...');
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .limit(5);

  if (error) {
    console.error('❌ Error fetching articles:', error.message);
    if (error.message.includes('permission denied')) {
      console.log('👉 RLS is likely blocking public access. Please enable READ policy for anon role on table "articles".');
    }
  } else {
    console.log(`✅ Success! Found ${data?.length || 0} articles available for public.`);
    data?.forEach(a => console.log(`- ${a.title}`));
  }
}

testFetch();
