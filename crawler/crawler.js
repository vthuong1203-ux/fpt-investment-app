import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const parser = new Parser();

const SOURCES = [
  { name: 'vnexpress', url: 'https://vnexpress.net/rss/kinh-doanh.rss' },
  { name: 'cafef', url: 'https://cafef.vn/doanh-nghiep.rss' },
  { name: 'google_news', url: 'https://news.google.com/rss/search?q=FPT+stock+Vietnam&hl=vi&gl=VN&ceid=VN:vi' }
];

// --- CORE LOGIC ---

function filterArticle(item) {
  const title = item.title.toUpperCase();
  const summary = (item.contentSnippet || '').toUpperCase();
  
  // Rule 1: Must strictly mention FPT in title
  if (!title.includes('FPT')) return false;

  // Rule 2: Strictly remove non-stock categories (Education, Internal, Student events)
  const blockKeywords = [
    'DANH SÁCH', 'TỔNG HỢP', 'CẬP NHẬT BCTC', 'NHIỀU DOANH NGHIỆP', 'LỊCH SỰ KIỆN', 
    'SINH VIÊN', 'HỌC BỔNG', 'KHAI GIẢNG', 'NHÀ TRƯỜNG', 'GIÁO DỤC', 'ĐÀO TẠO',
    'TUYỂN SINH', 'NGƯỜI FPT', 'NỘI BỘ', 'BÓNG ĐÁ', 'HỘI THAO', 'NHÂN VIÊN',
    'CÂU CHUYỆN', 'PHỎNG VẤN', 'TIẾT LỘ', 'NÓI VỀ', 'CHIA SẺ'
  ];
  if (blockKeywords.some(k => title.includes(k) || summary.includes(k))) return false;

  // Rule 3: Must have at least one strong financial/strategic indicator
  const signalKeywords = [
    'LỢI NHUẬN', 'DOANH THU', 'LÃI', 'HỢP ĐỒNG', 'DEAL', 'AI', 'CHIP', 
    'BÁN DẪN', 'M&A', 'ĐẦU TƯ', 'TĂNG TRƯỞNG', 'KÝ KẾT', 'CHIẾN LƯỢC'
  ];
  if (!signalKeywords.some(k => title.includes(k))) return false;

  return true;
}

function getCategory(text) {
  const t = text.toLowerCase();
  if (/\b(lợi nhuận|doanh thu|lãi|bctc|kết quả kinh doanh|tăng trưởng)\b/.test(t)) return 'earnings';
  if (/\b(ký|hợp đồng|đối tác|thỏa thuận|deal|trúng thầu|ký kết)\b/.test(t)) return 'deal';
  if (/\b(ai|trí tuệ nhân tạo|chip|bán dẫn|semiconductor|nvidia|cloud|công nghệ lõi)\b/.test(t)) return 'ai';
  if (/\b(m&a|mua lại|thâu tóm|đầu tư|dự án|mở rộng|khánh thành)\b/.test(t)) return 'investment';
  if (/\b(chính sách|thuế|vĩ mô|chính phủ|xuất khẩu|thị trường)\b/.test(t)) return 'macro';
  return 'general';
}

function calculateImpactScore(art) {
  const t = (art.title + ' ' + art.summary).toLowerCase();
  let baseScore = 0;

  // 1. Category Bases
  const bases = { earnings: 85, deal: 80, ai: 75, investment: 70, macro: 55, general: 40 };
  baseScore = bases[art.category] || 40;

  // 2. Core vs Retail Differentiation
  const isRetail = /\b(fpt retail|frt|fpt shop|long châu)\b/.test(t);
  if (isRetail) baseScore -= 15;
  else if (/\b(fpt corp|tập đoàn fpt)\b/.test(t)) baseScore += 5;

  // 3. PR / Interview Penalty
  const isPR = /\b(nói về|chia sẻ|tiết lộ|câu chuyện|đánh giá|sếp|lãnh đạo)\b/.test(t);
  if (isPR) baseScore -= 20;

  // 4. Financial Data Boosters
  const hasGrowth = /\d+%\s*(tăng|trưởng)/.test(t);
  const hasMoney = /\d+\s*(triệu usd|tỷ đồng|tỷ usd)/.test(t);
  if (hasGrowth || hasMoney) baseScore += 15;

  // 5. Strict Caps
  if (isPR) baseScore = Math.min(baseScore, 70);
  const hasFinancialImpact = art.category !== 'general' && (hasGrowth || hasMoney || art.category === 'earnings' || art.category === 'deal');
  if (!hasFinancialImpact) baseScore = Math.min(baseScore, 60);

  return Math.min(100, Math.max(0, baseScore));
}

