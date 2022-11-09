import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelMalakState } from '../../models/employees_department/ITBLShamelMalakState';
import { ITBLShamelRank } from '../../models/employees_department/ITBLShamelRank';

@Injectable({
  providedIn: 'root'
})
export class TblshamelmalakstateService {

  public list_ITBLShamelMalakState : ITBLShamelMalakState [];
 
  public List_ITBLShamelMalakState_BehaviorSubject:BehaviorSubject<ITBLShamelMalakState[]> = new BehaviorSubject<ITBLShamelMalakState[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelMalakState/list",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelMalakState[]>(this.RestUrl +"TBLShamelMalakState/list",options).subscribe(
      data=>
      {
        this.list_ITBLShamelMalakState = data;
        this.List_ITBLShamelMalakState_BehaviorSubject.next(data);
      }
     ) 
    
  }


  delete(malakstate_id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelMalakState/delete/"+malakstate_id,options);  
  }

  add(obj : ITBLShamelMalakState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelMalakState/",obj,options);  
  }

  update(obj : ITBLShamelMalakState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');   
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelMalakState/"+obj.malakstate_id,obj,options);  
  }

}
