import { ITBLShamelDocumentType } from "../../employees_department/ITBLShamelDocumentType";
import { TBLShamelEmployee } from "../../employees_department/TBLShamelEmployee";
import { TBLShamelShatebVartax } from "./TBLShamelShatebVartax";

export interface TBLShamelShatebPunishment {
    id?: number,
    serial?: number,
    shateb_number?: number,
    percent?: number,
    duration?: number,
    documenttype_id?: number,
    documentnum?: string,
    documentdate?: string,
    salary?: number,
    amount?: number,
    month_id?: number,
    year_id?: number,

    eisalnum ?:string;
    eisaldate?:Date;
    
    TBLShamelEmployee?: TBLShamelEmployee;
    TBLShamelDocumentType?:ITBLShamelDocumentType;
    
}
