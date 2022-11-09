import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelState } from '../../models/employees_department/ITBLShamelState';

@Injectable({
  providedIn: 'root'
})
export class TblshamelstateService {
  
  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 

 public list_TBLShamelState : ITBLShamelState [];
 
  public List_TBLShamelState_BehaviorSubject:BehaviorSubject<ITBLShamelState[]> = new BehaviorSubject<ITBLShamelState[]>([]);


  constructor(private httpClient : HttpClient) { }

  list() : Observable<ITBLShamelState[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelState[]>(this.RestUrl +"TBLShamelState",options);  
    
  }


  

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelState []>(this.RestUrl +"TBLShamelState",options).subscribe
    (data =>{
      this.list_TBLShamelState = data;
      this.List_TBLShamelState_BehaviorSubject.next(data);

    }  );  
    
  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelState/delete/"+id,options);  
  }

  add(obj : ITBLShamelState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelState/",obj,options);  
  }

  update(obj : ITBLShamelState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelState/"+obj.state_id,obj,options);  
  }

}
