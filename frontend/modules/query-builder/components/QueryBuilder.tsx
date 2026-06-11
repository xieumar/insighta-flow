"use client";

import { useQueryStore } from "@/store";
import { QueryGroup } from "./QueryGroup";
import { QueryPreview } from "./QueryPreview";

export function QueryBuilder() {
  const query = useQueryStore((state) => state.query);

  return (
    <div id="tour-query-builder" className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-start">
      <div className="lg:col-span-2">
        <QueryGroup group={query} />
      </div>
      <div className="lg:col-span-1">
        <QueryPreview />
      </div>
    </div>
  );
}
export default QueryBuilder;
