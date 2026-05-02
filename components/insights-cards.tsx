import { TrendingUp, Target, BrainCircuit, ArrowUpRight } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export default async function InsightsCards() {
  // Lấy top 3 insights có impact_score cao nhất
  const { data: insights, error } = await supabaseAdmin
    .from('insights')
    .select(`
      *,
      articles (
        title,
        url
      )
    `)
    .order('impact_score', { ascending: false })
    .limit(3);

  if (error || !insights || insights.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-border pb-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-[0.2em] mb-3">
              <BrainCircuit className="w-5 h-5" />
              AI Strategy Analysis
            </div>
            <h2 className="text-4xl font-black text-foreground tracking-tight">
              Tín Hiệu Chiến Lược
            </h2>
          </div>
          <p className="text-foreground/50 max-w-md text-sm leading-relaxed">
            Phân tích chuyên sâu từ hệ thống AI giúp nhà đầu tư nắm bắt các biến động quan trọng nhất của FPT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight: any) => (
            <div 
              key={insight.id}
              className="group flex flex-col p-8 rounded-[2rem] bg-white dark:bg-card border-2 border-primary/10 hover:border-primary transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,102,255,0.1)] relative overflow-hidden"
            >
              {/* Badge Impact Score */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black tracking-widest">
                  {insight.impact_score}
                </div>
              </div>

              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold leading-tight text-foreground line-clamp-3">
                  {insight.articles?.title}
                </h3>
              </div>

              <div className="mt-auto space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Insight Chiến Lược
                  </div>
                  <p className="text-sm font-bold text-foreground leading-relaxed">
                    {insight.summary}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <p className="text-xs text-foreground/60 leading-relaxed italic">
                    "{insight.reasoning}"
                  </p>
                </div>

                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${insight.sentiment > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className="w-3 h-3" />
                    {insight.sentiment > 0 ? 'Bullish' : 'Bearish'}
                  </div>
                  
                  <a 
                    href={insight.articles?.url} 
                    target="_blank" 
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors"
                  >
                    Xem nguồn <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
