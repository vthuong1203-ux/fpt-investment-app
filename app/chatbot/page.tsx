import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ChatbotSection = dynamic(
  () => import('@/components/chatbot-section'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Chatbot AI - Hỏi đáp về cổ phiếu FPT',
  description: 'Đặt câu hỏi cho AI về triển vọng cổ phiếu FPT, chiến lược đầu tư và phân tích rủi ro.',
}

export default function ChatbotPage() {
  return <ChatbotSection />
}
