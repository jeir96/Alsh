import { TblShamelNewPayrolTax } from "./TblShamelNewPayrolTax";

export interface TblShamelNewPayrolAddDetail
{
     tblshamelnpayroladddet_serail ?:number;

     tblshamelnewpayroladd_fk  ?:number;
     tblshamelnewpayroltax_fk  ?:number;
    name?:string;
   
    
     ta3weed_amount  ?:number;
     ta3weed_percent  ?:number;
    ta3weed_active  ?:number;
    
     taxtemp_amount ?:number;
     taxtemp_percent  ?:number;
     taxtemp_order  ?:number;
     taxtemp_active  ?:number;

    
    
     taxrecurr_fee  ?:number;
     taxrecurr_balance  ?:number;
    taxrecurr_total  ?:number;
    taxrecurr_order?:number;
    taxrecurr_active?:number;
    
     TblShamelNewPayrolTax?: TblShamelNewPayrolTax;
}


