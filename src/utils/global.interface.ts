export interface createDocumentOptions<TData,TModel>{
    data:TData,
    model:TModel,
}

export interface existDocumentOptions{
    query:Record<string,any>,
    select:any,
    model:any,
    shouldExist:boolean,
    isError:boolean,
    errorMessages?:string,
    include:any
}