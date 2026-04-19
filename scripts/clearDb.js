import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function clearDb() {
  console.log('🧹 Cleaning database for a fresh start...');
  
  // Xóa sạch tất cả các bản ghi
  const { error: err1 } = await supabaseAdmin.from('insights').delete().neq('impact_score', -1);
  const { error: err2 } = await supabaseAdmin.from('article_companies').delete().neq('article_id', -1);
  const { error: err3 } = await supabaseAdmin.from('articles').delete().neq('sentiment', -100);

  if (err1 || err2 || err3) {
    console.log('Error encountered, but possibly some records cleared.');
  }

  console.log('✅ Database is now clean.');
}

clearDb();
