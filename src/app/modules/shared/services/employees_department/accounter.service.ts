import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelAccounter } from '../../models/employees_department/TBLShamelAccounter';


@Injectable({
  providedIn: 'root'
})
export class AccounterService {

  public List_TblShamelAccounterService:ITBLShamelAccounter[] = [];

  public List_TblShamelAccounterServicet_BehaviorSubject:BehaviorSubject<ITBLShamelAccounter[]> = new BehaviorSubject<ITBLShamelAccounter[]>([]);

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelAccounter",options) as Observable<ITBLShamelAccounter[]>;  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     return this.httpClient.get<ITBLShamelAccounter[]>(this.RestUrl +"TBLShamelAccounter", options).subscribe
     (
      data=>
      {
        this.List_TblShamelAccounterService = data;
        this.List_TblShamelAccounterServicet_BehaviorSubject.next(this.List_TblShamelAccounterService);

      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelAccounter"+id,options);  
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
    return this.httpClient.put(this.RestUrl +`TBLShamelAccounter/${obj.accounter_id}`,obj,options);  
  }

  
}
