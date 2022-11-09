import { ITBLShamelCountry } from '../../models/employees_department/ITBLShamelCountry';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TblshamelcountryService {
  
  public List_ITBLShamelCountry_BehaviorSubject:BehaviorSubject<ITBLShamelCountry[]> = new BehaviorSubject<ITBLShamelCountry[]>([]);

  public List_ITBLShamelCountry :ITBLShamelCountry[]=[];



  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() : Observable<ITBLShamelCountry[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelCountry[]>(this.RestUrl +"TBLShamelCountry/",options);  
    
  }
fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelCountry[]>(this.RestUrl +"TBLShamelCountry/",options).subscribe
     (
      data =>
      {

        this.List_ITBLShamelCountry_BehaviorSubject.next(data);
        this.List_ITBLShamelCountry = data;
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelCountry/delete/"+id,options);  
  }

  add(obj : ITBLShamelCountry )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelCountry/",obj,options);  
  }

  update(obj : ITBLShamelCountry )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelCountry/"+obj.country_id,obj,options);  
  }

}
