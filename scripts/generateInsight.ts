import { execSync } from 'child_process'

export function generateInsight(news: any[]) {
    const newsText = news
        .map((n, i) => `${i + 1}. ${n.title}`)
        .join('\n')

    const prompt = `
You are a professional equity research analyst.

Analyze the following news about FPT and generate investment insight.

News:
${newsText}

Return JSON ONLY:

{
  "sentiment": "Bullish | Neutral | Bearish",
  "summary": "...",
  "drivers": "...",
  "confidence": "High | Medium | Low"
}
`

    const result = execSync(`echo "${prompt}" | gemini`, {
        encoding: 'utf-8',
    })

    return result
}