import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelJobName } from '../../models/employees_department/ITBLShamelJobName';

@Injectable({
  providedIn: 'root'
})
export class TblshameljobnameService {
  
  public list_ITBLShamelJobName : ITBLShamelJobName [];
 
  public List_ITBLShamelJobName_BehaviorSubject:BehaviorSubject<ITBLShamelJobName[]> = new BehaviorSubject<ITBLShamelJobName[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() : Observable<ITBLShamelJobName[]>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelJobName[]>(this.RestUrl +"TBLShamelJobName/list",options);      
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelJobName[]>(this.RestUrl +"TBLShamelJobName/list",options).subscribe(
      data=>
      {
        this.List_ITBLShamelJobName_BehaviorSubject.next(data);
        this.list_ITBLShamelJobName = data;

      }
     )
    
  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelJobName/delete/"+id,options);  
  }

  add(obj : ITBLShamelJobName )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelJobName/",obj,options);  
  }

  update(obj : ITBLShamelJobName )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelJobName/"+obj.jobname_id,obj,options);  
  }

}
