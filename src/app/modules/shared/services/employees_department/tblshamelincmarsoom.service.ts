import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelIncMarsoom } from '../../models/employees_department/ITBLShamelIncMarsoom';

@Injectable({
  providedIn: 'root'
})
export class TblshamelincmarsoomService {

  List_ITBLShamelIncMarsoom :ITBLShamelIncMarsoom[] =[];
  List_ITBLShamelIncMarsoom_BehaviorSubject :BehaviorSubject< ITBLShamelIncMarsoom[]>   = new BehaviorSubject< ITBLShamelIncMarsoom[]>([]);

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log(this.RestUrl +"TBLShamelIncMarsoom");
    return this.httpClient.get<ITBLShamelIncMarsoom[]>(this.RestUrl +"TBLShamelIncMarsoom",options);      
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    console.log(this.RestUrl +"TBLShamelIncMarsoom");
    this.httpClient.get<ITBLShamelIncMarsoom[]>(this.RestUrl +"TBLShamelIncMarsoom",options).subscribe
    (
      data=>
      {
        console.log(data);
        this.List_ITBLShamelIncMarsoom = data;
        this.List_ITBLShamelIncMarsoom_BehaviorSubject.next(data)  ;
        console.log(this.List_ITBLShamelIncMarsoom );
      
      
      }

    )
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelIncMarsoom/delete/"+id,options);  
  }

  add(obj : ITBLShamelIncMarsoom )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelIncMarsoom/",obj,options);  
  }

  update(obj : ITBLShamelIncMarsoom )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');    
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelIncMarsoom/"+obj.incmarsoom_id,obj,options);  
  }

}