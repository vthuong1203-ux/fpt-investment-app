import type { Metadata } from 'next'
import CoHoiDauTuIntro from '@/components/co-hoi-dau-tu-intro'
import FptHighlight from '@/components/fpt-highlight'
import InsightsCards from '@/components/insights-cards'
import InvestmentOpportunity from '@/components/investment-opportunity'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cơ hội đầu tư cổ phiếu FPT',
  description:
    'Tín hiệu chiến lược và đánh giá cơ hội đầu tư FPT trên insight thị trường; cập nhật giá và nhận định. Chỉ dùng tham khảo.',
  openGraph: {
    title: 'Cơ hội đầu tư cổ phiếu FPT',
    description:
      'Tín hiệu chiến lược, đánh giá cơ hội đầu tư và dữ liệu cập nhật liên quan cổ phiếu FPT.',
    type: 'website',
    locale: 'vi_VN',
  },
}

export default function CoHoiDauTuPage() {
  return (
    <>
      <CoHoiDauTuIntro />
      <InsightsCards />
      <InvestmentOpportunity />
      <FptHighlight />
    </>
  )
}
