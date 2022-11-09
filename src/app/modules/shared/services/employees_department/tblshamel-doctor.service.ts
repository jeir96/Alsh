import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelDoctor } from '../../models/employees_department/ITBLShamelDoctor';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelDoctorService {

  public List_TBLShamelDoctor:ITBLShamelDoctor[]=[];


  public List_TBLShamelDoctor_BehaviorSubject:BehaviorSubject<ITBLShamelDoctor[]> = new BehaviorSubject<ITBLShamelDoctor[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TBLShamelDoctor",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelDoctor[]>(this.RestUrl +"TBLShamelDoctor",options).subscribe(
      data =>  
      {
        this.List_TBLShamelDoctor = data;
        this.List_TBLShamelDoctor_BehaviorSubject.next(this.List_TBLShamelDoctor);
      }
    );  
    
  }


  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelDoctor/delete/"+id,options);  
  }

  add(obj : ITBLShamelDoctor )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelDoctor/",obj,options);  
  }

  update(obj : ITBLShamelDoctor )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelDoctor/"+obj.doctor_id,obj,options);  
  }

}
