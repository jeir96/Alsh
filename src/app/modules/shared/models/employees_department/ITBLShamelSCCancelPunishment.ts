import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";
import { ITBLShamelPunishmentReason } from "./ITBLShamelPunishmentReason";

export interface ITBLShamelSCCancelPunishment {

    
    serial_punishment?: number   ;
    serial?: number   ;
    id ?:number   ;
    punishment_id?: number   ;
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
    is_cancel ?: string;

   
     TBLShamelDocumentType?: ITBLShamelDocumentType;
     TBLShamelPunishmentReason?: ITBLShamelPunishmentReason;

}