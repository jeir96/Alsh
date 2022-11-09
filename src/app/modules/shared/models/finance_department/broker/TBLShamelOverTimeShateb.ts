import { TBLShamelArea } from "../../employees_department/TBLShamelArea";
import { TBLShamelMonth } from "../../employees_department/TBLShamelMonth";
import { TBLShamelYear } from "../../employees_department/TBLShamelYear";
import { TblShamelMoneyM3PayDest } from "./TblShamelMoneyM3PayDest";
import { TBLShamelOvertimeEmployee } from "./TBLShamelOvertimeEmployee";

export interface TBLShamelOverTimeShateb 
{
    serial?: number;
    broker_id?: number;
    area_id?: number;
    year_id?: number;
    month_id?: number;
    school_id?: number;
    payrol_id?: string;
    daycount?: number;
    enterusername?: string;
    enterdate?: Date;
    entertime?: string;
    modifyusername?: string;
    modifydate?: Date;
    modifytime?: string;
    TBLShamelOvertimeEmployee?:TBLShamelOvertimeEmployee;
    TBLShamelArea?:TBLShamelArea;
    TBLShamelMonth?:TBLShamelMonth;
    TBLShamelMoneyM3PayDest?:TblShamelMoneyM3PayDest;
    TBLShamelYear?:TBLShamelYear;
  
}
