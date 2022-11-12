import { ITBLShamelChangeReason } from "./ITBLShamelChangeReason";
import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";

export interface ITBLShamelIncMarsoom {

    incmarsoom_id ?: number  ;
    incmarsoomdata?:string;
    changedate ?:Date  ;
    changereason_id?:number  ;
    documenttype_id?:number  ;
    document_number?:string  ;
    documentdate?:Date  ;
    begindate?:Date  ;
    incpercentage?:number  ;
    additionalvalue?:number  ;
    enterusername?:string   ;
    enterdate?:string   ;
    entertime?:string   ;
    modifyusername?:string   ;
    modifydate?:string   ;
    modifytime?:string   ;
    edate?:string   ;
    etime?:string   ;
    mdate?:string   ;
    mtime?:string   ;
    changereason_name?:string ;
    documenttype_name?:string;

    TBLShamelDocumentType?:ITBLShamelDocumentType;
    TBLShamelChangeReason?:ITBLShamelChangeReason;

}