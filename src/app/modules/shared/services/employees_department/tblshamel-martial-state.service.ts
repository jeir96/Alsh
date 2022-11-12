import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBLShamelMartialState } from '../../models/employees_department/TBLShamelMartialState';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelMartialStateService {
  public List_TBLShamelMartialState :TBLShamelMartialState[];
  public List_TBLShamelMartialState_BehaviorSubject:BehaviorSubject<TBLShamelMartialState[]> = new BehaviorSubject<TBLShamelMartialState[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() :Observable<TBLShamelMartialState[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<TBLShamelMartialState[]>(this.RestUrl +"TBLShamelMartialState",options);      
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    this.httpClient.get<TBLShamelMartialState[]>(this.RestUrl +"TBLShamelMartialState",options).subscribe(
      (data:TBLShamelMartialState[])=>{
        this.List_TBLShamelMartialState = data ;
        this.List_TBLShamelMartialState_BehaviorSubject.next(this.List_TBLShamelMartialState);
      }
    );      
  }



  delete(MartialState_ID:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelMartialState/delete/"+MartialState_ID,options);  
  }

  add(obj : TBLShamelMartialState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelMartialState/",obj,options);  
  }

  update(obj : TBLShamelMartialState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelMartialState/"+obj.MartialState_ID,obj,options);  
  }

}
