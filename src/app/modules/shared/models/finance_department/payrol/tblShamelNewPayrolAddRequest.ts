import { TBLShamelEmployee } from "../../employees_department/TBLShamelEmployee";
import { TblShamelNewPayrolAddDetail } from "./TblShamelNewPayrolAddDetail";

export interface TblShamelNewPayrolAddRequest {
    id ?:number;

  wife ?:string;

  family ?:string;

 family_ta3weed ?:number;

  insurance_kind ?:number;

  locked ?:number;

 salary_old ?:number;

 salary_insurance ?:number;

 TblShamelNewPayrolAddDetails?: TblShamelNewPayrolAddDetail[]; 

 TBLShamelEmployee?: TBLShamelEmployee; 
}
