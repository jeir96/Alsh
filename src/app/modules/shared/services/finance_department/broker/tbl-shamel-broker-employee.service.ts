import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TblShamelBrokerEmployee } from '../../../models/finance_department/broker/TblShamelBrokerEmployee';

@Injectable({
  providedIn: 'root'
})
export class TblShamelBrokerEmployeeService {
  private RestUrl = 'https://localhost:44335/api/TBLShamelBrokerEmployee';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  };

  constructor(private httpClient: HttpClient) { }

  isUniqueRecord(emp: TblShamelBrokerEmployee) {
    return this.httpClient.post<TblShamelBrokerEmployee[]>(this.RestUrl + `/isUniqueRecord`, emp);
  }

  EmployeeFullName(searchName:string)  {     
    return this.httpClient.get<TblShamelBrokerEmployee[]>(  `${this.RestUrl}\EmployeeFullName\${searchName}`);        
  }

  list() {

    return this.httpClient.get<TblShamelBrokerEmployee[]>(this.RestUrl, this.httpOptions);

  }

  Search(searchRequest: any, PageIndex: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this.httpClient.post<TblShamelBrokerEmployee[]>(this.RestUrl + `/Search/${PageIndex}`, searchRequest, this.httpOptions);

  }

  CanDelete(serail: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this.httpClient.get<boolean>(this.RestUrl + `/CanDelete/${serail}`, this.httpOptions);

  }




  delete(id: number) {
    return this.httpClient.delete<number>(this.RestUrl + `/${id}`, this.httpOptions);
  }

  add(obj: TblShamelBrokerEmployee) {
    return this.httpClient.post<number>(this.RestUrl, obj, this.httpOptions);
  }

  update(obj: TblShamelBrokerEmployee) {
    return this.httpClient.put<number>(this.RestUrl, obj);
  }

  SearchById(serail:number)  {
    return this.httpClient.get<TblShamelBrokerEmployee[]>(this.RestUrl +`/SearchById/${serail}`);        
  }


  Validate_Name(Fname: string, LName: string, Serail: number) {

    let request =
    {
      fname: Fname,
      lname: LName,
      serial: Serail
    };
    return this.httpClient.post<TblShamelBrokerEmployee[]>(this.RestUrl + `/Validate_Name`, request, this.httpOptions);

  }

}
