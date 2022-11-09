import { ITBLShamelDoctor } from "./ITBLShamelDoctor";
import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";

export interface ITBLShamelSCHealthHoliday
{
    id?:number;	
    serial?:number;
    duration?:number;	
    startdate?:Date;
    enddate?:Date;
    sick?:string;
    doctor_id?:number;	
    documenttype_id?:number;	
    document_number?:string
    documentdate?:Date	;
    enterusername?:string;
    enterdate?:string	;
    entertime?:string	;
    modifyusername?:string	;
    modifydate?:string	;
    modifytime?:string	;


     TBLShamelDocumentType?: ITBLShamelDocumentType;
     TBLShamelDoctor?: ITBLShamelDoctor;
}