'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Re-mounts on route change so a short CSS enter animation runs.
 * First paint skips motion so SSR/initial load không bị nháy.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const skipInitialMotion = useRef(true)

  useEffect(() => {
    skipInitialMotion.current = false
  }, [])

  return (
    <div key={pathname} className={skipInitialMotion.current ? undefined : 'route-content'}>
      {children}
    </div>
  )
}
