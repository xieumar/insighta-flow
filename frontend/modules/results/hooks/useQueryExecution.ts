import { useState } from "react";
import { toast } from "sonner";
import { useQueryStore } from "@/store/query.store";
import { useDatasetStore } from "@/store/dataset.store";
import { apiFetch } from "@/lib/api-client";

export function useQueryExecution() {
  const query = useQueryStore((state) => state.query);
  const { setResults, setLoading, loading } = useDatasetStore();
  const [error, setError] = useState<string | null>(null);

  const runQuery = async (limit = 100, offset = 0) => {
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
  };
}
