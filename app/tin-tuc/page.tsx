import type { Metadata } from 'next'
import NewsSection from '@/components/news-section'

export const metadata: Metadata = {
  title: 'Tin tức FPT',
  description: 'Cập nhật tin tức mới nhất về cổ phiếu FPT, thông báo doanh nghiệp và diễn biến thị trường.',
}

export default function TinTucPage() {
  return <NewsSection />
}
