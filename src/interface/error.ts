type TErrorSource={
    path:string | number | undefined,
    message: string | any
}

type TArrayErrorSource={
    path:string | number | undefined,
    message: string | any
}[]

type TGenericErrorResponse={
    success:boolean
    statusCode: number ,
    message: string,
    errorMessage?:string ,
    errorDetails?: unknown ,
    errorSources?:TArrayErrorSource
}
export {TErrorSource,TArrayErrorSource,TGenericErrorResponse}