import { StaticInitializationElement } from "overlayscrollbars"
import { ITBLShamelDocumentType } from "../../employees_department/ITBLShamelDocumentType";
import { TBLShamelEmployee } from "../../employees_department/TBLShamelEmployee";
import { TBLShamelMonth } from "../../employees_department/TBLShamelMonth";

export interface TBLShamelShatebHealth {
    id?: number;
    serial?: number;
    healthnosalary_name?: string;
    duration?: number;
    startdate?: Date;
    documenttype_id?: number;
    documentnum?: string;
    documentdate?: Date;
    salary?: number;
    amount?: number;
    month_id?: number;
    year_id?: number;
    eisalnum?:string;
    eisaldate?:Date;
    docphoto_id?:number;
    enterusername?:string;
    enterdate?:Date;
    entertime?:string;
    modifyusername?:string;
    modifydate?:Date;
    modifytime?:string;


    TBLShamelDocumentType?: ITBLShamelDocumentType ;

//     TBLShamelShatebHealthPic?: TBLShamelShatebHealthPic ;
     TBLShamelMonth?: TBLShamelMonth ;
     TBLShamelEmployee?: TBLShamelEmployee ;


}
