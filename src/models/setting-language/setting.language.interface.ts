export interface settingLanguage<T>{
    name:string,
    code:string,
    rtl:boolean,
    translations:T[],
    active:boolean,
    default:boolean
}
export interface updatesettingLanguage<T>{
    id:string,
    name:string,
    code:string,
    rtl:boolean,
    translations:T[],
    active:boolean,
    default:boolean
}