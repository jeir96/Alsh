import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TBLShamelBonusReason } from '../../models/employees_department/TBLShamelBonusReason';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelBonusReasonService {

  public List_TBLShamelBonusReason:TBLShamelBonusReason[] = [];

  public List_TBLShamelBonusReason_BehaviorSubject:BehaviorSubject<TBLShamelBonusReason[]> = new BehaviorSubject<TBLShamelBonusReason[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelBonusReason",options);  
    
  }
  
  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<TBLShamelBonusReason[]>(this.RestUrl +"TBLShamelBonusReason",options).subscribe
     (
      data=>
      {
        this.List_TBLShamelBonusReason = data;
        this.List_TBLShamelBonusReason_BehaviorSubject.next(this.List_TBLShamelBonusReason);
      }
     )
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelBonusReason/delete/"+id,options);  
  }

  add(obj : TBLShamelBonusReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelBonusReason/",obj,options);  
  }

  update(obj : TBLShamelBonusReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelBonusReason/"+obj.bonusreason_id,obj,options);  
  }

}
