import { HttpHeaders, HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { ITBLShamelAccounter } from '../../models/employees_department/TBLShamelAccounter';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelAccounterService {

  public List_TBLShamelAccounter:ITBLShamelAccounter[] = [];

  public List_TBLShamelAccounter_BehaviorSubject:BehaviorSubject<ITBLShamelAccounter[]> = new BehaviorSubject<ITBLShamelAccounter[]>([]);



  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() :Observable<ITBLShamelAccounter[]>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelAccounter[]>(this.RestUrl +"TBLShamelAccounter",options);  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelAccounter[]>(this.RestUrl +"TBLShamelAccounter",options).subscribe
     (
      data=>
      {
        this.List_TBLShamelAccounter = data;
        this.List_TBLShamelAccounter_BehaviorSubject.next(this.List_TBLShamelAccounter);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelAccounter/delete/"+id,options);  
  }

  add(obj : ITBLShamelAccounter )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelAccounter/",obj,options);  
  }

  update(obj : ITBLShamelAccounter )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelAccounter/"+obj.accounter_id,obj,options);  
  }

}
