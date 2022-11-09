import { ITBLShamelAccounter } from "./TBLShamelAccounter";
import { ITBLShamelClass } from "./ITBLShamelClass";
import { ITBLShamelJobName } from "./ITBLShamelJobName";
import { TBLShamelEmployee } from "./TBLShamelEmployee";

export interface ITBLShamelUpgrade
{
     ID?:number ;
     Year_ID?:number ;
     QualityGrade ?:string ;
     GradePercent?:number ;
     Duration?:string ;
     SalaryBefore?:number ;
     SalaryAfter?:number ;

     Qarar_Num?:number ;
     Qarar_Date ?:Date;

     Blocked ?:number ;
     BlockReason_Name?:string ;
     Locked ?:number ;

     JobName_ID?:number ;
     Class_ID ?:number ;

     Accounter_ID ?:number ;
     AccounterSerial ?:number ;
     EnterUserName ?:string ;
     EnterDate ?:string ;
     EnterTime ?:string ;

     ModifyUserName ?:string;
     ModifyDate  ?:string;

     ModifyTime  ?:string;
     SER ?:number ;

 BonusAmount?:number ;

     TBLShamelEmployee?: TBLShamelEmployee ;
    
     TBLShamelJobName?: ITBLShamelJobName ;
     TBLShamelClass?: ITBLShamelClass ;
     TBLShamelAccounter?: ITBLShamelAccounter ;
}