export interface createDocumentOptions<TData,TModel>{
    data:TData,
    model:TModel,
}

export interface existDocumentOptions{
    query:Record<string,any>,
    model:any,
    shouldExist:boolean,
    isError:boolean,
    errorMessages?:string,
    include:any
}
export interface updateDocumentOptions<TData,TModel>{
    id:string,
    data:TData,
    model:TModel
}
export interface deleteDocumentOptions<TModel>{
    id:string,
    model:TModel
}
export interface findDocumentOptions<TModel>{
    model: TModel; // যেমন 'user' | 'blog' | 'comment'
    filter?: Record<string,string>;
    single?: boolean;
    include?: any;
    select?: any;
    orderBy?: Record<string, "asc" | "desc">;

}

export interface getDocuments<TModel>{
    model:TModel,
    filter:any,
    include:any,
    query:any,
    select:any,
    omit?:any

}

export interface getDocumentsOptions<T> {
    model: string;
    filter?: any;
    include?: any;
    select?: any;
    page?: number;
    limit?: number;
    search?: any;
    omit?:any
  }