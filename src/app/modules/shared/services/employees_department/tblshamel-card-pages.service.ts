import { HttpHeaders, HttpClient, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITBLShamelCardPages } from "../../models/employees_department/ITBLShamelCardPages";

@Injectable({
  providedIn: 'root'
})
export class TBLShamelCardPagesService {

  public List_ITBLShamelCardPages:ITBLShamelCardPages[] = [];
  public List_ITBLShamelCardPages_BehaviorSubject:BehaviorSubject<ITBLShamelCardPages[]> = new BehaviorSubject<ITBLShamelCardPages[]>([]);


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' })
 };

  constructor(private httpClient : HttpClient) { }

  list()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.get(this.RestUrl +"TBLShamelCardPages",options);

  }



  fill()  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    this.httpClient.get<ITBLShamelCardPages[]>(this.RestUrl +"TBLShamelCardPages",options).subscribe
    (
      data=>
      {
        this.List_ITBLShamelCardPages = data;
        this.List_ITBLShamelCardPages_BehaviorSubject.next(data);
      }
    )

  }



  delete(id:number )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete(this.RestUrl +"TBLShamelCardPages/delete/"+id,options);
  }

  add(obj : ITBLShamelCardPages )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;

    const options = {  headers: headers };
    return this.httpClient.post(this.RestUrl +"TBLShamelCardPages/",obj,options);
  }

  update(obj : ITBLShamelCardPages )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = { 'obj': obj } as HttpParamsOptions;

    const options = {  headers: headers };
    return this.httpClient.put(this.RestUrl +"TBLShamelCardPages/"+obj.Serial,obj,options);
  }
}
