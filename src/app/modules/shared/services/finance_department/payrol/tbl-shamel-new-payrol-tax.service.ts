import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TblShamelNewPayrolTax } from '../../../models/finance_department/payrol/TblShamelNewPayrolTax';

@Injectable({
  providedIn: 'root'
})
export class TblShamelNewPayrolTaxService {

  public List_TblShamelNewPayrolTax:TblShamelNewPayrolTax[] = [];

  public List_TblShamelNewPayrolTax_BehaviorSubject:BehaviorSubject<TblShamelNewPayrolTax[]> = new BehaviorSubject<TblShamelNewPayrolTax[]>([]);

  public List_ta3weed:TblShamelNewPayrolTax[] = []; 
  public List_taxtemp :TblShamelNewPayrolTax[] = [];
  public List_recurr  :TblShamelNewPayrolTax[] = [];


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

  constructor(private httpClient : HttpClient) { }

  list() :Observable<TblShamelNewPayrolTax[]> {
   
    return this.httpClient.get<TblShamelNewPayrolTax[]>(this.RestUrl +"TblShamelNewPayrolTax");  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<TblShamelNewPayrolTax[]>(this.RestUrl +"TblShamelNewPayrolTax/list",options).subscribe
     (
      data=>
      {
        this.List_TblShamelNewPayrolTax = data;
        this.List_TblShamelNewPayrolTax_BehaviorSubject.next(this.List_TblShamelNewPayrolTax);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TblShamelNewPayrolTax/delete/"+id);  
  }

  add(obj : TblShamelNewPayrolTax )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TblShamelNewPayrolTax/",obj,options);  
  }

  AddRange(objs : TblShamelNewPayrolTax[] )  {
    return this.httpClient.post(this.RestUrl +"TblShamelNewPayrolTax/AddRange",objs);  
  }

  update(obj : TblShamelNewPayrolTax )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +`TblShamelNewPayrolTax/${obj.serial}`,obj,options);  
  }
}
