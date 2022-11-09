import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITBLShamelDocumentType } from '../../models/employees_department/ITBLShamelDocumentType';

@Injectable({
  providedIn: 'root'
})
export class TblshameldocumenttypeService {

 
  public List_ITBLShamelDocumentType_BehaviorSubject:BehaviorSubject<ITBLShamelDocumentType[]> = new BehaviorSubject<ITBLShamelDocumentType[]>([]);

  public List_ITBLShamelDocumentType ?:ITBLShamelDocumentType[]=[];

  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelDocumentType[]>(this.RestUrl +"TBLShamelDocumentType",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelDocumentType[]>(this.RestUrl +"TBLShamelDocumentType",options).subscribe
    (
      (data)=> {
        this.List_ITBLShamelDocumentType = data;
        this.List_ITBLShamelDocumentType_BehaviorSubject.next(data);
      }
    )    
  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelDocumentType/delete/"+id,options);  
  }

  add(obj : ITBLShamelDocumentType )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');      
    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelDocumentType/",obj,options);  
  }

  update(obj : ITBLShamelDocumentType )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');  
    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelDocumentType/"+obj.documenttype_id,obj,options);  
  }

}
