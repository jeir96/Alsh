import { HttpHeaders, HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TBLShamelMonth } from '../../models/employees_department/TBLShamelMonth';


@Injectable({
  providedIn: 'root'
})
export class TBLShamelMonthService {
  public List_TBLShamelMonth : TBLShamelMonth[]= [];
  public List_TBLShamelMonth_BehaviorSubject:BehaviorSubject<TBLShamelMonth[]> = new BehaviorSubject<TBLShamelMonth[]>([]);




  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get< TBLShamelMonth[]>(this.RestUrl +"TBLShamelMonth",options);  
    
  }

  
  GetMonthFixed()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get< TBLShamelMonth>(this.RestUrl +"TBLShamelMonth/GetMonthFixed",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get< TBLShamelMonth[]>(this.RestUrl +"TBLShamelMonth",options).subscribe
    (data=>
      {
        this.List_TBLShamelMonth = data;
        this.List_TBLShamelMonth_BehaviorSubject.next(this.List_TBLShamelMonth);
      })
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelMonth/delete/"+id,options);  
  }

  add(obj : TBLShamelMonth )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelMonth/",obj,options);  
  }

  update(obj : TBLShamelMonth )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelMonth/"+obj.month_id,obj,options);  
  }

}
