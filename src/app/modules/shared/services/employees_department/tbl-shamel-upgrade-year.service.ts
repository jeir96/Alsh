import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TblShamelUpgradeYear } from '../../models/employees_department/TblShamelUpgradeYear';

@Injectable({
  providedIn: 'root'
})
export class TblShamelUpgradeYearService {

  public List_TblShamelUpgradeYear:TblShamelUpgradeYear[] = [];

  public List_TblShamelUpgradeYear_BehaviorSubject:BehaviorSubject<TblShamelUpgradeYear[]> = new BehaviorSubject<TblShamelUpgradeYear[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TblShamelUpgradeYear",options);  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<TblShamelUpgradeYear[]>(this.RestUrl +"TblShamelUpgradeYear",options).subscribe
     (
      data=>
      {
        this.List_TblShamelUpgradeYear = data;
        this.List_TblShamelUpgradeYear_BehaviorSubject.next(this.List_TblShamelUpgradeYear);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TblShamelUpgradeYear/delete/"+id,options);  
  }

  add(obj : TblShamelUpgradeYear )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TblShamelUpgradeYear/",obj,options);  
  }

  update(obj : TblShamelUpgradeYear )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TblShamelUpgradeYear/"+obj.year_id,obj,options);  
  }

  GetFixedYear()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TblShamelUpgradeYear/GetFixedYear",options) as Observable<TblShamelUpgradeYear>;  
    
  }

  

}
