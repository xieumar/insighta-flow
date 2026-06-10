export interface CsvRowInput {
  full_name?: string;
  gender?: string;
  age?: string;
  country?: string;
  income?: string;
  purchased_category?: string;
  created_at?: string;
}

export interface IngestionResult {
  status: "success" | "error";
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
  };
}
