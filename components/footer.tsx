import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">FPT Investment</h3>
            <p className="text-sm text-foreground/60">Nền tảng phân tích cổ phiếu FPT bằng AI cho nhà đầu tư Việt Nam.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><Link href="/co-hoi-dau-tu" className="hover:text-primary transition-colors">Phân tích cổ phiếu</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức & Cập nhật</Link></li>
              <li><Link href="/khoa-hoc" className="hover:text-primary transition-colors">Khoá học đầu tư</Link></li>
              <li><Link href="/chatbot" className="hover:text-primary transition-colors">Chatbot AI</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Công ty</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#" className="hover:text-primary transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chính sách riêng tư</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cài đặt cookie</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary p-0.5">
              <div className="w-full h-full bg-white dark:bg-card rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">FPT</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-foreground">FPT Corporation</span>
          </div>
          <p className="text-sm text-foreground/60">© 2024 FPT Investment. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
