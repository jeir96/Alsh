import { SafeUrl } from "@angular/platform-browser";
import { ITBLShamelAccounter } from "./TBLShamelAccounter";
import { ITBLShamelMalakState } from "./ITBLShamelMalakState";
import { ITBLShamelSCBonus } from "./ITBLShamelSCBonus";
import { ITBLShamelSCCancelPunishment } from "./ITBLShamelSCCancelPunishment";
import { ITBLShamelSCCourse } from "./ITBLShamelSCCourse";
import { ITBLShamelSCEducation } from "./ITBLShamelSCEducation";
import { ITBLShamelSCFreeHoliday } from "./ITBLShamelSCFreeHoliday";
import { ITBLShamelSCHealthHoliday } from "./ITBLShamelSCHealthHoliday";
import { ITBLShamelSCJobState } from "./ITBLShamelSCJobState";
import { ITBLShamelSCPunishment } from "./ITBLShamelSCPunishment";
import { ITBLShamelSex } from "./ITBLShamelSex";
import { TBLShamelArea } from "./TBLShamelArea";
import { TBLShamelEmployeeDocPic } from "./TBLShamelEmployeeDocPic";
import { TBLShamelMiniArea } from "./TBLShamelMiniArea";
import { TBLShamelNationality } from "./TBLShamelNationality";
import { TBLShamelSCLegalHoliday } from "./TBLShamelSCLegalHoliday";
import { TBLShamelSCMergeService } from "./TBLShamelSCMergeService";
import { TBLShamelSCSuddenHoliday } from "./TBLShamelSCSuddenHoliday";
import { TBLShamelStreetOrVillage } from "./TBLShamelStreetOrVillage";

export interface TBLShamelEmployee {
      id? :number ;
      Payrol_ID?:  string ;    
      Computer_ID?:number ;
      Global_ID?:  string ;
      Insurance_ID?  :number ;
      FName? :string  ;
      LName? :string ;
      Father? :string ;
      Mother? :string ;
      Birth_Place?: string;
      BirthDate? :string ;
      Kayd_Place?:string ;
      PhoneNum?:string ;
      ID_Number?:string;
      Sex_Name?:string ;
      MartialState_ID?:number;
      Sex_ID?:number;
      Nationality_ID?:number;
      City_ID?:number;
      Emp_IN_Military_Service?:number;        
      Area_ID?:number;
      MiniArea_ID?:number ;
      StreetOrVillage_ID?:number;
      ManualAddress?:string ;
      MartialState_Name?:string ;   
      EducationLast_ID?:number ;
      JobStateFirst_ID?:number ;
      JobStateLast_ID?:number ;
      MalakState_Name?:string;
      InsuranceSalary?:number;
      Accounter_ID?:number ;
      AccounterSerial?:number;
      Rem1?:string;
      Rem2?:string;
      Rem3?:string;
      Qarar_Num?:string;
      QararDate?:Date;
      Photo?:string;    
      EnterUserName?:string;
      EnterDate?:string;
      EnterTime?:string;
      ModifyUserName?:string;
      ModifyDate?:string;
      ModifyTime?:string;
      FullName?:string;
      Nationality_Name?:string;
      City_Name?:string;
      Area_Name?:string;
      MiniArea_Name? :string;
      StreetOrVillage_Name?  :string;
      Accounter_Name ?:string;
      Certificate_Name?:string;
      Specification_Name?:string;
      JobName_Name  ?:string;
      Class_Name  ?:string;
      Salary   ?:number;
      BeginDate  ?:string;
      ChangeReason_Name ?:string;
   

      


      TBLShamelSCPunishments?:ITBLShamelSCPunishment[];
      TBLShamelSCJobStates?:ITBLShamelSCJobState[];
      TBLShamelSCFreeHolidays?:ITBLShamelSCFreeHoliday[];
      TBLShamelSCLegalHolidays?:TBLShamelSCLegalHoliday[];
      TBLShamelSCSuddenHolidays?:TBLShamelSCSuddenHoliday[];

       TBLShamelSCHealthHolidays?:ITBLShamelSCHealthHoliday[];
       TBLShamelSCEducations ?:ITBLShamelSCEducation[];
      TBLShamelSCCourses ?:ITBLShamelSCCourse[];
       TBLShamelSCCancelPunishments ?:ITBLShamelSCCancelPunishment[];
      TBLShamelSCBonuss ?:ITBLShamelSCBonus[];
      TBLShamelEmployeeDocPics ?:TBLShamelEmployeeDocPic[];


      TBLShamelSCMergeServices ?:TBLShamelSCMergeService[];


       TBLShamelSCJobState_Last ?:ITBLShamelSCJobState;
       TBLShamelSCPunishment_Last ?:ITBLShamelSCPunishment;
      
      BLShamelSCEducation_Last ?:ITBLShamelSCEducation;
      TBLShamelSCCourse_Last ?:ITBLShamelSCCourse;
       TBLShamelSCCancelPunishment_Last ?:ITBLShamelSCCancelPunishment;
       TBLShamelSCBonus_Last ?:ITBLShamelSCBonus;

       TBLShamelSCFreeHoliday_Last ?:ITBLShamelSCFreeHoliday;
       TBLShamelSCLegalHoliday_Last ?:TBLShamelSCLegalHoliday;
       TBLShamelSCSuddenHoliday_Last?:TBLShamelSCSuddenHoliday;
       TBLShamelSCHealthHoliday_Last?:ITBLShamelSCHealthHoliday;
      
       TBLShamelSCEducation_Last?:ITBLShamelSCEducation;

       TBLShamelMiniArea?: TBLShamelMiniArea;
       TBLShamelArea?: TBLShamelArea;
       TBLShamelStreetOrVillage?: TBLShamelStreetOrVillage;
       TBLShamelMalakState?:ITBLShamelMalakState;
      TBLShamelMartialState?: ITBLShamelMalakState;
     
      TBLShamelNationality?: TBLShamelNationality;
      TBLShamelSex?: ITBLShamelSex;
      TBLShamelAccounter?: ITBLShamelAccounter;


}