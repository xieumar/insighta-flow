import { prisma } from "../lib/prisma";
import { parseQueryTree } from "../lib/query-tree-parser";
import { QueryGroup, QueryResponse } from "../types/query.types";

interface ExecuteQueryParams {
  query: QueryGroup;
  limit?: number;
  offset?: number;
}

export async function executeQuery({
  query,
  limit = 100,
  offset = 0,
}: ExecuteQueryParams): Promise<QueryResponse> {
  const where = parseQueryTree(query);

  const [results, total] = await prisma.$transaction([
    prisma.userProfile.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.userProfile.count({
      where,
    }),
  ]);

  return {
    results,
    total,
    limit,
    offset,
  };
}
