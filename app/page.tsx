import type { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import InsightsCards from '@/components/insights-cards'
import InvestmentOpportunity from '@/components/investment-opportunity'
import AccountCtaSection from '@/components/account-cta-section'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Trang chủ - Phân tích cổ phiếu FPT bằng AI',
  description: 'Khám phá cơ hội đầu tư FPT với phân tích AI, tín hiệu chiến lược và đánh giá cơ hội thị trường realtime.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <InsightsCards />
      <InvestmentOpportunity />
      <AccountCtaSection />
    </>
  )
}
