import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function updateData() {
    console.log("Updating data...")

    try {
        const price = {
            ticker: 'FPT',
            price: Math.floor(85000 + Math.random() * 5000),
            change_percent: Number((Math.random() * 5).toFixed(2)),
        }

        await supabase.from('stock_prices').insert(price)

        await supabase.from('articles').insert({
            title: 'FPT mở rộng AI tại Nhật Bản',
            summary: 'FPT tiếp tục tăng trưởng mạnh nhờ thị trường quốc tế',
            published_at: new Date(),
            highlighted: Math.random() > 0.7,
        })

        await supabase.from('fpt_insights').insert({
            sentiment: 'Bullish',
            confidence: 'High Conviction',
            summary: 'FPT hưởng lợi từ AI + xuất khẩu phần mềm',
        })

        console.log("Done")
    } catch (err) {
        console.error(err)
    }
}

updateData()