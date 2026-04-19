'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import InvestmentCard from "@/components/investment-card";

export default function InvestmentCards() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("FPT_insights")
        .select("*");

      if (error) {
        console.error("Error:", error);
      } else {
        setData(data || []);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-10">
          Cơ hội đầu tư FPT
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item) => (
            <InvestmentCard
              key={item.id}
              title={item.title}
              expectedReturn={item.expected_return}
              thesis={item.thesis}
              risk={item.risk}
              timeHorizon={item.time_horizon}
              badges={[]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
