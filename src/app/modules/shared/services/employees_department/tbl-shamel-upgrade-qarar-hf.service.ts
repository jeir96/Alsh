import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TblShamelUpgradeQararHF } from '../../models/employees_department/tbl-shamel-upgrade-qarar-hf';

@Injectable({
  providedIn: 'root'
})
export class TblShamelUpgradeQararHFService {

  public List_TblShamelUpgradeQararHF:TblShamelUpgradeQararHF[] = [];

  public List_TblShamelUpgradeQararHF_BehaviorSubject:BehaviorSubject<TblShamelUpgradeQararHF[]> = new BehaviorSubject<TblShamelUpgradeQararHF[]>([]);

  private RestUrl = 'https://localhost:44335/api/';

  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };

  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TblShamelUpgradeQararHF",options);  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<TblShamelUpgradeQararHF[]>(this.RestUrl +"TblShamelUpgradeQararHF",options).subscribe
     (
      data=>
      {
        this.List_TblShamelUpgradeQararHF = data;
        this.List_TblShamelUpgradeQararHF_BehaviorSubject.next(this.List_TblShamelUpgradeQararHF);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TblShamelUpgradeQararHF/delete/"+id,options);  
  }

  add(obj : TblShamelUpgradeQararHF )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TblShamelUpgradeQararHF/",obj,options);  
  }

  update(obj : TblShamelUpgradeQararHF )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +`TblShamelUpgradeQararHF/${obj.serial}`,obj,options);  
  }
}
