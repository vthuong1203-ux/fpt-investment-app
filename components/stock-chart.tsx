'use client'

import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

export default function StockChart({ data }: { data: any[] }) {
    return (
        <div className="h-40 w-full">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}