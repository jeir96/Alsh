import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TblShamelUpgradeGovReportSearch } from '../../models/employees_department/tbl-shamel-upgrade-gov-report-search';
import { TblShamelUpgradeGovReport } from '../../models/employees_department/TblShamelUpgradeGovReport';
import { GenerateEmployeeQararRequest } from '../../models/employees_department/tblshamelupgrade_help/GenerateEmployeeQararRequest';

@Injectable({
  providedIn: 'root'
})
export class TblShamelUpgradeGovReportService {

  public List_TblShamelUpgradeGovReport:TblShamelUpgradeGovReport[] = [];

  public List_TblShamelUpgradeGovReport_BehaviorSubject:BehaviorSubject<TblShamelUpgradeGovReport[]> = new BehaviorSubject<TblShamelUpgradeGovReport[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +"TblShamelUpgradeGovReport",options);  
    
  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<TblShamelUpgradeGovReport[]>(this.RestUrl +"TblShamelUpgradeGovReport",options).subscribe
     (
      data=>
      {
        this.List_TblShamelUpgradeGovReport = data;
        this.List_TblShamelUpgradeGovReport_BehaviorSubject.next(this.List_TblShamelUpgradeGovReport);
      }
     )
    
  }

  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TblShamelUpgradeGovReport/delete/"+id,options);  
  }

  add(obj : TblShamelUpgradeGovReport )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TblShamelUpgradeGovReport/",obj,options);  
  }

  update(obj : TblShamelUpgradeGovReport )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +`TblShamelUpgradeGovReport/${obj.year_id}`,obj,options);  
  }

DeleteGenerateUpgradeRreport(year_id?:number)
{
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = {  headers: headers };
  return this.httpClient.put(this.RestUrl +`TblShamelUpgradeGovReport/DeleteGenerateUpgradeRreport/${year_id}`,options);  
}
 
GenerateUpgradeRreport(Request?: GenerateEmployeeQararRequest)
{
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = {  headers: headers };
  return this.httpClient.post(this.RestUrl +`TblShamelUpgradeGovReport/GenerateEmployeeQararRequest/`,Request,options);  
}

Search(Request?: TblShamelUpgradeGovReportSearch)
{
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = {  headers: headers };
  return this.httpClient.post(this.RestUrl +`TblShamelUpgradeGovReport/Search/`,Request,options);  
}

}
