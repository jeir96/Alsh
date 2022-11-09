import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TbLShamelHealthNoSalary } from '../../../models/finance_department/shatebtax/TbLShamelHealthNoSalary';

@Injectable({
  providedIn: 'root'
})
export class TbLShamelHealthNoSalaryService {

  public List_TbLShamelHealthNoSalary:TbLShamelHealthNoSalary[] = [];

  public List_TbLShamelHealthNoSalary_BehaviorSubject:BehaviorSubject <TbLShamelHealthNoSalary[]> = new BehaviorSubject<TbLShamelHealthNoSalary[]>([]);

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<TbLShamelHealthNoSalary[]>(this.RestUrl +"TbLShamelHealthNoSalary",options);  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     return this.httpClient.get<TbLShamelHealthNoSalary[]>(this.RestUrl +"TbLShamelHealthNoSalary/Search", options).subscribe
     (
      data=>
      {
        this.List_TbLShamelHealthNoSalary = data;
        this.List_TbLShamelHealthNoSalary_BehaviorSubject.next(this.List_TbLShamelHealthNoSalary);
      }
     )
    
  }


  

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TbLShamelHealthNoSalary/"+id,options) ;  
  }

  add(obj : TbLShamelHealthNoSalary )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TbLShamelHealthNoSalary/",obj,options);  
  }

  update(obj : TbLShamelHealthNoSalary )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +`TbLShamelHealthNoSalary/${obj.healthnosalary_id!}`,obj,options) ;  
  }



}
