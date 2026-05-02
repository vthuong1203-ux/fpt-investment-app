'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20">
      {/* Gradient backgrounds - blue and green theme */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/25 via-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-gradient-to-l from-secondary/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Watermark FPT */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="text-9xl font-black text-primary">FPT</div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-full border border-secondary/50 hover:border-secondary/80 transition-colors">
          <TrendingUp className="w-4 h-4 text-accent" />
          <p className="text-sm font-medium text-foreground/80">Phân tích AI realtime</p>
        </div>

        {/* Main Title with FPT Branding */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter">
          <span className="block text-foreground">FPT</span>
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Investment Insights</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-foreground/70 mb-4 max-w-2xl mx-auto font-medium">
          Tập đoàn công nghệ hàng đầu Việt Nam
        </p>

        {/* Description */}
        <p className="text-lg sm:text-xl text-foreground/60 mb-10 leading-relaxed max-w-2xl mx-auto">
          Nền tảng thông tin và công cụ phân tích. Tín hiệu chiến lược, đánh giá cơ hội đầu tư và bảng cập nhật giá được đặt ở mục Cơ hội đầu tư.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">  
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl"
          >
            <Link href="/co-hoi-dau-tu">
              Xem cơ hội đầu tư
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Mở tài khoản
          </Button>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-foreground/50">
          Tin tưởng bởi hàng ngàn nhà đầu tư cá nhân tại Việt Nam
        </p>
      </div>
    </section>
  )
}
