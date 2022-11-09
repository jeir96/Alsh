import { TblShamelNewPayrolTax } from "./TblShamelNewPayrolTax";

export interface TBLShamelNewShatebDetail
{
    tblshamelnshatebdet_serail ?:number;  
          tblshamelnewshateb_fk?:number;  
        
          tblshamelnewpayroladddetail_fk?:number;  
          tblshamelnewpayroltax_fk ?:number; 




          ta3weed_amount ?:number; 
          ta3weed_percent?:number;  

          ta3weed_order ?:number; 
          taxtemp_amount?:number;  
          taxtemp_percent ?:number;  

          taxtemp_order ?:number;  


          taxrecurr_fee ?:number;  
          taxrecurr_balance ?:number;  
          taxrecurr_total ?:number;  
          taxrecurr_order ?:number;  

         TblShamelNewPayrolTax?: TblShamelNewPayrolTax  

}