import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useQueryStore } from "@/store/query.store";
import { useDatasetStore } from "@/store/dataset.store";
import { apiFetch } from "@/lib/api-client";

function isQueryTreeValid(node: any): boolean {
  if (node.type === "group") {
    return node.rules.every((child: any) => isQueryTreeValid(child));
  }
  if (node.type === "rule") {
    if (!node.field) return false;
    if (node.value === undefined || node.value === null || String(node.value).trim() === "") return false;
    if (node.field === "age") {
      const val = parseInt(node.value, 10);
      if (isNaN(val) || val < 0) return false;
    } else if (node.field === "income") {
      const val = parseFloat(node.value);
      if (isNaN(val) || val < 0) return false;
    }
    return true;
  }
  return false;
}

export function useQueryExecution() {
  const query = useQueryStore((state) => state.query);
  const { setResults, setLoading, loading } = useDatasetStore();
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(() => isQueryTreeValid(query), [query]);

  const runQuery = async (limit = 100, offset = 0) => {
    if (!isValid) {
      toast.error("Please resolve all query validation errors first", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch("/api/query", {
        method: "POST",
        body: JSON.stringify({
          query,
          limit,
          offset,
        }),
      });

      setResults(response.results, response.total);
      toast.success("Query executed successfully", {
        position: "top-right",
      });
    } catch (err: any) {
      const errMsg = err.message || "Failed to execute query";
      setError(errMsg);
      toast.error(errMsg, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    runQuery,
    loading,
    error,
    isValid,
  };
}
