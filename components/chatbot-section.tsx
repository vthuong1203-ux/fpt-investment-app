'use client'

import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export default function ChatbotSection({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Hỏi AI về cổ phiếu FPT
            </h2>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Chatbot AI của chúng tôi được huấn luyện trên dữ liệu thị trường thực tế, tin tức, và báo cáo tài chính của FPT. Đặt câu hỏi bất kỳ và nhận câu trả lời chi tiết trong vài giây.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">✓</span>
                </div>
                <p className="text-foreground/80">Phân tích chi tiết về triển vọng FPT</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">✓</span>
                </div>
                <p className="text-foreground/80">So sánh FPT với các công ty cùng ngành</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm font-bold">✓</span>
                </div>
                <p className="text-foreground/80">Khuyến nghị chiến lược đầu tư cá nhân</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-medium rounded-xl h-12 px-8"
            >
              Thử chatbot ngay
              <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right: Mock Chat UI */}
          <div className="relative">
            <div className="bg-white dark:bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 border-b border-border/20">
                <p className="text-white font-semibold">FPT Advisor AI</p>
                <p className="text-white/70 text-sm">Luôn sẵn sàng trợ giúp</p>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 h-80 overflow-y-auto">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-primary text-white rounded-lg px-4 py-3 text-sm">
                    FPT có thể tăng trưởng bao nhiêu trong 5 năm tới?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-xs bg-muted text-foreground rounded-lg px-4 py-3 text-sm space-y-2">
                    <p>
                      Dựa trên phân tích hiện tại, FPT được dự kiến tăng trưởng 15-20% hàng năm với:
                    </p>
                    <ul className="text-xs space-y-1 ml-4 list-disc">
                      <li>Digital transformation: +25% yoy</li>
                      <li>Software export: +18% yoy</li>
                      <li>Telecom services: +15% yoy</li>
                    </ul>
                  </div>
                </div>

                {/* User message */}
                <div className="flex justify-end">
                  <div className="max-w-xs bg-primary text-white rounded-lg px-4 py-3 text-sm">
                    Rủi ro chính là gì?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="max-w-xs bg-muted text-foreground rounded-lg px-4 py-3 text-sm">
                    Rủi ro cốt lõi: Cạnh tranh toàn cầu, đồng tiền, và thay đổi chính sách quy định...
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-border p-4 bg-muted/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Đặt câu hỏi..."
                    className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
