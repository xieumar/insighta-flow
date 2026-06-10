"use client";

import { useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import { transformPurchasesOverTime } from "../lib/data-transforms";
import { UserProfile } from "@/types";

interface PurchasesOverTimeProps {
  data: UserProfile[];
  loading?: boolean;
}

export function PurchasesOverTime({ data, loading }: PurchasesOverTimeProps) {
  const chartData = useMemo(() => transformPurchasesOverTime(data), [data]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Month,Purchases", ...chartData.map((d) => `"${d.date}",${d.count}`)].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `purchases_over_time_${Date.now()}.csv`;
    link.click();
  };

  return (
    <ChartCard
      title="Ingestion/Creation Trends Over Time"
      loading={loading}
      isEmpty={chartData.length === 0}
      onExport={handleExport}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 5 }}>
          <XAxis
            dataKey="date"
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "11px",
            }}
            labelStyle={{
              color: "var(--foreground)",
              fontWeight: "bold",
            }}
            itemStyle={{
              color: "var(--foreground)",
            }}
            formatter={(value: any) => [value, "Records"]}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
