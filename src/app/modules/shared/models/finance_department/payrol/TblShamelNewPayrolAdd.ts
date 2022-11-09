import { TBLShamelEmployee } from "../../employees_department/TBLShamelEmployee";
import { TblShamelNewPayrolAddDetail } from "./TblShamelNewPayrolAddDetail";

export class TblShamelNewPayrolAdd
{

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


  FirstChild?:number;
  SecondChild ?:number;
  ThirdChild ?:number;
  FourChild ?:number;
  RestChild ?:number;



 public fill_child_info_from_family () 
 {
    if(this.family== null )
        this.family ='';

    this.family = this.family.padEnd(5,'0');

    let result : number;


    this.FirstChild = this.family[this.family.length-1] == '1' ? 1 :0 ;

    this.SecondChild = this.family[this.family.length-2] == '1' ? 1 :0 ;
    this.ThirdChild = this.family[this.family.length-3] == '1' ? 1 :0 ;
    this.FourChild = this.family[this.family.length-4] == '1' ? 1 :0 ;
    this.RestChild = this.family[this.family.length-5] == '1' ? 1 :0 ;



 }

 public calc_family_ta3weed () 
 {
    let result =0;

if (this.FirstChild>0)
 result= result+1500;

 if (this.SecondChild>0)
 result= result+1000;

 if (this.ThirdChild>0)
 result= result+750;

 if (this.FourChild>0)
 result= result+25;

 if (this.RestChild>0)
 result= result+25;

 if(this.wife != null && this.wife =='')
 {
    result= result+3500;
 }

 return result;

 }

}