import { ITBLShamelCertificate } from "./ITBLShamelCertificate";
import { ITBLShamelCountry } from "./ITBLShamelCountry";
import { ITBLShamelDocumentType } from "./ITBLShamelDocumentType";
import { ITBLShamelRank } from "./ITBLShamelRank";
import { ITBLShamelSpecification } from "./ITBLShamelSpecification";

export interface ITBLShamelSCEducation {
    serial ?: number  ;
    id ?: number  ;
    graduationyear?:number  ;
    studyduration ?:string  ;
    certificate_id?:number  ;
    specification_id?:number  ;
    country_id?:number  ;
    city_id?:number;
    rank_id?:number;
    certificate_name?:string  ;
    specification_name?:string  ;
    country_name?:string  ;
    state_name?:  string  ;
    rank_name?:  string  ;
    enterusername?:  string  ;
    edate?: string  ;
    etime?:  string  ;
    mdate?:  string  ;
    mtime ?:  string ;
    modifyusername?:  string  ;

     TBLShamelDocumentType ?:ITBLShamelDocumentType;
     TBLShamelSpecification ?:ITBLShamelSpecification;
     TBLShamelCertificate ?:ITBLShamelCertificate;
     TBLShamelRank ?:ITBLShamelRank;
     TBLShamelCountry ?:ITBLShamelCountry;

}
