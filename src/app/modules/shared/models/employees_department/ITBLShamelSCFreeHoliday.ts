import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";
import { ITBLShamelFreeHolidayReason } from "./ITBLShamelFreeHolidayReason";

export interface ITBLShamelSCFreeHoliday {
    serial ?: number  ;
    id ?: number  ;
    duration?:number  ;
    startdate ?:Date  ;
    enddate ?:Date  ;
    reason_id?:number  ;
    documenttype_id?:number  ;    
    document_number?:string  ;
    documentdate?:Date  ;
    documenttype_name?:string  ;
    freeholidayreason_name?:  string  ;   
    enterusername?:  string  ;
    edate?: string  ;
    etime?:  string  ;
    mdate?:  string  ;
    mtime ?:  string ;
    modifyusername?:  string  ;

     TBLShamelDocumentType ?:ITBLShamelDocumentType;
     TBLShamelFreeHolidayReason ?: ITBLShamelFreeHolidayReason;

}
