import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelFreeHolidayReason } from '../../models/employees_department/ITBLShamelFreeHolidayReason';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelFreeHolidayReasonService {

  List_TBLShamelFreeHolidayReason : ITBLShamelFreeHolidayReason [] = [];
  public List_TBLShamelFreeHolidayReason_BehaviorSubject:BehaviorSubject<ITBLShamelFreeHolidayReason[]> = new BehaviorSubject<ITBLShamelFreeHolidayReason[]>([]);


  

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() :Observable<ITBLShamelFreeHolidayReason[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelFreeHolidayReason[]>(this.RestUrl +"TBLShamelFreeHolidayReason",options);      
  }
  

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    this.httpClient.get<ITBLShamelFreeHolidayReason[]>(this.RestUrl +"TBLShamelFreeHolidayReason",options).subscribe(
      data=>
      {
        this.List_TBLShamelFreeHolidayReason  = data;
        this.List_TBLShamelFreeHolidayReason_BehaviorSubject.next(data);
      }
    )  
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelFreeHolidayReason/delete/"+id,options);  
  }

  add(obj : ITBLShamelFreeHolidayReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelFreeHolidayReason/",obj,options);  
  }

  update(obj : ITBLShamelFreeHolidayReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelFreeHolidayReason/"+obj.freeholidayreason_id,obj,options);  
  }

}
