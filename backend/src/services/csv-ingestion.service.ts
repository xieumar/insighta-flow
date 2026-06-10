import { Readable } from "stream";
import { parse } from "csv-parse";
import { prisma } from "../lib/prisma";
import { userProfileSchema } from "../lib/schema-validator";
import { IngestionResult } from "../types/ingestion.types";

const CHUNK_SIZE = 500;

export async function ingestCsvStream(stream: Readable): Promise<IngestionResult> {
  const result: IngestionResult = {
    status: "success",
    total_rows_received: 0,
    rows_inserted: 0,
    rows_skipped: 0,
    skip_reasons: {
      duplicate: 0,
      invalid_age: 0,
      missing_name: 0,
      invalid_gender: 0,
      invalid_purchased_category: 0,
      invalid_income: 0,
      invalid_country: 0,
    },
  };

  const csvParser = stream.pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
  );

  let chunk: any[] = [];

  const processChunk = async (rows: any[]) => {
    // 1. Collect all full_name & age pairs in the chunk to fetch existing ones in one query
    const conditions = rows.map((row) => ({
      full_name: row.full_name,
      age: row.age,
    }));

    const existing = await prisma.userProfile.findMany({
      where: {
        OR: conditions,
      },
      select: {
        full_name: true,
        age: true,
      },
    });

    const existingSet = new Set(
      existing.map((e: { full_name: string; age: number }) => `${e.full_name.toLowerCase().trim()}_${e.age}`)
    );

    const uniqueRowsToInsert: any[] = [];

    for (const row of rows) {
      const key = `${row.full_name.toLowerCase().trim()}_${row.age}`;
      if (existingSet.has(key)) {
        result.rows_skipped++;
        result.skip_reasons.duplicate++;
      } else {
        uniqueRowsToInsert.push({
          full_name: row.full_name,
          gender: row.gender,
          age: row.age,
          country: row.country,
          income: row.income,
          purchased_category: row.purchased_category,
          created_at: row.created_at,
        });
        // Add to existingSet to prevent duplicate check collisions inside the same chunk
        existingSet.add(key);
      }
    }

    if (uniqueRowsToInsert.length > 0) {
      await prisma.userProfile.createMany({
        data: uniqueRowsToInsert,
      });
      result.rows_inserted += uniqueRowsToInsert.length;
    }
  };

  for await (const rawRow of csvParser) {
    result.total_rows_received++;

    // Validate the row against the schema
    const validation = userProfileSchema.safeParse(rawRow);

    if (!validation.success) {
      result.rows_skipped++;
      
      const errorMsg = validation.error.errors[0]?.message;
      if (errorMsg === "missing_name") result.skip_reasons.missing_name++;
      else if (errorMsg === "invalid_age") result.skip_reasons.invalid_age++;
      else if (errorMsg === "invalid_country") result.skip_reasons.invalid_country++;
      else if (errorMsg === "invalid_income") result.skip_reasons.invalid_income++;
      else if (validation.error.errors[0]?.path[0] === "gender") result.skip_reasons.invalid_gender++;
      else if (validation.error.errors[0]?.path[0] === "purchased_category") result.skip_reasons.invalid_purchased_category++;
      else result.skip_reasons.invalid_income++; // general fallback
      
      continue;
    }

    chunk.push(validation.data);

    if (chunk.length >= CHUNK_SIZE) {
      await processChunk(chunk);
      chunk = [];
    }
  }

  // Process remaining items in buffer
  if (chunk.length > 0) {
    await processChunk(chunk);
  }

  return result;
}
