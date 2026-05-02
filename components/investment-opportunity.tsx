import { TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

function InvestmentOpportunityPlaceholder() {
  return (
    <section id="opportunities" className="border-y border-border bg-white px-4 py-16 dark:bg-background">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-primary">Market opportunity</p>
        <h2 className="mb-4 text-4xl font-black tracking-tight">Đánh giá cơ hội đầu tư</h2>
        <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-foreground/65">
          Hệ thống AI tính chỉ báo bullish/bearish, điểm ảnh hưởng và lý luận từ các insight gần nhất. Khi cơ sở dữ liệu insight đã đồng bộ,
          bạn sẽ thấy chỉ số realtime tại khối bên dưới giống trên trang chủ. Trước khi có kết quả, bạn vẫn có thể bám sát chủ đề FPT qua các
          mục tin tức và học đầu tư trên menu điều hướng.
        </p>
        <div className="grid gap-8 text-left md:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-secondary/20 p-8">
            <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-foreground/40">Chỉ báo được tính khi có dữ liệu</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>• Tâm lý thị trường (sentiment trung bình của insight).</li>
              <li>• Độ mạnh chủ đề (impact score trung bình).</li>
              <li>• Tổng quan bullish / bearish theo các insight nổi bật.</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-primary/15 bg-primary/5 p-8">
            <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-primary">Gợi ý chủ đề nghiên cứu</h3>
            <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
              <li>• Theo dõi báo cáo tài chính và dòng tin về margins dịch vụ số.</li>
              <li>• Chính sách và chi phí đầu tư cho AI, cloud và an ninh mạng.</li>
              <li>• Biến động FX và nhu cầu thuê ngoài phần mềm tại thị trường chủ đạo của FSOFT.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function InvestmentOpportunity({
  showPlaceholderWhenEmpty = false,
}: {
  showPlaceholderWhenEmpty?: boolean;
} = {}) {
  // 1. Fetch toàn bộ insights để tính toán
  const { data: insights, error } = await supabaseAdmin
    .from('insights')
    .select('sentiment, impact_score, summary')
    .order('impact_score', { ascending: false })

  if (error || !insights || insights.length === 0) {
    return showPlaceholderWhenEmpty ? <InvestmentOpportunityPlaceholder /> : null
  }

  // 2. Logic tính toán
  const bullishCount = insights.filter(i => i.sentiment > 0.3).length;
  const bearishCount = insights.filter(i => i.sentiment < -0.3).length;
  const avgSentiment = insights.reduce((acc, i) => acc + i.sentiment, 0) / insights.length;
  const avgImpact = insights.reduce((acc, i) => acc + i.impact_score, 0) / insights.length;

  let status = "Neutral";
  let colorClass = "bg-gray-100 text-gray-700 border-gray-200";
  let Icon = Minus;

  if (avgSentiment > 0.2 && bullishCount > bearishCount) {
    status = "Bullish";
    colorClass = "bg-green-100 text-green-700 border-green-200";
    Icon = TrendingUp;
  } else if (avgSentiment < -0.2) {
    status = "Bearish";
    colorClass = "bg-red-100 text-red-700 border-red-200";
    Icon = TrendingDown;
  }

  // Lấy 2-3 lý do chính từ top insights
  const topReasons = insights.slice(0, 3).map(i => i.summary);

  return (
    <section id="opportunities" className="py-16 px-4 bg-white dark:bg-background border-y border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Market Opportunity</h2>
        <h3 className="text-4xl font-black mb-10 tracking-tight">Đánh Giá Cơ Hội Đầu Tư</h3>

        <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-3xl border-2 mb-10 ${colorClass} transition-all shadow-sm`}>
          <Icon className="w-8 h-8" />
          <span className="text-3xl font-black uppercase tracking-tighter">{status}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="p-8 rounded-[2rem] bg-secondary/20 border border-border">
            <h4 className="text-xs font-black text-foreground/40 uppercase mb-6 tracking-widest">Chỉ số AI tổng hợp</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tâm lý thị trường (Avg Sentiment)</span>
                <span className={`font-bold ${avgSentiment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {avgSentiment.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Điểm ảnh hưởng (Avg Impact)</span>
                <span className="font-bold text-primary">{avgImpact.toFixed(1)}/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tín hiệu Bullish / Bearish</span>
                <span className="font-bold">{bullishCount} / {bearishCount}</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10">
            <h4 className="text-xs font-black text-primary uppercase mb-6 tracking-widest">Luận điểm then chốt</h4>
            <ul className="space-y-4">
              {topReasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm font-bold text-foreground leading-tight">{reason}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
