import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TblShamelReplaceQararNumbers } from '../../models/employees_department/tbl-shamel-replace-qarar-numbers';

@Injectable({
  providedIn: 'root'
})
export class TblshamelScJobStateService {

  private RestUrl = 'https://localhost:44335/api/';

  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
  };


  constructor(private httpClient : HttpClient) { }

  UpgradeQarar(Request?: TblShamelReplaceQararNumbers)
{
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = {  headers: headers };
  return this.httpClient.post(this.RestUrl +`TBLShamelSCJobState/Update_TblShamelSCJobState_Upgrad_Qara`,Request,options);  
}

ListQarar(Request?: TblShamelReplaceQararNumbers)
{
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = {  headers: headers };
  return this.httpClient.post(this.RestUrl +`TBLShamelSCJobState/List_TblShamelSCJobState_Upgrad_Qara`,Request,options);  
}
}
