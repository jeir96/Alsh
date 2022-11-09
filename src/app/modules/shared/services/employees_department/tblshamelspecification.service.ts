import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITBLShamelSpecification } from '../../models/employees_department/ITBLShamelSpecification';
import { ITBLShamelState } from '../../models/employees_department/ITBLShamelState';

@Injectable({
  providedIn: 'root'
})
export class TblshamelspecificationService {
  public list_TBLShamelSpecification : ITBLShamelSpecification []; 
  public List_TBLShamelSpecification_BehaviorSubject:BehaviorSubject<ITBLShamelSpecification[]> = new BehaviorSubject<ITBLShamelSpecification[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list(): Observable<ITBLShamelSpecification[]>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelSpecification[]>(this.RestUrl +"TBLShamelSpecification",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelSpecification[]>(this.RestUrl +"TBLShamelSpecification",options).subscribe(
      data=>
      {
        this.List_TBLShamelSpecification_BehaviorSubject.next(data);
        this.list_TBLShamelSpecification = data;
      }
     )  
    
  }


  delete(specification_id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelSpecification/delete/"+specification_id,options);  
  }

  add(obj : ITBLShamelSpecification )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelSpecification/",obj,options);  
  }

  update(obj : ITBLShamelSpecification )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelSpecification/"+obj.specification_id,obj,options);  
  }

}
