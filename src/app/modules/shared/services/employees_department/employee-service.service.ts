import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParamsOptions, HttpParams } from
  '@angular/common/http';
import { TBLShamelEmployee } from '../../models/employees_department/TBLShamelEmployee';



@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };

  constructor(private httpClient: HttpClient) { }

  search_by_id_mini(id: number): Observable<TBLShamelEmployee> {
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + `TBLShamelEmployee/search_by_id_mini/${id}`) as Observable<TBLShamelEmployee>;
  }


  add(obj: TBLShamelEmployee) {
    return this.httpClient.post(this.RestUrl + `TBLShamelEmployee/`, obj, this.httpOptions);
  }

  update(obj: TBLShamelEmployee) {
    return this.httpClient.put(this.RestUrl + `TBLShamelEmployee/`, obj, this.httpOptions);
  }


  search_by_id(id: string) {
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + "TBLShamelEmployee/search_by_id/" + id);
  }


  delete_employee(id: string) {
       return this.httpClient.delete(this.RestUrl + "TBLShamelEmployee/" + id);
  }

  // Error handling 
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  Check_ID(value: string, id: number | undefined): Observable<TBLShamelEmployee[]> {
    if (id == null || id == undefined)
      id = -1;
    if (value == null || value == undefined)
      return null;
    return this.httpClient.get<TBLShamelEmployee[]>(this.RestUrl + `TBLShamelEmployee/check_id/${value}/${id}`);
  }

  Check_PAYROL_ID(value: string, id: number | undefined): Observable<TBLShamelEmployee> {
    if (id == null || id == undefined)
      id = -1;
    if (value == null || value == undefined)
      return null;
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + `TBLShamelEmployee/check_payrol_id/${value}/${id}`);
  }

  Check_COMPUTER_ID(value: string, id: number | undefined): Observable<TBLShamelEmployee> {
    if (id == null || id == undefined)
      id = -1;
    if (value == null || value == undefined)
      return null;
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + `TBLShamelEmployee/check_computer_id/${value}/${id}`);

  }

  Check_INSURANCE_ID(value: string, id: number | undefined): Observable<TBLShamelEmployee> {
    if (id == null || id == undefined)
      id = -1;
    if (value == null || value == undefined)
      return null;
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + `TBLShamelEmployee/check_insurance_id/${value}/${id}`);
  }

  Check_GLOBAL_ID(value: string, id: number | undefined): Observable<TBLShamelEmployee> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    if (id == null || id == undefined)
      id = -1;
    if (value == null || value == undefined)
      return null;
    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + `TBLShamelEmployee/check_global_id/${value}/${id}`);
  }

  change_employee_id(old_id: string, new_id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    let x = {
      old_id: old_id,
      new_id: new_id
    }
    console.log(this.RestUrl + "TBLShamelEmployee/change_employee_id/" + old_id + "/" + new_id);
    return this.httpClient.post(this.RestUrl + "TBLShamelEmployee/employee_change_ID", x, options);

  }

  
Check_FullName(employee: TBLShamelEmployee,id:number|undefined): Observable<TBLShamelEmployee>
{

  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  const options = {  headers: headers };
  if (id == null || id == undefined)
    id =-1;
  if (employee == null || employee == undefined)
    return null;

    console.log("employee2", employee);

    return this.httpClient.post<TBLShamelEmployee>(
      this.RestUrl +`TBLShamelEmployee/check_fullname/${id}`,
      employee,
        options
    );

}

  /*
  */

  search_by_Computer_ID(Computer_ID: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const httpParams: HttpParamsOptions = { 'Computer_ID': Computer_ID } as HttpParamsOptions;

    const options = { params: new HttpParams(httpParams), headers: headers };
    const options1 = { headers: headers };

    console.log(Computer_ID);

    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + "TBLShamelEmployee/search_by_Computer_ID/" + Computer_ID, options1);

  }


  prev_id(id: string): Observable<TBLShamelEmployee> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };

    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + "ViewTBLShamelEmployee/prev_id/" + id, options);

  }


  next_id(id: string): Observable<TBLShamelEmployee> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const httpParams: HttpParamsOptions = {
      'id': id
    } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams), headers: headers };
    const options1 = { headers: headers };

    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + "ViewTBLShamelEmployee/next_id/" + id, options);

  }

  prev_accounter(id: number, serial: number): Observable<TBLShamelEmployee> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };

    return this.httpClient.get<TBLShamelEmployee>(this.RestUrl + "TBLShamelEmployee/prev_accounter/" + id + "/" + serial, options);

  }

  next_accounter(id: number, serial: number): Observable<TBLShamelEmployee> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };

    return this.httpClient.get(this.RestUrl + "TBLShamelEmployee/next_accounter/" + id + "/" + serial, options);

  }


  search_by_accounter(id: number, serial: number): Observable<TBLShamelEmployee> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');


    const options = { headers: headers };

    return this.httpClient.get(this.RestUrl + "TBLShamelEmployee/search_by_accounter/" + id + "/" + serial, options);

  }


}
