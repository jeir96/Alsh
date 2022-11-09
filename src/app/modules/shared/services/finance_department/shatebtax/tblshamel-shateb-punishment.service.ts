import { HttpHeaders, HttpClient, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { TBLShamelEmployee } from "../../../models/employees_department/TBLShamelEmployee";

import { TBLShamelShatebPunishment } from "../../../models/finance_department/shatebtax/TBLShamelShatebPunishment";
import { TBLShamelShatebPunishmentRequest } from "../../../models/finance_department/shatebtax/TBLShamelShatebPunishmentRequest";

@Injectable({
  providedIn: 'root'
})
export class TBLShamelShatebPunishmentService {

  public List_TblShamelPunishmentService:TBLShamelShatebPunishment[] = [];

  public List_TblShamelPunishmentServicet_BehaviorSubject:BehaviorSubject<TBLShamelShatebPunishment[]> = new BehaviorSubject<TBLShamelShatebPunishment[]>([]);

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

  constructor(private httpClient : HttpClient) { }

  isUniqueRecord(id:number,documentnum:string,startdate:Date, documentdate:Date,serial?:number) :Observable<TBLShamelShatebPunishment[]> 
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let Request =
    {
      id:id,
      documentnum:documentnum,
      startdate:startdate,
      documentdate:documentdate,
      serial:serial
    }
    return this.httpClient.post<TBLShamelShatebPunishment[]>(this.RestUrl +"TBLShamelShatebPunishment/isUniqueRecord",Request);  
    
  }

  fill(obj: TBLShamelShatebPunishmentRequest)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     return this.httpClient.post<TBLShamelShatebPunishment[]>(this.RestUrl +"TBLShamelShatebPunishment/Search", obj, options).subscribe
     (
      data=>
      {
        this.List_TblShamelPunishmentService = data;
        for(let i= 0; i< data.length; i++){
          var id= data[i].id;
          this.httpClient.get<TBLShamelEmployee>(this.RestUrl+"TBLShamelEmployee/search_by_id/"+id, options).subscribe(
            data =>{
              this.List_TblShamelPunishmentService[i].TBLShamelEmployee= {};
              this.List_TblShamelPunishmentService[i].TBLShamelEmployee.FullName= data.FullName;
            })

        }
        this.List_TblShamelPunishmentServicet_BehaviorSubject.next(this.List_TblShamelPunishmentService);
      }
     )
    
  }

  list(obj: TBLShamelShatebPunishmentRequest)  {
    return this.httpClient.post(this.RestUrl +"TBLShamelShatebPunishment/Search",obj);      
  }

  delete(id:number )  {
    return this.httpClient.delete(this.RestUrl +"TBLShamelShatebPunishment/"+id) ;  
  }

  add(obj : TBLShamelShatebPunishment )  {
    return this.httpClient.post(this.RestUrl +"TBLShamelShatebPunishment/",obj);  
  }

  update(obj : TBLShamelShatebPunishment )  {
    return this.httpClient.put(this.RestUrl +`TBLShamelShatebPunishment/${obj.serial!}`,obj) ;  
  }

  search(obj : TBLShamelShatebPunishmentRequest )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.post<TBLShamelShatebPunishment[]>(this.RestUrl +"TBLShamelShatebPunishment/Search",obj).subscribe
    (
     (data)=>
     {
       this.List_TblShamelPunishmentService = data;
       for(let i= 0; i< data.length; i++){
         var id= data[i].id;
         this.httpClient.get<TBLShamelEmployee>(this.RestUrl+"TBLShamelEmployee/search_by_id/"+id, options).subscribe(
           data =>{
             this.List_TblShamelPunishmentService[i].TBLShamelEmployee= {};
             this.List_TblShamelPunishmentService[i].TBLShamelEmployee.FullName= data.FullName;
           })

       }
       this.List_TblShamelPunishmentServicet_BehaviorSubject.next(this.List_TblShamelPunishmentService);
     }
    );  
  }

  Get_By_ID_Month_Year(id: number, yearId: string, monthId: number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log('res1');

    return this.httpClient.get(this.RestUrl+"TBLShamelShatebHealth/Get_By_ID_Month_Year?ID="+id+"&Year_ID="+yearId+"&Month_ID="+monthId, options);
  }

}
