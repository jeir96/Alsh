import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelClass } from '../../models/employees_department/ITBLShamelClass';

@Injectable({
  providedIn: 'root'
})
export class TblshamelclassService {

  public List_ITBLShamelClass_BehaviorSubject:BehaviorSubject<ITBLShamelClass[]> = new BehaviorSubject<ITBLShamelClass[]>([]);

  public List_ITBLShamelClass :ITBLShamelClass[]=[];


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelClass/list/",options);  
    
  }
  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelClass[]>(this.RestUrl +"TBLShamelClass/list/",options).subscribe
     (
      data=>
      {
        this. List_ITBLShamelClass = data;
        this.List_ITBLShamelClass_BehaviorSubject.next(data);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelClass/delete/"+id,options);  
  }

  add(obj : ITBLShamelClass )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelClass/",obj,options);  
  }

  update(obj : ITBLShamelClass )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelClass/"+obj.class_id,obj,options);  
  }

}
