import type { Metadata } from 'next'
import CoHoiDauTuIntro from '@/components/co-hoi-dau-tu-intro'
import FptHighlight from '@/components/fpt-highlight'
import InvestmentOpportunity from '@/components/investment-opportunity'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cơ hội đầu tư FPT',
  description:
    'Phân tích cơ hội đầu tư cổ phiếu FPT: chỉ báo AI từ insight, cập nhật giá và nhận định realtime, liên kết tin tức, khoá học và chatbot AI cho nhà đầu tư Việt Nam.',
  keywords: [
    'cổ phiếu FPT',
    'cơ hội đầu tư FPT',
    'phân tích FPT',
    'FPT realtime',
    'AI đầu tư',
  ],
  openGraph: {
    title: 'Cơ hội đầu tư cổ phiếu FPT | FPT Investment Insights',
    description:
      'Đánh giá thị trường và FPT qua chỉ báo AI, nhận định realtime và các lối đi sâu: tin tức, khoá học, chatbot.',
  },
}

export default function CoHoiDauTuPage() {
  return (
    <>
      <CoHoiDauTuIntro />
      <InvestmentOpportunity showPlaceholderWhenEmpty />
      <FptHighlight />
    </>
  )
}
