import type { Metadata } from 'next'
import FptHighlight from '@/components/fpt-highlight'

export const metadata: Metadata = {
  title: 'Cơ hội đầu tư FPT',
  description: 'Phân tích giá cổ phiếu FPT realtime, biểu đồ biến động và nhận định thị trường từ hệ thống AI.',
}

export default function CoHoiDauTuPage() {
  return <FptHighlight />
}
