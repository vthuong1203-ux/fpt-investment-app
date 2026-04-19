'use client'
import dynamic from "next/dynamic";
import Header from '@/components/header'
import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import InsightsCards from '@/components/insights-cards'
import InvestmentOpportunity from '@/components/investment-opportunity'
import FptHighlight from '@/components/fpt-highlight'
import NewsSection from '@/components/news-section'
import CourseSection from '@/components/course-section'
import AccountCtaSection from '@/components/account-cta-section'
const ChatbotSection = dynamic(
  () => import('@/components/chatbot-section'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <InsightsCards />
        <InvestmentOpportunity />
        <FptHighlight />
        <NewsSection id="news" />
        <AccountCtaSection />
        <CourseSection id="courses" />
        <ChatbotSection id="chatbot" />
      </main>
      <Footer />
    </>
  )
}
