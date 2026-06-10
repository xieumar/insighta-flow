"use client";

import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartCard } from "./ChartCard";
import { transformGenderDistribution } from "../lib/data-transforms";
import { UserProfile } from "@/types";

interface GenderDistributionProps {
  data: UserProfile[];
  loading?: boolean;
}

const COLORS = [
  "hsl(var(--primary))",
  "rgba(234, 76, 137, 0.6)",
  "rgba(234, 76, 137, 0.25)",
];

export function GenderDistribution({ data, loading }: GenderDistributionProps) {
  const chartData = useMemo(() => transformGenderDistribution(data), [data]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Gender,Count", ...chartData.map((d) => `"${d.name}",${d.value}`)].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `gender_distribution_${Date.now()}.csv`;
    link.click();
  };

  return (
    <ChartCard
      title="Gender Distribution"
      loading={loading}
      isEmpty={chartData.length === 0}
      onExport={handleExport}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px border hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "11px",
              color: "hsl(var(--foreground))",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
