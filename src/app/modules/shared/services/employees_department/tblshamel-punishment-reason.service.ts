import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelPunishmentReason } from '../../models/employees_department/ITBLShamelPunishmentReason';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelPunishmentReasonService {

  List_ITBLShamelPunishmentReason : ITBLShamelPunishmentReason[]=[];
  List_ITBLShamelPunishmentReason_BehaviorSubject : BehaviorSubject< ITBLShamelPunishmentReason[]>=new BehaviorSubject< ITBLShamelPunishmentReason[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() :Observable<ITBLShamelPunishmentReason[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelPunishmentReason[]>(this.RestUrl +"TBLShamelPunishmentReason",options);      
  }


  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelPunishmentReason[]>(this.RestUrl +"TBLShamelPunishmentReason",options).subscribe
     (
      data=>
      {
        this.List_ITBLShamelPunishmentReason = data;
        this.List_ITBLShamelPunishmentReason_BehaviorSubject.next(this.List_ITBLShamelPunishmentReason);
      }
     )
    
  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelPunishmentReason/delete/"+id,options);  
  }

  add(obj : ITBLShamelPunishmentReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelPunishmentReason/",obj,options);  
  }

  update(obj : ITBLShamelPunishmentReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelPunishmentReason/"+obj.punishmentreason_id,obj,options);  
  }

}
