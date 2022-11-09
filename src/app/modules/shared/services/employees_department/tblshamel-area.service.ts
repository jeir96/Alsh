import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBLShamelArea } from '../../models/employees_department/TBLShamelArea';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelAreaService {


  public List_TBLShamelArea : TBLShamelArea[] =[];
  public List_TBLShamelArea_BehaviorSubject:BehaviorSubject<TBLShamelArea[]> = new BehaviorSubject<TBLShamelArea[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() : Observable<TBLShamelArea[]>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<TBLShamelArea[]>(this.RestUrl +"TBLShamelArea",options) as Observable<TBLShamelArea[]>;  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<TBLShamelArea[]>(this.RestUrl +"TBLShamelArea",options).subscribe
    (data=> 
      {
        this.List_TBLShamelArea = data;
        this.List_TBLShamelArea_BehaviorSubject.next(this.List_TBLShamelArea);
      }
        )      
  }

  delete(Area_ID:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelArea/delete/"+Area_ID,options);  
  }

  add(obj : TBLShamelArea )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelArea/",obj,options);  
  }

  update(obj : TBLShamelArea )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelArea/"+obj.area_id,obj,options);  
  }

}