function getSentiment(text) {
  const t = text.toLowerCase();
  let score = 0;
  
  const strongPos = ['tăng', 'lãi', 'vượt', 'ký', 'mở rộng', 'bứt phá', 'kỷ lục'];
  const strongNeg = ['giảm', 'lỗ', 'sụt', 'tiêu cực', 'khó khăn', 'thách thức', 'hủy'];

  strongPos.forEach(w => { if (t.includes(w)) score += 0.6; });
  strongNeg.forEach(w => { if (t.includes(w)) score -= 0.8; });

  // Ensure strong keywords result in significant sentiment shifts
  if (score > 0) return Math.min(1, score + 0.1); 
  if (score < 0) return Math.max(-1, score - 0.1);
  return 0;
}

function generateInsight(art) {
  const { category, sentiment, title } = art;
  const t = title.toLowerCase();
  const direction = sentiment > 0 ? 'bullish' : sentiment < 0 ? 'bearish' : 'neutral';

  const templates = {
    earnings: `Lợi nhuận tăng trưởng → cải thiện định giá P/E → hỗ trợ giá cổ phiếu ${direction}.`,
    deal: `Hợp đồng giá trị lớn → đảm bảo backlog doanh thu tương lai → tăng trưởng EPS ổn định.`,
    ai: `Chiến lược AI-native → gia tăng hàm lượng công nghệ cao → cải thiện biên lợi nhuận dài hạn.`,
    investment: `Mở rộng quy mô/M&A → chiếm lĩnh thị phần mới → tăng cường vị thế ngành.`,
    macro: `Chính sách vĩ mô thuận lợi → thúc đẩy xuất khẩu phần mềm → tác động tích cực đến tỷ giá.`,
    general: `Diễn biến doanh nghiệp cần theo dõi → đánh giá thêm tác động tài chính.`
  };

  // Specific analyst logic override
  if (t.includes('ai') && t.includes('usd')) return "Deal AI triệu USD → mở rộng doanh thu quốc tế → bứt phá doanh thu mảng Global.";
  if (t.includes('lãi') && t.includes('%')) return "Biên lợi nhuận cải thiện mạnh → tối ưu hóa chi phí vận hành → thúc đẩy EPS.";

  return templates[category] || templates.general;
}

// --- PIPELINE ---

async function run() {
  console.log('🚀 FPT Investor-Focus Pipeline Starting...');
  let processed = 0;
  let articles = [];

  for (const source of SOURCES) {
    try {
      console.log(`📡 Fetching: ${source.name}`);
      const feed = await parser.parseURL(source.url);
      
      for (const item of feed.items) {
        if (filterArticle(item)) {
          const content = item.title + ' ' + (item.contentSnippet || '');
          const category = getCategory(content);
          const sentiment = getSentiment(content);
          
          const art = {
            title: item.title,
            summary: item.contentSnippet || '',
            url: item.link,
            published_at: item.isoDate || new Date().toISOString(),
            source: source.name,
            category,
            sentiment
          };

          art.impact_score = calculateImpactScore(art);
          art.insight = generateInsight(art);
          articles.push(art);
        }
      }
    } catch (e) { console.error(`❌ Error ${source.name}: ${e.message}`); }
  }

  // Sort by impact before DB sync
  articles.sort((a, b) => b.impact_score - a.impact_score);

  console.log(`🧹 Syncing ${articles.length} high-value articles to DB...`);

  for (const art of articles) {
    try {
      const { data: dbArt, error } = await supabase
        .from('articles')
        .upsert({
          title: art.title,
          url: art.url,
          summary: art.summary,
          published_at: art.published_at,
          source: art.source,
          sentiment: art.sentiment
        }, { onConflict: 'url' }).select().single();

      if (dbArt) {
        await supabase.from('article_companies').upsert({ article_id: dbArt.id, company_code: 'FPT' }, { onConflict: 'article_id,company_code' });
        await supabase.from('insights').upsert({
          article_id: dbArt.id,
          impact_score: art.impact_score,
          content: art.insight,
          category: art.category
        }, { onConflict: 'article_id' });
        processed++;
      }
    } catch (e) { if (!e.message.includes('unique')) console.error(`⚠️ DB Error: ${e.message}`); }
  }

  console.log(`\n✅ Done. Synced ${processed} investor-relevant articles.`);
  console.log('\n💎 TOP 5 INVESTOR SIGNALS:');
  articles.slice(0, 5).forEach((a, i) => {
    console.log(`${i+1}. [${a.impact_score}/100] ${a.title}`);
    console.log(`   👉 ${a.insight}\n`);
  });
}

run();
