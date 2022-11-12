import { ITBLShamelChangeReason } from "./ITBLShamelChangeReason";
import { ITBLShamelClass } from "./ITBLShamelClass";
import { ITBLShamelDepartment } from "./ITBLShamelDepartment";
import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";
import { ITBLShamelJobKind } from "./ITBLShamelJobKind";
import { ITBLShamelJobName } from "./ITBLShamelJobName";

export interface ITBLShamelSCJobState {
    serial ?: number  ;
    id ?: number  ;
    changedate?:Date  ;
    changereason_id ?:number  ;
    documenttype_id?:number  ;
    doc_number?:string  ;
    doc_date?:Date  ;
    department_id?:number;
    jobname_id?:number;
    jobkind_id?:number  ;
    class_id?:number  ;
    salary?:number  ;
    begindate?:Date;
    prevserial?:number;
    enterusername?:string   ;
    enterdate?:string   ;
    entertime?:string   ;
    modifyusername?:string   ;
    modifydate?:string   ;
    modifytime?:string   ;
    edate?: string  ;
    etime?:  string  ;
    mdate?:  string  ;
    mtime ?:  string ;
    changereason_name?:  string ;
    documenttype_name?:  string ;
    department_name?:  string ;
    jobname_name?:  string ;
    jobkind_name?:  string ;
    class_name?:  string ;

     TBLShamelChangeReason?: ITBLShamelChangeReason ;
     TBLShamelDocumentType?: ITBLShamelDocumentType;
     TBLShamelClass?: ITBLShamelClass ;
     TBLShamelJobKind?: ITBLShamelJobKind ;
     TBLShamelDepartment?: ITBLShamelDepartment;
    TBLShamelJobName?: ITBLShamelJobName;


}

	
	
