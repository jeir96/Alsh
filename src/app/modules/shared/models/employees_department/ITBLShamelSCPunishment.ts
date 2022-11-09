import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";
import { ITBLShamelPunishment } from "./ITBLShamelPunishment";
import { ITBLShamelPunishmentReason } from "./ITBLShamelPunishmentReason";
import { ITBLShamelSCCancelPunishment } from "./ITBLShamelSCCancelPunishment";

export interface ITBLShamelSCPunishment {
    serial? : number  ;
    serial_punishment? : number  ;
    id? : number  ;   
    punishment_id?:number  ;
    reason_id?:number  ;
    documenttype_id?:number  ;
    document_number?:string  ;
    documentdate? :Date  ;
    punishmentreason_name?:string  ;
    punishment_name?:string  ;
    documenttype_name?:string  ;
    is_cancel?:  string  ;   
    enterusername?:  string  ;
    edate?: string  ;
    etime?:  string  ;
    mdate?:  string  ;
    mtime? :  string ;

    modifyusername?:  string  ;


    cancel_serial? : number  ;

    cancel_document_id? :number;
    cancel_document_number? :string;
    cancel_documentdate? :string;
    cancel_punishmentreason_name? :string ;
    cancel_punishment_name? :string ;
    cancel_documenttype_name? :string ;

     TBLShamelSCCancelPunishment?: ITBLShamelSCCancelPunishment;
     TBLShamelDocumentType?: ITBLShamelDocumentType;
     TBLShamelPunishmentReason?: ITBLShamelPunishmentReason;
     TBLShamelPunishment?:ITBLShamelPunishment;
}
