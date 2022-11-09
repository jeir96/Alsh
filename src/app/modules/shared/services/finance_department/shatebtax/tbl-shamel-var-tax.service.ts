import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBLShamelShatebVartaxRequest } from '../../../models/finance_department/shatebtax/TBLShamelShatebVartaxRequest';
import { TblShamelVarTax } from '../../../models/finance_department/shatebtax/TblShamelVarTax';


@Injectable({
  providedIn: 'root'
})
export class TblShamelVarTaxService {

  private RestUrl = 'https://localhost:44335/api/';

  List_TblShamelVarTax : TblShamelVarTax[];
  List_TblShamelVarTax_BehaviorSubject : BehaviorSubject<TblShamelVarTax[]> = new   BehaviorSubject<TblShamelVarTax[]>([]);

  constructor(private httpClient : HttpClient) { }

  

  list() :Observable<TblShamelVarTax[]> {
    return this.httpClient.get<TblShamelVarTax[]>(this.RestUrl +"TblShamelVarTax");      
  }

  
  fill()  {
     this.httpClient.get<TblShamelVarTax[]>(this.RestUrl +"TblShamelVarTax").subscribe
     (
      data=>
      {
        this.List_TblShamelVarTax = data;
        this.List_TblShamelVarTax_BehaviorSubject.next(data);
      }
     ) 
  }

  delete(id:number )  {
    return this.httpClient.delete(this.RestUrl +"TblShamelVarTax/"+id) ;  
  }

  add(obj : TblShamelVarTax )  {
    return this.httpClient.post(this.RestUrl +"TblShamelVarTax/",obj);  
  }

  update(obj : TblShamelVarTax )  {
    return this.httpClient.put(this.RestUrl +`TblShamelVarTax/${obj!.vartax_id}`,obj) ;  
  }

  search(obj : TBLShamelShatebVartaxRequest )  {
    return this.httpClient.post(this.RestUrl +"TblShamelVarTax/Search",obj);  
  }


}
