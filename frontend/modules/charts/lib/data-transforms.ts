import { UserProfile } from "@/types";

export function transformIncomeByCategory(data: UserProfile[]) {
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};

  for (const row of data) {
    const cat = row.purchased_category;
    sums[cat] = (sums[cat] || 0) + row.income;
    counts[cat] = (counts[cat] || 0) + 1;
  }

  return Object.keys(sums).map((cat) => ({
    category: cat,
    averageIncome: Math.round(sums[cat] / counts[cat]),
  }));
}

export function transformGenderDistribution(data: UserProfile[]) {
  const counts: Record<string, number> = {};

  for (const row of data) {
    const gender = row.gender;
    counts[gender] = (counts[gender] || 0) + 1;
  }

  return Object.keys(counts).map((gender) => ({
    name: gender === "rather not say" ? "Other" : gender.charAt(0).toUpperCase() + gender.slice(1),
    value: counts[gender],
  }));
}

export function transformAgeHistogram(data: UserProfile[]) {
  const bins: Record<string, number> = {};

  for (const row of data) {
    const age = row.age;
    const binStart = Math.floor(age / 10) * 10;
    const binEnd = binStart + 9;
    const binLabel = `${binStart}-${binEnd}`;
    bins[binLabel] = (bins[binLabel] || 0) + 1;
  }

  return Object.keys(bins)
    .sort((a, b) => {
      const aVal = parseInt(a.split("-")[0], 10);
      const bVal = parseInt(b.split("-")[0], 10);
      return aVal - bVal;
    })
    .map((bin) => ({
      range: bin,
      count: bins[bin],
    }));
}

export function transformPurchasesOverTime(data: UserProfile[]) {
  const counts: Record<string, number> = {};

  for (const row of data) {
    if (!row.created_at) continue;
    const date = new Date(row.created_at);
    if (isNaN(date.getTime())) continue;
    
    const month = date.toLocaleString("en-US", { month: "short", year: "numeric" });
    counts[month] = (counts[month] || 0) + 1;
  }

  return Object.keys(counts)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((month) => ({
      date: month,
      count: counts[month],
    }));
}
