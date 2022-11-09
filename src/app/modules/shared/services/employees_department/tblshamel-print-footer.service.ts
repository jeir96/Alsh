import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelPrintFooter } from '../../models/employees_department/ITBLShamelPrintFooter';

@Injectable({
  providedIn: 'root'
})
export class TblshamelPrintFooterService {

  public List_TblShamelPrintFooterService:ITBLShamelPrintFooter[] = [];

  public List_TblShamelPrintFooterServicet_BehaviorSubject:BehaviorSubject<ITBLShamelPrintFooter[]> = new BehaviorSubject<ITBLShamelPrintFooter[]>([]);

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

  constructor(private httpClient : HttpClient) { }

  list(id: number)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TblShamelNewPrintFooter/list_by_user_id/"+id,options);  
    
  }



  fill(id: number)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelPrintFooter[]>(this.RestUrl +"TblShamelNewPrintFooter/list_by_user_id/"+id,options).subscribe
     (
      data=>
      {
        this.List_TblShamelPrintFooterService = data;
        this.List_TblShamelPrintFooterServicet_BehaviorSubject.next(this.List_TblShamelPrintFooterService);
      }
     )
    
  }

  delete(serial:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TblShamelNewPrintFooter/"+serial,options);  
  }

  add(obj : ITBLShamelPrintFooter )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TblShamelNewPrintFooter/",obj,options);  
  }

  update(obj : ITBLShamelPrintFooter )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +`TblShamelNewPrintFooter/${obj.user_id}`,obj,options);  
  }
}
