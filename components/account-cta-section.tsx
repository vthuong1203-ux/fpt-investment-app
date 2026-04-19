'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function AccountCtaSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent p-12 md:p-16 lg:p-20 shadow-2xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Bắt đầu đầu tư ngay hôm nay
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Mở tài khoản chứng khoán trong vòng 2 phút. Không phí ẩn, không yêu cầu phức tạp.
            </p>

            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-primary font-bold rounded-xl h-14 px-10 text-lg"
            >
              Mở tài khoản miễn phí
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-white/70 text-sm mt-6">
              Được hơn 50,000 nhà đầu tư tin tưởng. Không rủi ro, bạn có thể đóng tài khoản bất kỳ lúc nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
