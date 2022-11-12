import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelJobKind } from '../../models/employees_department/ITBLShamelJobKind';

@Injectable({
  providedIn: 'root'
})
export class TblshameljobkindService {
  
  public list_ITBLShamelJobKind : ITBLShamelJobKind [];
 
  public List_ITBLShamelJobKind_BehaviorSubject:BehaviorSubject<ITBLShamelJobKind[]> = new BehaviorSubject<ITBLShamelJobKind[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  :Observable<ITBLShamelJobKind[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelJobKind[]>(this.RestUrl +"TBLShamelJobKind/list/",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelJobKind[]>(this.RestUrl +"TBLShamelJobKind/list/",options).subscribe
     (
      data=>
      {
        this.List_ITBLShamelJobKind_BehaviorSubject.next(data);
        this.list_ITBLShamelJobKind = data;
      }
     ) 
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelJobKind/delete/"+id,options);  
  }

  add(obj : ITBLShamelJobKind )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelJobKind/",obj,options);  
  }

  update(obj : ITBLShamelJobKind )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelJobKind/"+obj.jobkind_id,obj,options);  
  }

}
