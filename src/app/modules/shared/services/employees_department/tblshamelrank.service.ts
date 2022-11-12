import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelRank } from '../../models/employees_department/ITBLShamelRank';

@Injectable({
  providedIn: 'root'
})
export class TblshamelrankService {

  public list_ITBLShamelRank : ITBLShamelRank [];
 
  public List_ITBLShamelRank_BehaviorSubject:BehaviorSubject<ITBLShamelRank[]> = new BehaviorSubject<ITBLShamelRank[]>([]);



  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list() : Observable<ITBLShamelRank[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelRank[]>(this.RestUrl +"TBLShamelRank",options);      
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelRank[]>(this.RestUrl +"TBLShamelRank",options).subscribe(
      data=>
      {
        this.List_ITBLShamelRank_BehaviorSubject.next(data);
        this.list_ITBLShamelRank = data;

      }
     )  
    
  }

  delete(rank_id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelRank/delete/"+rank_id,options);  
  }

  add(obj : ITBLShamelRank )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelRank/",obj,options);  
  }

  update(obj : ITBLShamelRank )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelRank/"+obj.rank_id,obj,options);  
  }

}
