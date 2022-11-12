import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITBLShamelCertificate } from '../../models/employees_department/ITBLShamelCertificate';
import { TBLShamelBonusReason } from '../../models/employees_department/TBLShamelBonusReason';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelCertificateService {

  public List_ITBLShamelCertificate:ITBLShamelCertificate[] = [];
  public List_ITBLShamelCertificate_BehaviorSubject:BehaviorSubject<ITBLShamelCertificate[]> = new BehaviorSubject<ITBLShamelCertificate[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() :Observable<ITBLShamelCertificate[]>  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelCertificate[]>(this.RestUrl +"TBLShamelCertificate",options);  
    
  }


  
  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    this.httpClient.get<ITBLShamelCertificate[]>(this.RestUrl +"TBLShamelCertificate",options).subscribe
    (
      data=>
      {
        this.List_ITBLShamelCertificate = data;
        this.List_ITBLShamelCertificate_BehaviorSubject.next(data);
      }
    )
    
  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelCertificate/delete/"+id,options);  
  }

  add(obj : ITBLShamelCertificate )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelCertificate/",obj,options);  
  }

  update(obj : ITBLShamelCertificate )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelCertificate/"+obj.certificate_id,obj,options);  
  }

}
