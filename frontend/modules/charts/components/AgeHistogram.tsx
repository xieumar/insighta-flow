"use client";

import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ChartCard } from "./ChartCard";
import { transformAgeHistogram } from "../lib/data-transforms";
import { UserProfile } from "@/types";

interface AgeHistogramProps {
  data: UserProfile[];
  loading?: boolean;
}

export function AgeHistogram({ data, loading }: AgeHistogramProps) {
  const chartData = useMemo(() => transformAgeHistogram(data), [data]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Age cohort,Count", ...chartData.map((d) => `"${d.range}",${d.count}`)].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `age_histogram_${Date.now()}.csv`;
    link.click();
  };

  return (
    <ChartCard
      title="Age Cohort Distribution"
      loading={loading}
      isEmpty={chartData.length === 0}
      onExport={handleExport}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 5 }}>
          <XAxis
            dataKey="range"
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
            formatter={(value: any) => [value, "Users"]}
          />
          <Bar
            dataKey="count"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
