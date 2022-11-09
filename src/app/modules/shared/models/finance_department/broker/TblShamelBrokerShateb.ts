import { Time } from "@angular/common";
import { TblShamelBrokerEmployee } from "./TblShamelBrokerEmployee";

export interface TblShamelBrokerShateb
{
    serial?:number;
broker_id?:number;
area_id?:number;
year_id?:number;
month_id?:number;
school_id?:number;
payrol_id?:string;
daycount?:number;
enterusername?:string;
enterdate?:Date;
entertime?:Time;
modifyusername?:string;
modifydate?:Date;
modifytime?:Time;
TBLShamelBrokerEmployee?:TblShamelBrokerEmployee;
}