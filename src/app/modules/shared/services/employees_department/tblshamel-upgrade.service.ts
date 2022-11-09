import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITBLShamelJobName } from '../../models/employees_department/ITBLShamelJobName';
import { CountEmployeeAndQararRequest } from '../../models/employees_department/tblshamelupgrade_help/CountEmployeeAndQararRequest';
import { CountEmployeeAndQararResponse } from '../../models/employees_department/tblshamelupgrade_help/CountEmployeeAndQararResponse';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelUpgradeService {

  private RestUrl = 'https://localhost:44335/api/';

  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
  };
 
  constructor(private httpClient : HttpClient) { }

  PrepareAll(obj:any)  {
    console.log(obj);
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    const options = {  headers: headers };  
    return this.httpClient.post(this.RestUrl +"TBLShamelUpgrade/AddUpgradeToAllEmployee",obj,options);      
  }


  list(obj:any)  {
    console.log(obj);
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    const options = {  headers: headers };  
    return this.httpClient.post(this.RestUrl +"TBLShamelUpgrade/List",obj,options);      
  }


  CountEmployeeAndQarar(Reuest:CountEmployeeAndQararRequest)  {

    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    const options = {  headers: headers };  
    return this.httpClient.post<CountEmployeeAndQararResponse>(this.RestUrl +"TBLShamelUpgrade/CountEmployeeAndQarar", Reuest,options);      
  }
  
    Get_Upgrade_Max_Qarar_Num (year_id?:number)  {

    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin','*');
    const options = {  headers: headers };  
    return this.httpClient.get(this.RestUrl +`TBLShamelUpgrade/Get_Upgrade_Max_Qarar_Num/${year_id}`,options);      
  }
}
