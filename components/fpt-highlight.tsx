'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import StockChart from '@/components/stock-chart'

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

  // ⏳ LOADING (Hidden to avoid UI flicker)
  if (loading || !price || !insight) {
    return null;
  }

  const isUp = price.change_percent > 0

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Cập nhật FPT
          </h2>
          <p className="text-lg text-foreground/60">
            Phân tích đầu tư dựa trên dữ liệu và AI
          </p>
        </div>

        {/* 🔥 INSIGHT (CORE) */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            {insight.sentiment === 'Bullish'
              ? 'FPT đang trong xu hướng tăng trưởng mạnh'
              : 'FPT cần theo dõi thêm trước khi đầu tư'}
          </h1>

          <p className="text-lg text-foreground/70 max-w-3xl">
            {insight.summary}
          </p>

          {/* DRIVERS */}
          <ul className="mt-4 space-y-2">
            {insight.drivers?.split('\n').map((d: string, i: number) => (
              <li key={i} className="text-sm text-foreground/70">
                • {d}
              </li>
            ))}
          </ul>
        </div>

        {/* 📊 MARKET CONTEXT */}
        <div className="mt-6 p-6 rounded-2xl border bg-white dark:bg-card">

          <p className="text-sm text-foreground/60 mb-2">
            Diễn biến thị trường
          </p>

          {/* PRICE */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold">
              ₫{price.price.toLocaleString('vi-VN')}
            </span>

            <span
              className={`font-semibold ${isUp ? 'text-green-500' : 'text-red-500'
                }`}
            >
              {isUp ? '+' : ''}
              {price.change_percent.toFixed(2)}%
            </span>
          </div>

          {/* 📈 CHART */}
          <StockChart
            data={prices.map((p: any) => ({
              price: p.price,
              time: new Date(p.created_at).toLocaleTimeString(),
            }))}
          />

          {/* META */}
          <p className="text-xs text-gray-400 mt-3">
            Updated: {new Date(price.created_at).toLocaleTimeString()}
          </p>

          <p className="text-sm text-foreground/70 mt-3">
            Giá cổ phiếu phản ánh xu hướng gần đây của FPT trên thị trường.
          </p>

        </div>

        {/* 💰 CTA (FINAL TOUCH) */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">

          <h3 className="text-xl font-bold mb-2">
            Bắt đầu đầu tư vào FPT
          </h3>

          <p className="text-sm text-foreground/70 mb-4">
            Nhận phân tích chi tiết và mở tài khoản đầu tư ngay hôm nay.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => alert('Coming soon')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Mở tài khoản
            </button>

            <button
              onClick={() => alert('Coming soon')}
              className="px-6 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition"
            >
              Xem phân tích đầy đủ
            </button>
          </div>

          <p className="text-xs text-foreground/50 mt-3">
            Được tin dùng bởi 10,000+ nhà đầu tư cá nhân
          </p>
        </div>

      </div>
    </section>
  )
}