import { ITBLShamelJobName } from "../ITBLShamelJobName";

export interface GenerateEmployeeQararRequest
{
    list_tblshameljobName?:ITBLShamelJobName[];
    year_id?:number;
    class_id?:number;
    blocked?:number;
    qarar_num?:number;
    qarar_date?:string;
}