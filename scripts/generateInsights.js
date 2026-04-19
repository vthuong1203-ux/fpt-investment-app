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

const KEYWORDS = ["lợi nhuận", "doanh thu", "tăng trưởng", "hợp đồng", "ai", "đầu tư"];
const NOISE = ["pr", "interview", "nói về", "chia sẻ", "tiết lộ", "câu chuyện", "đánh giá"];

function getInsightData(title) {
  const t = title.toLowerCase();
  let summary = "Tác động chưa rõ";
  let reasoning = "Cần theo dõi thêm các báo cáo chi tiết để xác định ảnh hưởng tài chính.";

  if (t.includes('ai')) {
    summary = "Chiến lược AI → tăng trưởng dài hạn → bullish";
    reasoning = "Định hướng AI-native giúp FPT gia tăng giá trị cạnh tranh và mở rộng biên lợi nhuận mảng dịch vụ IT quốc tế.";
  } else if (t.includes('lợi nhuận') || t.includes('doanh thu')) {
    summary = "Kết quả kinh doanh tích cực → hỗ trợ giá cổ phiếu";
    reasoning = "Các chỉ số tài chính cơ bản cải thiện mạnh là động lực chính thúc đẩy định giá cổ phiếu hấp dẫn hơn.";
  } else if (t.includes('ký') || t.includes('hợp đồng')) {
    summary = "Deal lớn → mở rộng doanh thu → tích cực";
    reasoning = "Việc ký kết các hợp đồng quy mô lớn đảm bảo khối lượng công việc (backlog) và dòng tiền ổn định trong tương lai.";
  } else if (t.includes('tăng trưởng') || t.includes('đầu tư')) {
    summary = "Mở rộng quy mô → tiềm năng tăng trưởng → tích cực";
    reasoning = "Hoạt động đầu tư/mở rộng chứng tỏ niềm tin của ban lãnh đạo vào sự phát triển của hệ sinh thái doanh nghiệp.";
  }

  return { summary, reasoning };
}

async function run() {
  console.log('🚀 Generating High-Quality Insights for FPT...');
  
  const { data: articles, error: fetchErr } = await supabaseAdmin
    .from('articles')
    .select('id, title, sentiment, impact_score');

  if (fetchErr) return console.error('❌ Fetch error:', fetchErr.message);

  const { data: existing, error: existErr } = await supabaseAdmin
    .from('insights')
    .select('article_id');
  
  if (existErr) return console.error('❌ Check error:', existErr.message);
  const existingIds = new Set(existing.map(e => e.article_id));

  let inserted = 0;
  let skipped = 0;

  for (const art of articles) {
    const t = art.title.toLowerCase();
    const hasKeyword = KEYWORDS.some(k => t.includes(k));
    const isPR = NOISE.some(n => t.includes(n));
    
    let filterScore = 0;
    if (art.impact_score >= 70) filterScore += 1;
    if (Math.abs(art.sentiment) >= 0.3) filterScore += 1;
    if (hasKeyword) filterScore += 1;

    const shouldGenerate = (filterScore >= 2 || art.impact_score >= 75) && !isPR;

    if (existingIds.has(art.id) || !shouldGenerate) {
      skipped++;
      continue;
    }

    const { summary, reasoning } = getInsightData(art.title);

    const { error: insErr } = await supabaseAdmin
      .from('insights')
      .insert({
        article_id: art.id,
        summary,
        reasoning,
        impact_score: art.impact_score,
        sentiment: art.sentiment,
        confidence: 0.6
      });

    if (insErr) {
      console.error(`⚠️ Error inserting for ${art.id}:`, insErr.message);
    } else {
      inserted++;
    }
  }

  console.log('\n--- PIPELINE SUMMARY ---');
  console.log(`✅ New insights inserted: ${inserted}`);
  console.log(`⏩ Articles skipped (low quality/duplicate): ${skipped}`);
  console.log('------------------------');
}

run();
