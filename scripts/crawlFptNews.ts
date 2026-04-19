import Parser from 'rss-parser'

const parser = new Parser()

// 🔥 KEYWORD MẠNH (ảnh hưởng giá)
const strongKeywords = [
    'revenue',
    'profit',
    'growth',
    'earnings',
    'deal',
    'contract',
    'partnership',
    'ai',
    'investment',
    'expansion',
]

// 🔥 SOURCE TỐT
const validSources = [
    'vietnam',
    'cafef',
    'vietstock',
    'investing',
    'market',
    'finance',
    'business',
    'reuters',
    'bloomberg',
]

// 🔥 ANTI-NOISE
const bannedWords = [
    'pipe',
    'elbow',
    'boot düsseldorf',
    'sail',
    'plumbing',
]

// 🔥 SENTIMENT IMPROVED
function getSentiment(title: string) {
    const t = title.toLowerCase()

    if (
        t.includes('deal') ||
        t.includes('contract') ||
        t.includes('growth') ||
        t.includes('profit') ||
        t.includes('revenue') ||
        t.includes('award') ||
        t.includes('expansion')
    ) return 'Positive'

    if (
        t.includes('loss') ||
        t.includes('decline') ||
        t.includes('drop')
    ) return 'Negative'

    return 'Neutral'
}

async function crawlFptNews() {
    console.log('🚀 Crawling & filtering...\n')

    const feed = await parser.parseURL(
        'https://news.google.com/rss/search?q=FPT'
    )

    // 🔥 STEP 1: CLEAN
    const raw = (feed.items as any[]).map((item: any) => ({
        title: item.title || '',
        summary: item.contentSnippet || '',
        link: item.link || '',
        sentiment: getSentiment(item.title || ''),
    }))

    // 🔥 STEP 2: REMOVE DUPLICATE (theo title)
    const unique = Array.from(
        new Map(raw.map(item => [item.title, item])).values()
    )

    // 🔥 STEP 3: FILTER QUALITY
    const filtered = unique.filter((article: any) => {
        const title = article.title.toLowerCase()
        const link = article.link.toLowerCase()

        // ❌ remove noise
        if (bannedWords.some(w => title.includes(w))) return false

        const isFpt = title.includes('fpt')

        const hasSignal = strongKeywords.some(k =>
            title.includes(k)
        )

        const goodSource = validSources.some(s =>
            link.includes(s)
        )

        return isFpt && (hasSignal || goodSource)
    })

    // 🔥 STEP 4: SCORE (càng nhiều keyword càng tốt)
    const scored = filtered.map((a: any) => {
        const score = strongKeywords.reduce((acc, k) => {
            return acc + (a.title.toLowerCase().includes(k) ? 1 : 0)
        }, 0)

        return { ...a, score }
    })

    // 🔥 STEP 5: SORT
    const sorted = scored.sort((a, b) => b.score - a.score)

    // 🔥 FINAL PICK
    const finalNews = sorted.slice(0, 7)

    console.log(`📰 Raw: ${raw.length}`)
    console.log(`🧹 Unique: ${unique.length}`)
    console.log(`🎯 Filtered: ${filtered.length}`)
    console.log(`🔥 Final: ${finalNews.length}\n`)

    console.log('=== INVESTMENT NEWS ===\n')

    finalNews.forEach((a: any, i: number) => {
        console.log(`${i + 1}. ${a.title}`)
        console.log(`   → ${a.sentiment} | score: ${a.score}`)
        console.log(`   → ${a.link}\n`)
    })
}

crawlFptNews()