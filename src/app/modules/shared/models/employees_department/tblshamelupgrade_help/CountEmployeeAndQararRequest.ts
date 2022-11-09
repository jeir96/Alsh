import { ITBLShamelJobName } from "../ITBLShamelJobName";

export interface CountEmployeeAndQararRequest
{
    list_tblshameljobName?:ITBLShamelJobName[];
    year_id?:number;
    class_id?:number;
    blocked?:number;
}