'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import StockChart from '@/components/stock-chart'
import { Button } from '@/components/ui/button'

function FptHighlightSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="mb-12 h-10 w-72 rounded-xl bg-muted" />
        <div className="mb-6 h-8 max-w-xl rounded-lg bg-muted" />
        <div className="mb-10 space-y-3">
          <div className="h-4 w-full max-w-2xl rounded bg-muted/80" />
          <div className="h-4 w-full max-w-xl rounded bg-muted/80" />
          <div className="h-4 w-full max-w-lg rounded bg-muted/60" />
        </div>
        <div className="rounded-2xl border bg-card p-6">
          <div className="mb-4 flex gap-6">
            <div className="h-10 w-40 rounded-lg bg-muted" />
            <div className="h-10 w-24 rounded-lg bg-muted" />
          </div>
          <div className="h-40 w-full rounded-lg bg-muted/60" />
        </div>
        <p className="sr-only">Đang tải giá và nhận định FPT...</p>
      </div>
    </section>
  )
}

export default function FptHighlight() {
  const [price, setPrice] = useState<any>(null)
  const [prices, setPrices] = useState<any[]>([])
  const [insight, setInsight] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const { data: priceData } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('ticker', 'FPT')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      const { data: priceList } = await supabase
        .from('stock_prices')
        .select('*')
        .eq('ticker', 'FPT')
        .order('created_at', { ascending: false })
        .limit(20)

      const { data: insightData } = await supabase
        .from('fpt_insights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setPrice(priceData)
      setPrices(priceList || [])
      setInsight(insightData)
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // 🔄 REFRESH (mượt, không reload page)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <FptHighlightSkeleton />
  }

  const chartData =
    prices.length > 0
      ? [...prices]
          .reverse()
          .map((p: { price: number; created_at: string }) => ({
            price: p.price,
            time: new Date(p.created_at).toLocaleTimeString(),
          }))
      : []

  const isUp =
    price && typeof price.change_percent === 'number' ? price.change_percent > 0 : false

  const dataEmpty = !price && !insight

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
            Giá và nhận định realtime — FPT
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            {dataEmpty
              ? <>Khu vực này dùng bảng <strong className="font-semibold text-foreground/80">stock_prices</strong> và{' '}
                <strong className="font-semibold text-foreground/80">fpt_insights</strong>. Khi dữ liệu đã đồng bộ, biểu đồ và tóm tắt AI hiển thị tự động.</>
              : <>Diễn biến giá và tóm tắt nhận định gần nhất (đồng bộ mỗi mười giây).</>}
          </p>
        </div>

        {dataEmpty ? (
          <div className="mb-10 rounded-2xl border border-dashed border-border bg-card/80 p-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">Chưa có dữ liệu realtime?</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-foreground/70 max-w-prose mb-8">
              <li>• Xem khối <strong className="text-foreground/85">Đánh giá cơ hội đầu tư</strong> phía trên nếu bảng <code className="text-xs">insights</code> đã có bản ghi.</li>
              <li>
                • Đọc{' '}
                <Link href="/tin-tuc" className="text-primary underline-offset-4 hover:underline">
                  tin tức
                </Link>{' '}
                cho ngữ cảnh doanh nghiệp và thị trường.
              </li>
              <li>
                • Dùng{' '}
                <Link href="/chatbot" className="text-primary underline-offset-4 hover:underline">
                  Chatbot AI
                </Link>{' '}hoặc{' '}
                <Link href="/khoa-hoc" className="text-primary underline-offset-4 hover:underline">
                  khoá học
                </Link>.
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link href="/">Trang chủ — tín hiệu tổng quan</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/tin-tuc">Đi đến tin tức</Link>
              </Button>
            </div>
          </div>
        ) : null}

        {insight ? (
          <div className="mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 text-foreground">
              {insight.sentiment === 'Bullish'
                ? 'FPT đang trong xu hướng tăng trưởng mạnh'
                : 'FPT cần theo dõi thêm trước khi đầu tư'}
            </h3>
            <p className="text-lg text-foreground/70 max-w-3xl">{insight.summary}</p>
            <ul className="mt-4 space-y-2">
              {insight.drivers?.split('\n').map((d: string, i: number) => (
                <li key={i} className="text-sm text-foreground/70">
                  • {d}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !dataEmpty ? (
            <div className="mb-10 rounded-2xl border border-border bg-muted/20 px-6 py-5 text-sm text-foreground/70">
              Chưa có bản nhận định mới trong <code className="text-xs">fpt_insights</code>. Theo dõi khối cơ hội phía trên hoặc mục tin tức.
            </div>
          ) : null
        )}

        <div className="mt-2 p-6 rounded-2xl border bg-white dark:bg-card">
          <p className="text-sm text-foreground/60 mb-2">Diễn biến thị trường</p>

          {price ? (
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="text-3xl font-bold tabular-nums">
                ₫{Number(price.price).toLocaleString('vi-VN')}
              </span>
              <span
                className={`font-semibold ${isUp ? 'text-green-500' : 'text-red-500'}`}
              >
                {isUp ? '+' : ''}
                {Number(price.change_percent).toFixed(2)}%
              </span>
            </div>
          ) : (
            <p className="text-sm text-foreground/60 mb-6">
              Chưa có bản ghi giá mới trong <code className="text-xs">stock_prices</code> cho mã FPT.
            </p>
          )}

          {chartData.length > 1 ? (
            <StockChart data={chartData} />
          ) : (
            <div className="rounded-xl bg-muted/30 py-14 text-center text-sm text-foreground/50">
              Biểu đồ cần ít nhất hai điểm giá đã lưu; có thể bật cron đồng bộ để có chuỗi thời gian đầy đủ.
            </div>
          )}

          {price ? (
            <p className="text-xs text-foreground/40 mt-3">
              Cập nhật giá: {new Date(price.created_at).toLocaleString('vi-VN')}
            </p>
          ) : null}

          <p className="text-sm text-foreground/70 mt-3">
            Giá phản ánh các giao dịch gần đây trong hệ thống — luôn đối chiếu với sàn niêm yết trước khi đặt lệnh.
          </p>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">

          <h3 className="text-xl font-bold mb-2">
            Tiếp tục khám phá nền tảng
          </h3>

          <p className="text-sm text-foreground/70 mb-4">
            Tin tức, học và chatbot là các lớp nội dung bổ trợ phân số realtime — không thay cho tư vấn tài chính cá nhân.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link href="/chatbot">Hỏi Chatbot AI</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/tin-tuc">Đọc tin tức</Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={() => alert('Coming soon')}
            >
              Mở tài khoản (sắp ra mắt)
            </Button>
          </div>

          <p className="text-xs text-foreground/50 mt-4">
            Cập nhật dữ liệu mười giây một lần khi trang được mở.
          </p>
        </div>

      </div>
    </section>
  )
}