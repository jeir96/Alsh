import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelPunishment } from '../../models/employees_department/ITBLShamelPunishment';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelPunishmentService {


  List_ITBLShamelPunishment :  ITBLShamelPunishment [] = [];
  List_ITBLShamelPunishment_BehaviorSubject : BehaviorSubject< ITBLShamelPunishment []> = new  BehaviorSubject< ITBLShamelPunishment []> ([]) ;




  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() :Observable<ITBLShamelPunishment[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelPunishment[]>(this.RestUrl +"TBLShamelPunishment",options);  
    
  }

  fill ()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelPunishment[]>(this.RestUrl +"TBLShamelPunishment",options).subscribe
     (
      data=>
      {
        this.List_ITBLShamelPunishment = data;
        this.List_ITBLShamelPunishment_BehaviorSubject.next(data);
      }
     )     
  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelPunishment/delete/"+id,options);  
  }

  add(obj : ITBLShamelPunishment )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelPunishment/",obj,options);  
  }

  update(obj : ITBLShamelPunishment )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelPunishment/"+obj.punishment_id,obj,options);  
  }

}
