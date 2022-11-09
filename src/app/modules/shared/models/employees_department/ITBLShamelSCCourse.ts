import { ITBLShamelCountry } from "./ITBLShamelCountry";
import { ITBLShamelCourse } from "./ITBLShamelCourse";
import { ITBLShamelSpecification } from "./ITBLShamelSpecification";
import { ITBLShamelState } from "./ITBLShamelState";

export interface ITBLShamelSCCourse {

    serial?: number   ;
    id ?:number   ;
    course_id?: number   ;
    specification_id?:number   ;
    country_id ?:number   ;
    City_ID  ?:number   ;
    startdate?: Date   ;
    enddate?:Date   ;
    studyduration?:string   ;
    enterusername?:string   ;
    enterdate?:string   ;
    entertime?:string   ;
    modifyusername?:string   ;
    modifydate?:string   ;
    modifytime?:string   ;
    edate?:string   ;
    etime?:string   ;
    mdate?:string   ;
    mtime?:string   ;
    course_name?:string   ;
    specification_name?:string   ;
    country_name?:string   ;
    state_name?:string   ;

     TBLShamelCourse ?:ITBLShamelCourse;
     TBLShamelSpecification?: ITBLShamelSpecification;
     TBLShamelCountry ?:ITBLShamelCountry;
     TBLShamelState?: ITBLShamelState ;
        

}