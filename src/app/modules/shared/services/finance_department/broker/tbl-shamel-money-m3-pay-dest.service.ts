import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TblShamelBrokerShateb } from '../../../models/finance_department/broker/TblShamelBrokerShateb';
import { TblShamelMoneyM3PayDest } from '../../../models/finance_department/broker/TblShamelMoneyM3PayDest';

@Injectable({
  providedIn: 'root'
})
export class TblShamelMoneyM3PayDestService {
  private RestUrl = 'https://localhost:44335/api/TblShamelMoneyM3PayDest';
 
 
 constructor(private httpClient : HttpClient) { }
  

 List_TblShamelMoneyM3PayDest  :TblShamelMoneyM3PayDest[] = [];
 List_TblShamelMoneyM3PayDest_BehaviorSubject:BehaviorSubject< TblShamelMoneyM3PayDest[]> = new  BehaviorSubject< TblShamelMoneyM3PayDest[]>([]) ;
 

    list() : Observable<TblShamelMoneyM3PayDest[]>  {     
      return this.httpClient.get<TblShamelMoneyM3PayDest[]>(this.RestUrl);        
    }

    delete(id:number )  {
      return this.httpClient.delete<number>(this.RestUrl+`/${id}` );  
    }
  
    add(obj : TblShamelBrokerShateb )  {
      return this.httpClient.post<number>(this.RestUrl ,obj);  
    }
  
    update(obj : TblShamelBrokerShateb )  {
      return this.httpClient.put<number>(this.RestUrl ,obj);  
    }

  

  }
  