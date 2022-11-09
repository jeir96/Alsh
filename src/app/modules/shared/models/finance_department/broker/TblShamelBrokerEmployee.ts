import { Time } from "@angular/common";

export interface TblShamelBrokerEmployee
{
    serial ?:number;
fname?:string;
lname?:string;
fullname?: string;
father?:string;
mother?:string;
birthdate?:Date;
sex_name?:string;
servicedayes?:number;
enterusername?:string;
enterdate?:Date;
entertime?:Time;
modifyusername?:string;
modifydate?:Date;
modifytime?:Time;
}