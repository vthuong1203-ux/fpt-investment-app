import { Star } from 'lucide-react'

const courses = [
  {
    title: 'Cơ bản về đầu tư',
    description: 'Học các nguyên tắc cơ bản của đầu tư cổ phiếu, đánh giá giá trị và chiến lược quản lý danh mục.',
    level: 'Beginner',
    students: '12,500',
    rating: '4.8',
  },
  {
    title: 'Phân tích Fintech & AI',
    description: 'Hiểu biết sâu về các công ty fintech, AI, và cách đánh giá tiềm năng tăng trưởng của chúng.',
    level: 'Intermediate',
    students: '8,200',
    rating: '4.9',
  },
  {
    title: 'Quản lý danh mục cao cấp',
    description: 'Chiến lược đầu tư nâng cao, quản lý rủi ro, và tối ưu hóa danh mục cho doanh thu dài hạn.',
    level: 'Advanced',
    students: '3,500',
    rating: '4.7',
  },
]

export default function CourseSection({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Khóa học đầu tư
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Nâng cao kiến thức về đầu tư với các khóa học từ chuyên gia hàng đầu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-card rounded-2xl p-8 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col h-full gap-4">
                <div className="inline-block w-fit px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  {course.level}
                </div>

                <h3 className="text-xl font-bold text-foreground">{course.title}</h3>

                <p className="text-foreground/70 text-sm leading-relaxed flex-1">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-foreground/50">Học viên</p>
                    <p className="font-semibold text-foreground">{course.students}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <p className="font-semibold text-foreground">{course.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
