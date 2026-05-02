import type { Metadata } from 'next'
import CourseSection from '@/components/course-section'

export const metadata: Metadata = {
  title: 'Khóa học đầu tư',
  description: 'Nâng cao kiến thức đầu tư cổ phiếu với các khóa học từ cơ bản đến nâng cao, bao gồm phân tích AI và quản lý danh mục.',
}

export default function KhoaHocPage() {
  return <CourseSection />
}
