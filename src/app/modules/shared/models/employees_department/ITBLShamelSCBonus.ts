import { TBLShamelBonus } from "./TBLShamelBonus";
import { TBLShamelBonusReason } from "./TBLShamelBonusReason";
import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";

export interface ITBLShamelSCBonus {

    serial?: number   ;
    id ?:number   ;
    bonus_id?: number   ;
    reason_id?:number   ;
    documenttype_id ?:number   ;   
    document_number?: string   ;
    documentdate?:Date   ;   
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
    bonusreason_name?:string   ;
    bonus_name?:string   ;
    documenttype_name?:string   ;
  
     TBLShamelDocumentType?: ITBLShamelDocumentType ;
     TBLShamelBonus?: TBLShamelBonus;
     TBLShamelBonusReason?: TBLShamelBonusReason ;

}