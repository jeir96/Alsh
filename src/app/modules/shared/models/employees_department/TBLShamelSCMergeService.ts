import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";
import { TBLShamelMergeServiceReason } from "./TBLShamelMergeServiceReason";

export interface TBLShamelSCMergeService
{
serial?:number;
id?:number;
years?:number;
months?:number;
days?:number;
mergeservicereason_id?:number;
documenttype_id?:number;
document_number?:string;
documentdate?:Date;
enterusername?:string;
enterdate?:Date;
entertime?:string;
modifyusername?:string;
modifydate?:Date;
modifytime?:string;

TBLShamelMergeServiceReason ?: TBLShamelMergeServiceReason;
TBLShamelDocumentType?:ITBLShamelDocumentType;


}