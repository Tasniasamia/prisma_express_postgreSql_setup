import { AppError } from "@/errors/appError";
import { db } from "@/config/db";
import {
  createDocumentOptions,
  existDocumentOptions,
  updateDocumentOptions,
  deleteDocumentOptions,
  findDocumentOptions,
  getDocumentsOptions,
} from "./global.interface";
import { pagination } from "./pagination";

export class globalService {
  static createDocument = async <T, D>({
    data,
    model,
  }: createDocumentOptions<T, D>): Promise<T> => {

    const createdDoc = await (db as any)[model].create({data:data});
    const findDoc = await (db as any)[model].findUnique({
      where: { id: createdDoc?.id },
    });
    return findDoc;
  };
  static existDocument = async <T>({
    query,
    model,
    shouldExist = false,
    isError,
    errorMessages,
    include,
  }: existDocumentOptions): Promise<T > => {

      const findDoc =await (db as any)[model].findFirst({
      where: query,
      ...(include && { include }),
    });
    console.log("findDoc",findDoc);
    if (findDoc && !shouldExist && isError) {
      throw new AppError(400, "Something went wrong", `${model} already exist`);
    }
    if (!findDoc && shouldExist && isError) {
      throw new AppError(400, "Request Failed!", `${model} not found`);
    }
    return findDoc;
  };

  static updateDocument = async <T, D>({
    id,
    data,
    model,
  }: updateDocumentOptions<T, D>): Promise<T> => {
    const updateDoc = await (db as any)[model].update({
      where: { id: id },
      data: data,
    });
    return updateDoc;
  };
  static deleteDocument = async <T>({
    id,
    model,
  }: deleteDocumentOptions<T>): Promise<T> => {
    const deleteDoc = await (db as any)[model].delete({ where: {id:id} });
    return deleteDoc;
  };
  static findDocuments = async <T>({
    model,
    filter,
    single = true,
    include,
    select,
  }: findDocumentOptions<T>): Promise<T> => {
    let data;
    if (single) {
      data = await (db as any)[model].findFirst({
        where: filter,
        select,
        include,
        sort: { createdAt: "dec" },
      });
    } else {
      data = await (db as any)[model].findMany({
        where: filter,
        select,
        include,
        sort: { createdAt: "dec" },
      });
    }
    return data;
  };
  static async getDocuments<T>({
    model,
    filter = {},
    include,
    select,
    page,
    limit,
    search,
  }: getDocumentsOptions<T>): Promise<any> {
    const prismaModel = (db as any)[model];
    if (!prismaModel) throw new Error(`Model '${model}' not found`);

    let where = { ...filter };
    if (search) {
      where = {
        ...where,
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    if (page && limit) {
      return await pagination<T>(model, page, limit, where, include, select);
    }

    const docs = await prismaModel.findMany({
      where,
      include,
      select,
      orderBy: { createdAt: "desc" },
    });

    return docs;
  }}
