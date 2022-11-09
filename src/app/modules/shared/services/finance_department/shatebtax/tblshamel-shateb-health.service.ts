import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBLShamelEmployee } from '../../../models/employees_department/TBLShamelEmployee';

import { TBLShamelShatebHealth } from '../../../models/finance_department/shatebtax/TBLShamelShatebHealth';
import { TBLShamelShatebHealthRequest } from '../../../models/finance_department/shatebtax/TBLShamelShatebHealthRequest';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelShatebHealthService {

  
  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

 public List_TblShamelHealthService:TBLShamelShatebHealth[] = [];

  public List_TblShamelHealthServicet_BehaviorSubject:BehaviorSubject<TBLShamelShatebHealth[]> = new BehaviorSubject<TBLShamelShatebHealth[]>([]);

  constructor(private httpClient : HttpClient) { }

  list(obj: TBLShamelShatebHealthRequest)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.post(this.RestUrl +"TBLShamelShatebHealth/Search",obj,options);  
    
  }

  fill(obj: TBLShamelShatebHealthRequest)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     return this.httpClient.post<TBLShamelShatebHealth[]>(this.RestUrl +"TBLShamelShatebHealth/Search", obj, options).subscribe
     (
      data=>
      {
        this.List_TblShamelHealthService = data;
        for(let i= 0; i< data.length; i++){
          var id= data[i].id;
          this.httpClient.get<TBLShamelEmployee>(this.RestUrl+"TBLShamelEmployee/search_by_id/"+id, options).subscribe(
            data =>{
              this.List_TblShamelHealthService[i].TBLShamelEmployee= {};
              this.List_TblShamelHealthService[i].TBLShamelEmployee .FullName= data.FullName;
            })

        }
        this.List_TblShamelHealthServicet_BehaviorSubject.next(this.List_TblShamelHealthService);
      }
     )
    
  }

  isUniqueRecord(id:number,documentnum:string,startdate:Date, documentdate:Date,serial?:number) :Observable<TBLShamelShatebHealth> 
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    let Request =
    {
      id:id,
      documentnum:documentnum,
      startdate:startdate,
      documentdate:documentdate,
      serial:serial
    }
    return this.httpClient.post<TBLShamelShatebHealth>(this.RestUrl +"TBLShamelShatebHealth/isUniqueRecord",Request,options);  
    
  }
   


  

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelShatebHealth/"+id,options) ;  
  }

  add(obj : TBLShamelShatebHealth )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelShatebHealth/",obj,options);  
  }

  update(obj : TBLShamelShatebHealth )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +`TBLShamelShatebHealth/${obj.serial!}`,obj,options) ;  
  }

  search(obj : TBLShamelShatebHealthRequest )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelShatebHealth/Search",obj,options);  
  }

  fillEmployees(id: number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl+"TBLShamelEmployee/search_by_id/"+id, options);
  }

  Get_By_ID_Month_Year(id: number, yearId: string, monthId: number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  

    return this.httpClient.get(this.RestUrl+"TBLShamelShatebHealth/Get_By_ID_Month_Year?ID="+id+"&Year_ID="+yearId+"&Month_ID="+monthId, options);
  }
}
