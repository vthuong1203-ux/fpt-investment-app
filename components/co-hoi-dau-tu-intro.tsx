import Link from 'next/link'

export default function CoHoiDauTuIntro() {
  return (
    <header className="border-b border-border bg-background text-left">
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2 text-foreground/40" aria-hidden>
              /
            </span>
            <span className="text-foreground">Cơ hội đầu tư</span>
          </nav>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Cơ hội đầu tư cổ phiếu FPT
        </h1>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
          Tổng hợp tín hiệu chiến lược và đánh giá cơ hội đầu tư khi hệ thống có dữ liệu insight; phần cập nhật giá và nhận định chỉ hiển thị khi đã có đủ bản ghi nội bộ. Thông tin chỉ mang tính tham khảo, không thay thế tư vấn tài chính chuyên nghiệp.
        </p>
        </div>
      </div>
    </header>
  )
}
