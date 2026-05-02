import type { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import AccountCtaSection from '@/components/account-cta-section'

export const metadata: Metadata = {
  title: 'Trang chủ — Phân tích cổ phiếu FPT bằng AI',
  description:
    'Tổng quan FPT Investment Insights. Xem phân tích sâu, tín hiệu chiến lược và đánh giá cơ hội đầu tư trên trang Cơ hội đầu tư; tin tức, khoá học và chatbot trong menu.',
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AccountCtaSection />
    </>
  )
}
