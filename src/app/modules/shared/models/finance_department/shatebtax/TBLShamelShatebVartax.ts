import { ITBLShamelDoctor } from "../../employees_department/ITBLShamelDoctor";
import { ITBLShamelDocumentType } from "../../employees_department/ITBLShamelDocumentType";
import { TBLShamelEmployee } from "../../employees_department/TBLShamelEmployee";
import { TblShamelVarTax } from "./TblShamelVarTax";

export interface TBLShamelShatebVartax {
    id?: number,
    serial?: number,
    shateb_number?: number,
    healthnosalary_name?: number,
    duration?: number,
    documenttype_id?: number,
    documentnum?: string,
    documentdate?: string,
    salary?: number,
    amount?: number,
    month_id?: number,
    year_id?: number,
    vartax_id?:number;
    eisalnum?:string;
    eisaldate?:Date;

    TBLShamelEmployee?: TBLShamelEmployee;
    TBLShamelDocumentType?:ITBLShamelDocumentType;
    TblShamelVarTax?:TblShamelVarTax;

}
