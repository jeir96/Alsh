import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBLShamelYear } from '../../models/employees_department/TBLShamelYear';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelYearService {
  public List_TBLShamelYear : TBLShamelYear[] =[];
  public List_TBLShamelYear_BehaviorSubject:BehaviorSubject<TBLShamelYear[]> = new BehaviorSubject<TBLShamelYear[]>([]);




  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get< TBLShamelYear[]>(this.RestUrl +"TBLShamelYear",options);  
    
  }

  
  GetYearFixed() :Observable<TBLShamelYear> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get< TBLShamelYear>(this.RestUrl +"TBLShamelYear/GetYearFixed",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get< TBLShamelYear[]>(this.RestUrl +"TBLShamelYear",options).subscribe
    (data=>
      {
        this.List_TBLShamelYear = data;
        this.List_TBLShamelYear_BehaviorSubject.next(this.List_TBLShamelYear);
      })
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelYear/delete/"+id,options);  
  }

  add(obj : TBLShamelYear )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelYear/",obj,options);  
  }

  update(obj : TBLShamelYear )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelYear/"+obj.year_id,obj,options);  
  }

}
