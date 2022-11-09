import { TBLShamelEmployee } from "../../employees_department/TBLShamelEmployee";
import { TblShamelNewPayrolAdd } from "./TblShamelNewPayrolAdd";
import { TBLShamelNewShatebDetail } from "./TBLShamelNewShatebDetail";

export interface TBLShamelNewShateb
{
      serail  ?:number;
      id    ?:number;
     year_id    ?:number;
     month_id    ?:number;
      payrol_id    ?:string;
      wife    ?:string;
      family    ?:string;
      family_ta3weed    ?:number;
      salary    ?:number;
      insurancesalary    ?:number;
      accounter_name    ?:string;
      accounterserial    ?:number;
      shattieb_name    ?:string;
      salary_old    ?:number;

      documentdate    ?:Date;
      payorder_num    ?:string;
      payorderdate    ?:Date;

      insurancetax    ?:number;

      incometax   ?:number; //ضريبة الدخل  ?:number;
      ta3weedattax   ?:number; //ضريبة التعويضات
      specialesttax   ?:number; //ضريبة طبيعة العمل والتعويضات
      netsalary   ?:number; 
      nettaxes    ?:number;
      netta3weedat    ?:number;
      netspecialest    ?:number;
      netcash    ?:number;
      sum1    ?:number;
      sum2    ?:number;
      sum3    ?:number;
      sumclassicta3weedat    ?:number;
      sumclassictaxes    ?:number;
      sumclassictaxrecurr    ?:number;
      netcashwithmin7a    ?:number;
     locked    ?:number;

      Auto1   ?:number;  //ضريبة الدخل
      Auto2   ?:number; //ضريبة طبيعة العمل والتعويضات
      Auto3   ?:number; //ضريبة التأمين والمعاشات





      Sum_Ta3weedats  ?:number;  //مجموع التعويضات 
      Sum_SpecialestTa3weeds   ?:number; 
      Sum_Ta3weeds_Include_in_Tax    ?:number;


      TBLShamelNewShatebDetails?:TBLShamelNewShatebDetail[];
      TblShamelNewPayrolAdd?:TblShamelNewPayrolAdd;
      
      TBLShamelEmployee?:TBLShamelEmployee;



}