'use client'

import { Shield, Clock } from 'lucide-react'

interface InvestmentCardProps {
  title: string
  expectedReturn: string
  thesis: string
  risk: string
  timeHorizon: string
  badges: string[]
}

export default function InvestmentCard({
  title,
  expectedReturn,
  thesis,
  risk,
  timeHorizon,
  badges= [],
}: InvestmentCardProps) {
  return (
    <div className="group relative h-full bg-white dark:bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full gap-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
          
          {/* Expected Return Badge */}
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Lợi suất kỳ vọng: <span className="font-bold">{expectedReturn}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Thesis */}
        <p className="text-foreground/70 leading-relaxed text-sm flex-1">
          {thesis}
        </p>

        {/* Risk & Time Horizon */}
        <div className="grid grid-cols-2 gap-3 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary/60" />
            <div>
              <p className="text-xs text-foreground/50">Rủi ro</p>
              <p className="text-sm font-semibold text-foreground">{risk}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary/60" />
            <div>
              <p className="text-xs text-foreground/50">Kỳ hạn</p>
              <p className="text-sm font-semibold text-foreground">{timeHorizon}</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {badges?.map((badge, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
