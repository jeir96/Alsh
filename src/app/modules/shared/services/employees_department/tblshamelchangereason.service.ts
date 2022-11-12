import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelChangeReason } from '../../models/employees_department/ITBLShamelChangeReason';

@Injectable({
  providedIn: 'root'
})
export class TblshamelchangereasonService {

List_ITBLShamelChangeReason :ITBLShamelChangeReason[]=[];
List_ITBLShamelChangeReason_BehaviorSubject : BehaviorSubject<ITBLShamelChangeReason[]>=new BehaviorSubject<ITBLShamelChangeReason[]>([]);

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  :Observable<ITBLShamelChangeReason[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log("TBLShamelChangeReason");
    return this.httpClient.get<ITBLShamelChangeReason[]>(this.RestUrl +"TBLShamelChangeReason/list",options);    
  }

  fill ()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log("TBLShamelChangeReason");
    this.httpClient.get<ITBLShamelChangeReason[]>(this.RestUrl +"TBLShamelChangeReason/list",options).subscribe
    (
      data=>
      {
        this.List_ITBLShamelChangeReason = data;
        this.List_ITBLShamelChangeReason_BehaviorSubject.next(data);
      }
    )
  }


  delete(changereason_id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelChangeReason/delete/"+changereason_id,options);  
  }

  add(obj : ITBLShamelChangeReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelChangeReason/",obj,options);  
  }

  update(obj : ITBLShamelChangeReason )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelChangeReason/"+obj.changereason_id,obj,options);  
  }

}
