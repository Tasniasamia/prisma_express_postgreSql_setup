import { db } from "@/config/db";
import { AppError } from "@/errors/appError";

interface PaginationResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  currentPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}

export const pagination = async <T>(
  model: string,
  page: number = 1,
  limit: number = 10,
  filter: any = {},
  include?: any,
  select?: any
): Promise<PaginationResult<T>> => {
  const prismaModel = (db as any)[model];
  if (!prismaModel || typeof prismaModel.findMany !== "function") {
    throw new AppError(400, "Invalid model", `Model '${model}' does not exist`);
  }

  const skip = (page - 1) * limit;

  // ✅ Build query options safely
  const queryOptions: any = {
    where: filter,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  };

  if (include && Object.keys(include).length > 0) {
    queryOptions.include = include;
  } else if (select && Object.keys(select).length > 0) {
    queryOptions.select = select;
  }

  // ✅ Fetch data and count
  const [docs, totalDocs] = await Promise.all([
    prismaModel.findMany(queryOptions),
    prismaModel.count({ where: filter }),
  ]);

  const totalPages = Math.ceil(totalDocs / limit);

  return {
    docs,
    totalDocs,
    limit,
    currentPage: page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
};
