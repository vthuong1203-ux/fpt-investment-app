import { Calendar } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic';

export default async function NewsSection({ id }: { id?: string }) {
  const { data: articles, error } = await supabaseAdmin
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Supabase fetch error:', error);
  }

  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 border-l-4 border-primary pl-6">
          <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">
            Dòng chảy Tin tức FPT
          </h2>
          <p className="text-lg text-foreground/50">
            Cập nhật thị trường và các thông báo quan trọng nhất
          </p>
        </div>

        <div className="grid gap-4">
          {articles?.map((article: any) => (
            <div
              key={article.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border bg-white dark:bg-card border-border hover:border-primary/20 hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary/10 text-foreground/50 uppercase tracking-widest">
                    {article.source || 'FPT NEWS'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-foreground/40 font-medium">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.published_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6">
                 <a 
                   href={article.url} 
                   target="_blank" 
                   className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-secondary/50 hover:bg-primary hover:text-white text-xs font-bold transition-all"
                 >
                   ĐỌC TIẾP
                 </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
