import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBLShamelStreetOrVillage } from '../../models/employees_department/TBLShamelStreetOrVillage';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelStreetOrVillageService {


  public List_TBLShamelStreetOrVillage : TBLShamelStreetOrVillage[];
  public List_TBLShamelStreetOrVillage_BehaviorSubject : BehaviorSubject< TBLShamelStreetOrVillage[]> = new BehaviorSubject< TBLShamelStreetOrVillage[]>([]);



  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  :Observable<TBLShamelStreetOrVillage[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log("TBLShamelStreetOrVillage");
    return this.httpClient.get<TBLShamelStreetOrVillage[]>(this.RestUrl +"TBLShamelStreetOrVillage/list",options);    
  }

  
  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log("TBLShamelStreetOrVillage");
    return this.httpClient.get<TBLShamelStreetOrVillage[]>(this.RestUrl +"TBLShamelStreetOrVillage/list",options).subscribe
    (data=>
      {
      this.List_TBLShamelStreetOrVillage = data;
      this.List_TBLShamelStreetOrVillage_BehaviorSubject.next(data);
    })    
  }

  

  delete(StreetOrVillage_ID:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelStreetOrVillage/delete/"+StreetOrVillage_ID,options);  
  }

  add(obj : TBLShamelStreetOrVillage )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelStreetOrVillage/",obj,options);  
  }

  update(obj : TBLShamelStreetOrVillage )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelStreetOrVillage/"+obj.StreetOrVillage_ID,obj,options);  
  }

}
