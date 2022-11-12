import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITBLShamelSCPunishment } from '../../models/employees_department/ITBLShamelSCPunishment';

@Injectable({
  providedIn: 'root'
})
export class TBLShamelSCPunishmentService {
  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list(id:number) :Observable<ITBLShamelSCPunishment[]>  {   
    return this.httpClient.get<ITBLShamelSCPunishment[]>(this.RestUrl +"TBLShamelSCPunishment/"+id);      
  }


  delete(serial:number )  {  
    return this.httpClient.delete("https://localhost:44335/api/TBLShamelSCPunishment/"+serial);
  }


  add(obj : ITBLShamelSCPunishment )  {   
    return this.httpClient.post("https://localhost:44335/api/TBLShamelSCPunishment",obj); 
  }

  update(obj : ITBLShamelSCPunishment )  {   
    return this.httpClient.put(this.RestUrl +"TBLShamelSCPunishment/"+obj.serial,obj);
  }

  Validate(obj : ITBLShamelSCPunishment ):Observable<ITBLShamelSCPunishment>  {   
    return this.httpClient.post<ITBLShamelSCPunishment>("https://localhost:44335/api/TBLShamelSCPunishment/Validate",obj); 
  }
}
