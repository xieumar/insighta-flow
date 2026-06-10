"use client";

import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import { transformIncomeByCategory } from "../lib/data-transforms";
import { UserProfile } from "@/types";

interface IncomeByCategoryProps {
  data: UserProfile[];
  loading?: boolean;
}

export function IncomeByCategory({ data, loading }: IncomeByCategoryProps) {
  const chartData = useMemo(() => transformIncomeByCategory(data), [data]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Category,Average Income", ...chartData.map((d) => `"${d.category}",${d.averageIncome}`)].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `income_by_category_${Date.now()}.csv`;
    link.click();
  };

  return (
    <ChartCard
      title="Average Income by Category"
      loading={loading}
      isEmpty={chartData.length === 0}
      onExport={handleExport}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ left: -10, right: 10, top: 10, bottom: 5 }}>
          <XAxis
            dataKey="category"
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `$${val / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px border hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "11px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Avg Income"]}
            labelClassName="font-bold text-foreground"
          />
          <Bar
            dataKey="averageIncome"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
