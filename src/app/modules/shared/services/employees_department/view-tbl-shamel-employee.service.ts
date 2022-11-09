import { HttpHeaders, HttpClient, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { IEmployeeNameList } from "../../models/employees_department/IEmployeeNameList";
import { ITBLShamelYear } from "../../models/employees_department/ITBLShamelYear";
import { TBLShamelEmployee } from "../../models/employees_department/TBLShamelEmployee";
import { ViewTBLShamelEmployee } from "../../models/employees_department/ViewTBLSamelEmployee";

import { ViewTBLSamelEmployeeSearch } from "../../models/employees_department/ViewTBLSamelEmployeeSearch";
import { TblShamelSearchByEmployeeNameInfo } from "../../models/finance_department/payrol/tblShamelSearchByEmployeeNameInfo";
import { TblShamelSearchByEmployeeNameInfoRequest } from "../../models/finance_department/payrol/tblShamelSearchByEmployeeNameInfoRequest";

@Injectable({
    providedIn: 'root'
  })
  export class ViewTBLShamelEmployeeService {
  
   

  
    private RestUrl = 'https://localhost:44335/api/';
    private httpOptions = { 
      headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
   };
   
    constructor(private httpClient : HttpClient) { }
  

List_ViewTBLSamelEmployee(PageNumber:number,request?:ViewTBLSamelEmployeeSearch  )  {
    console.log(this.RestUrl +`ViewTBLShamelEmployee/List_ViewTBLSamelEmployee/${PageNumber}`);
    return this.httpClient.post<ViewTBLShamelEmployee[]>(this.RestUrl +`ViewTBLShamelEmployee/list_ViewTBLShamelEmployee/${PageNumber}`,request,this.httpOptions);  
  }
  
  getEmpFullName2(searchName:string ):Observable<ViewTBLShamelEmployee[]>   {

    console.log(searchName);

    if (searchName == undefined ||  searchName.length ==0 )
    return  of([]);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    const options = {  headers: headers };
  
  
    return this.httpClient.get<ViewTBLSamelEmployeeSearch[]>(this.RestUrl +`ViewTBLShamelEmployee/GetEmployeeFullName/${searchName}`,options);  
    
  }

  getMini(id:number )  {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    const options = {  headers: headers };
  
  
    return this.httpClient.get(this.RestUrl +`TBLShamelEmployee/search_by_id_mini/${id}`,options) as Observable<ViewTBLShamelEmployee>;  
    
  }
  

  getEmpFullName(searchName:string )  {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    const options = {  headers: headers };
  
  
    return this.httpClient.get(this.RestUrl +`ViewTBLShamelEmployee/GetEmployeeFullName/${searchName}`,options);  
    
  }


  SearchByID(id:string ) :Observable<ViewTBLShamelEmployee[]> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    const options = {  headers: headers };
    
    return this.httpClient.get<ViewTBLShamelEmployee[]>(this.RestUrl +`ViewTBLShamelEmployee/SearchByID/${id}`,options);  
    
  }


  
employee_FullName_List(searchName:string )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  const httpParams: HttpParamsOptions = { 'searchName': searchName } as HttpParamsOptions;
  
  const options = { params: new HttpParams(httpParams), headers: headers };

  return this.httpClient.get(this.RestUrl +`ViewTBLShamelEmployee/employee_FullName_List/${searchName}`,options);  
  
}

employee_FullName_List1(searchName:string,pageNumber:number, pageSize:number
   )  {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');  
  const options = { headers: headers };
  return this.httpClient.get(this.RestUrl +`ViewTBLShamelEmployee/employee_FullName_List/${searchName}/${pageNumber}/${pageSize}`,options);  
  
}




search_by_employee_name_info(request: TblShamelSearchByEmployeeNameInfoRequest )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

//   let Search = {
//      'fname': fname,
//      'lname':lname,
//      'mother':mother,
//      'father':father
//  } as HttpParamsOptions;
  
  return this.httpClient.post(this.RestUrl +"ViewTBLShamelEmployee/search_by_employee_name_info",request ,this.httpOptions) as Observable<TblShamelSearchByEmployeeNameInfo[]>;  
  
}


prev_Computer_ID(Computer_ID:string )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  const httpParams: HttpParamsOptions = {
     'Computer_ID': Computer_ID
 } as HttpParamsOptions;  
  const options = { params: new HttpParams(httpParams), headers: headers };
  const options1 = {  headers: headers };

  return this.httpClient.get(this.RestUrl +"ViewTBLShamelEmployee/prev_Computer_ID/"+Computer_ID,options);  
  
}

next_Computer_ID(Computer_ID:string )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  const httpParams: HttpParamsOptions = {
     'Computer_ID': Computer_ID
 } as HttpParamsOptions;  
  const options = { params: new HttpParams(httpParams), headers: headers };
  const options1 = {  headers: headers };

  return this.httpClient.get(this.RestUrl +"ViewTBLShamelEmployee/next_Computer_ID/"+Computer_ID,options);  
  
}

prev_id(id:string )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

 
  const options = { headers: headers };

  return this.httpClient.get(this.RestUrl +"ViewTBLShamelEmployee/prev_id/"+id,options) as Observable<{Result:ViewTBLShamelEmployee}>;  
  
}


next_id(id:string )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

  const httpParams: HttpParamsOptions = {
     'id': id
 } as HttpParamsOptions;  
  const options = { params: new HttpParams(httpParams), headers: headers };
  const options1 = {  headers: headers };

  return this.httpClient.get(this.RestUrl +"ViewTBLShamelEmployee/next_id/"+id,options) as Observable<{Result:ViewTBLShamelEmployee}>;  
  
}

prev_accounter(id:number, serial: number )  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

 
  const options = { headers: headers };

  return this.httpClient.get(this.RestUrl +"TBLShamelEmployee/prev_accounter/"+id+"/"+serial,options) as Observable<{Result:ViewTBLShamelEmployee}>;  
  
}

next_accounter(id:number, serial: number ) :Observable<TBLShamelEmployee>  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

 
  const options = { headers: headers };

  return this.httpClient.get<TBLShamelEmployee>(this.RestUrl +"TBLShamelEmployee/next_accounter/"+id+"/"+serial,options) ;  
  
}
 

search_by_accounter(id:number, serial: number ) :Observable<TBLShamelEmployee>  {

  const headers = new HttpHeaders().set('Content-Type', 'application/json');

 
  const options = { headers: headers };

  return this.httpClient.get<TBLShamelEmployee>(this.RestUrl +"TBLShamelEmployee/search_by_accounter/"+id+"/"+serial,options) ;  
  
}


  }
  