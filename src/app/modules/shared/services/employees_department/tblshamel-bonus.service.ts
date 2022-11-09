import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TBLShamelBonus } from '../../models/employees_department/TBLShamelBonus';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelBonusService {
  

  public List_TBLShamelBonus:TBLShamelBonus[] = [];

  public List_TBLShamelBonus_BehaviorSubject:BehaviorSubject<TBLShamelBonus[]> = new BehaviorSubject<TBLShamelBonus[]>([]);



  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelBonus",options);  
    
  }


  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<TBLShamelBonus[]>(this.RestUrl +"TBLShamelBonus",options) .subscribe    (
      data=>
      {
        this.List_TBLShamelBonus = data;
        this.List_TBLShamelBonus_BehaviorSubject.next(this.List_TBLShamelBonus);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelBonus/delete/"+id,options);  
  }

  add(obj : TBLShamelBonus )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelBonus/",obj,options);  
  }

  update(obj : TBLShamelBonus )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelBonus/"+obj.bonus_id,obj,options);  
  }

}
