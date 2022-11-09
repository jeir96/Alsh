import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TblshamelBrokerStatistics } from '../../../models/finance_department/broker/tblshamel-broker-statistics';
import { TblShamelBrokerEmployee } from '../../../models/finance_department/broker/TblShamelBrokerEmployee';
import { TblShamelBrokerPrintTotals } from '../../../models/finance_department/broker/TblShamelBrokerPrintTotals';
import { TblShamelBrokerShateb } from '../../../models/finance_department/broker/TblShamelBrokerShateb';

@Injectable({
  providedIn: 'root'
})
export class TblShamelBrokerShatebService {
  private RestUrl = 'https://localhost:44335/api/TblShamelBrokerShateb';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
 constructor(private httpClient : HttpClient) { }
  
    list()  {
     
      return this.httpClient.get<TblShamelBrokerShateb[]>(this.RestUrl ,this.httpOptions);  
      
    }

    Search(searchRequest : any,PageIndex:number)  {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = {  headers: headers };  
      return this.httpClient.post<TblShamelBrokerShateb[]>(this.RestUrl +`/Search/${PageIndex}`,searchRequest,this.httpOptions);  
      
    }

    CanDelete(serail:number)  {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const options = {  headers: headers };  
      return this.httpClient.get<boolean>(this.RestUrl+`/CanDelete/${serail}` ,this.httpOptions);  
      
    }

    
  
    delete(id:number )  {
      return this.httpClient.delete<number>(this.RestUrl+`/${id}` ,this.httpOptions);  
    }
  
    add(obj : TblShamelBrokerShateb )  {
      return this.httpClient.post<number>(this.RestUrl ,obj,this.httpOptions);  
    }
  
    update(obj : TblShamelBrokerShateb )  {
      return this.httpClient.put<number>(this.RestUrl ,obj);  
    }

    isUniqueRecord(shateb : TblShamelBrokerShateb)  {
      return this.httpClient.post<TblShamelBrokerShateb[]>(this.RestUrl +`/isUniqueRecord`,shateb);        
    }
  
    statistics(obj : TblshamelBrokerStatistics )  {
      return this.httpClient.post<TblShamelBrokerPrintTotals[]>(this.RestUrl+`/Statistics` ,obj,this.httpOptions);  
    }
  }
  