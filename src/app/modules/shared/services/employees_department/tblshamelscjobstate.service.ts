import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelSCJobState } from '../../models/employees_department/ITBLShamelSCJobState';

@Injectable({
  providedIn: 'root'
})
export class TblshamelscjobstateService {

  List_ITBLShamelSCJobState :  ITBLShamelSCJobState [] = [] ;
  List_ITBLShamelSCJobState_BehaviorSubject :  BehaviorSubject< ITBLShamelSCJobState []> = new   BehaviorSubject< ITBLShamelSCJobState []>([])  ;
  
  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list(id:number)  {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelSCJobState/"+id,options);      
  }

  fill (id:number)  {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelSCJobState[]>(this.RestUrl +"TBLShamelSCJobState/"+id,options).subscribe
     (
      data=>
      {
        this.List_ITBLShamelSCJobState = data;
        this.List_ITBLShamelSCJobState_BehaviorSubject.next(this.List_ITBLShamelSCJobState);
      }
     )    
  }


  delete(serial:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.delete("https://localhost:44335/api/TBLShamelSCJobState/"+serial);
  }



  add(obj : ITBLShamelSCJobState )  {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});  
    const options = { headers: headers };    
    return this.httpClient.post("https://localhost:44335/api/TBLShamelSCJobState",obj,options); 

  }



  update(obj : ITBLShamelSCJobState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;  
    const options = {  headers: headers };
    console.log(this.RestUrl +"TBLShamelSCJobState/"+obj.serial);
    return this.httpClient.put(this.RestUrl +"TBLShamelSCJobState/"+obj.serial,obj,options);
  }


  Validate(obj : ITBLShamelSCJobState )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;  
    const options = {  headers: headers };
  
   return this.httpClient.put(this.RestUrl +"TBLShamelSCJobState/Validate",obj,options);
  }


 
}
