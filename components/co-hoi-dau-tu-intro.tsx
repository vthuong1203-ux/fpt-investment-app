import Link from 'next/link'
import { ArrowRight, BookOpen, LineChart, MessageCircle, Newspaper } from 'lucide-react'

export default function CoHoiDauTuIntro() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-secondary/10 to-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 sm:py-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          Phân tích đầu tư · cổ phiếu FPT
        </p>
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
          Cơ hội đầu tư cổ phiếu FPT và phân tích AI chuyên sâu
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-foreground/70 mb-10">
          Trang chủ FPT Investment Insights là điểm vào nhanh. Tại đây bạn đi sâu: đánh giá cơ hội từ tín hiệu AI trên các insight thị trường,
          theo dõi nhận định realtime trên cổ phiếu FPT, và liên kết tới các nội dung{' '}
          <Link href="/tin-tuc" className="text-primary underline-offset-4 hover:underline">
            tin tức
          </Link>
          ,{' '}
          <Link href="/khoa-hoc" className="text-primary underline-offset-4 hover:underline">
            khoá học đầu tư
          </Link>{' '}
          và{' '}
          <Link href="/chatbot" className="text-primary underline-offset-4 hover:underline">
            chatbot AI
          </Link>
          — toàn bộ trải nghiệm được thiết kế để bổ trợ nhau cho nhà đầu tư Việt Nam.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-background/80 p-8 shadow-sm">
            <h2 className="text-xs font-black uppercase tracking-widest text-foreground/50 mb-4">
              Vì sao FPT được chú ý?
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
              <li>
                • <strong className="text-foreground">Hạ tầng số và chuyển đổi số trong nước</strong> là động lực tăng trưởng đệ quên cho các
                dòng dịch vụ CNTT.
              </li>
              <li>
                • <strong className="text-foreground">Xuất khẩu phần mềm</strong> mở rộng thị phần toàn cầu, là yếu tố thường xuyên được thị trường định giá.
              </li>
              <li>
                • <strong className="text-foreground">Viễn thông và nền tảng AI</strong> bổ trợ dòng tiền ổn định, giúp bức tranh đầu tư có nhiều lớp
                phòng thủ hơn.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-primary/15 bg-primary/5 p-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-primary mb-4">
              Cách đọc nội dung trên trang này
            </h2>
            <ol className="space-y-3 text-sm leading-relaxed text-foreground/80 list-decimal pl-5">
              <li>
                Khối <strong className="text-foreground">đánh giá cơ hội</strong> tổng hợp sentiment và impact từ bảng insight — có lợi cho cái
                nhìn vĩ mô ngắn hạn.
              </li>
              <li>
                Phần <strong className="text-foreground">cập nhật giá &amp; nhận định</strong> dùng dữ liệu giá realtime và phiên AI mới nhất khi đã được đồng bộ backend.
              </li>
              <li>
                Lưu ý: thông tin mang tính <strong className="text-foreground">hỗ trợ nghiên cứu</strong>, không phải tư vấn tài chính cá nhân.
              </li>
            </ol>
          </div>
        </div>

        <nav
          aria-label="Điều hướng chức năng chính"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Link
            href="/"
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary/30"
          >
            <LineChart className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <span className="font-bold text-foreground group-hover:text-primary">Trang chủ</span>
              <p className="mt-1 text-xs text-foreground/60 leading-snug">
                Bức tranh tổng quan và các lối vào chức năng chính.
              </p>
            </div>
          </Link>
          <Link
            href="/tin-tuc"
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary/30"
          >
            <Newspaper className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <span className="font-bold text-foreground group-hover:text-primary">Tin tức thị trường</span>
              <p className="mt-1 text-xs text-foreground/60 leading-snug">
                Tin nguồn và chủ đề liên quan FPT được tổng hợp cho ngữ cảnh đầu tư.
              </p>
              <ArrowRight className="mt-2 h-4 w-4 text-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
          <Link
            href="/khoa-hoc"
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary/30"
          >
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <span className="font-bold text-foreground group-hover:text-primary">Khoá học đầu tư</span>
              <p className="mt-1 text-xs text-foreground/60 leading-snug">
                Nền tảng kiến thức trước khi vào các quyết định có rủi ro.
              </p>
              <ArrowRight className="mt-2 h-4 w-4 text-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
          <Link
            href="/chatbot"
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-secondary/30"
          >
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <div>
              <span className="font-bold text-foreground group-hover:text-primary">Chatbot AI</span>
              <p className="mt-1 text-xs text-foreground/60 leading-snug">
                Hỏi đáp nhanh theo ngữ cảnh FPT và strategy.
              </p>
              <ArrowRight className="mt-2 h-4 w-4 text-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
        </nav>
      </div>
    </section>
  )
}
