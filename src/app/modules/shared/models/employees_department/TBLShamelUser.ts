import { TBLShamelDaera } from "./TBLShamelDaera";
import { TBLShamelPrivilages } from "./TBLShamelPrivilages";

export interface TBLShamelUser {
     user_id?:number ;
     fullname?:string 
     daera_id ?:string;
     username ?: string;
     password  ?: string;
     hdserial  ?: string;
     entermintime  ?: string;
     entermaxtime  ?: string;
     accountcreationdate  ?: string;
     accountcreationtime  ?: string;
     accountmodificationdate  ?: string;        
     accountmodificationtime  ?: string;
     photo  ?:string;
     enabled  ?:number;
     progid  ?:number;
     senabled  ?:string;
     TBLShamelDaera?:TBLShamelDaera;
     TBLShamelPrivilages?:TBLShamelPrivilages[];

}