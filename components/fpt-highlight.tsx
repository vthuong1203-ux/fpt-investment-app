'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import StockChart from '@/components/stock-chart'
import { Button } from '@/components/ui/button'

export default function FptHighlight() {
  const [price, setPrice] = useState<any>(null)
  const [prices, setPrices] = useState<any[]>([])
  const [insight, setInsight] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return null
  }

  if (!price || !insight) {
    return null
  }

  const chartData = [...prices]
    .reverse()
    .map((p: { price: number; created_at: string }) => ({
      price: p.price,
      time: new Date(p.created_at).toLocaleTimeString(),
    }))

  const showChart = chartData.length > 1
  const isUp =
    typeof price.change_percent === 'number' ? price.change_percent > 0 : false

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-6xl text-left">
        <div className="mb-10">
          <h2 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl mb-4">
            {insight.sentiment === 'Bullish'
              ? 'FPT đang trong xu hướng tăng trưởng mạnh'
              : 'FPT cần theo dõi thêm trước khi đầu tư'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">{insight.summary}</p>
          <ul className="mt-4 max-w-prose space-y-2">
            {insight.drivers?.split('\n').map((d: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground">
                • {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">Diễn biến thị trường</h3>

          <div className="mb-4 flex flex-wrap items-center gap-4">
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

          {showChart ? <StockChart data={chartData} /> : null}

          <p className="mt-3 text-xs text-muted-foreground">
            Cập nhật giá: {new Date(price.created_at).toLocaleString('vi-VN')}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Luôn đối chiếu với sàn niêm yết trước khi đặt lệnh.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-6">
          <h3 className="mb-2 text-xl font-bold">Điều hướng thêm</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Nội dung bổ trợ không thay thế tư vấn đầu tư cá nhân.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-xl">
              <Link href="/chatbot">Chatbot AI</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/tin-tuc">Tin tức</Link>
            </Button>
            <Button type="button" variant="outline" className="rounded-xl" onClick={() => alert('Coming soon')}>
              Mở tài khoản (sắp ra mắt)
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
