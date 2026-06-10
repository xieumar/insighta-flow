export interface IngestionMetrics {
  total_rows_received: number;
  rows_inserted: number;
  rows_skipped: number;
  skip_reasons: {
    duplicate: number;
    invalid_age: number;
    missing_name: number;
    invalid_gender: number;
    invalid_purchased_category: number;
    invalid_income: number;
    invalid_country: number;
    [key: string]: number;
  };
}

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadState {
  status: UploadStatus;
  progress: number;
  error: string | null;
  metrics: IngestionMetrics | null;
}
