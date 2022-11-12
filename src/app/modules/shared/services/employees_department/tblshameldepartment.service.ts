import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelDepartment } from '../../models/employees_department/ITBLShamelDepartment';

@Injectable({
  providedIn: 'root'
})
export class TblshameldepartmentService {

  public List_ITBLShamelDepartment_BehaviorSubject:BehaviorSubject<ITBLShamelDepartment[]> = new BehaviorSubject<ITBLShamelDepartment[]>([]);

  public List_ITBLShamelDepartment :ITBLShamelDepartment[]=[];


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  : Observable<ITBLShamelDepartment[]>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelDepartment[]>(this.RestUrl +"TBLShamelDepartment/list",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelDepartment[]>(this.RestUrl +"TBLShamelDepartment/list",options).subscribe
     (data=>
      {
        this.List_ITBLShamelDepartment = data;
        this.List_ITBLShamelDepartment_BehaviorSubject.next(data);
      })  
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelDepartment/delete/"+id,options);  
  }

  add(obj : ITBLShamelDepartment )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');      
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelDepartment/",obj,options);  
  }

  update(obj : ITBLShamelDepartment )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelDepartment/"+obj.department_id,obj,options);  
  }

}
