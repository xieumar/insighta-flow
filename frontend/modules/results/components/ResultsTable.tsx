"use client";

import { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDatasetStore } from "@/store/dataset.store";
import { useQueryExecution } from "../hooks/useQueryExecution";
import { UserProfile } from "@/types";

const columnHelper = createColumnHelper<UserProfile>();

export function ResultsTable() {
  const { results, total, loading } = useDatasetStore();
  const { runQuery } = useQueryExecution();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(0);
  }, [total]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("full_name", {
        header: "Name",
        cell: (info) => (
          <span className="font-medium text-foreground">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("age", {
        header: "Age",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("gender", {
        header: "Gender",
        cell: (info) => (
          <span className="capitalize text-muted-foreground">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("country", {
        header: "Country",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("income", {
        header: "Income",
        cell: (info) => (
          <span className="font-mono">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("purchased_category", {
        header: "Category",
        cell: (info) => (
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground ring-1 ring-inset ring-border">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "Created At",
        cell: (info) => (
          <span className="text-muted-foreground">
            {new Date(info.getValue()).toLocaleDateString()}
          </span>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: results,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    runQuery(pageSize, newPageIndex * pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(0);
    runQuery(newPageSize, 0);
  };

  const exportToCSV = () => {
    if (!results.length) return;
    const headers = [
      "ID",
      "Full Name",
      "Age",
      "Gender",
      "Country",
      "Income",
      "Purchased Category",
      "Created At",
    ];
    const rows = results.map((row) => [
      row.id,
      row.full_name,
      row.age,
      row.gender,
      row.country,
      row.income,
      row.purchased_category,
      row.created_at,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `insighta_query_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!loading && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border border-dashed border-border rounded-xl p-16 text-center bg-card/25 backdrop-blur-sm">
        <div className="rounded-full bg-primary/10 p-4 mb-4 text-primary animate-pulse">
          <Database className="size-8" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          No results to display
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          Build and run a query using the workspace controls above to fetch demographic profiles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Query Results
          </h2>
          <p className="text-xs text-muted-foreground">
            Showing {results.length} of {total} records found
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          disabled={loading || results.length === 0}
          className="gap-1.5 h-9 text-xs"
        >
          <Download className="size-3.5" />
          Export CSV
        </Button>
      </div>

      <div className="relative border border-border rounded-xl bg-card overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
            <Spinner className="size-8 text-primary" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-border bg-muted/40 transition-colors"
                >
                  {headerGroup.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const sortDirection = header.column.getIsSorted();

                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className={`px-4 py-3 text-xs font-semibold text-muted-foreground tracking-wider select-none ${
                          canSort ? "cursor-pointer hover:bg-muted/60" : ""
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {canSort && (
                            <span>
                              {sortDirection === "asc" ? (
                                <ChevronUp className="size-3 text-primary" />
                              ) : sortDirection === "desc" ? (
                                <ChevronDown className="size-3 text-primary" />
                              ) : (
                                <ChevronsUpDown className="size-3 text-muted-foreground/50" />
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border bg-card p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            Page {pageIndex + 1} of {totalPages}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0 || loading}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex >= totalPages - 1 || loading}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
