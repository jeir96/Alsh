import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITBLShamelCourse } from '../../models/employees_department/ITBLShamelCourse';
import { ITBLShamelMalakState } from '../../models/employees_department/ITBLShamelMalakState';

@Injectable({
  providedIn: 'root'
})
export class TblshamelcourseService {

  public List_ITBLShamelCourse_BehaviorSubject:BehaviorSubject<ITBLShamelCourse[]> = new BehaviorSubject<ITBLShamelCourse[]>([]);

  public List_ITBLShamelCourse :ITBLShamelCourse[]=[];


  private RestUrl = 'https://localhost:44335/api/';
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json;charset=UTF-8' }) 
 };
 
  constructor(private httpClient : HttpClient) { }

  list()  : Observable<ITBLShamelCourse[]>{
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const options = {  headers: headers };  
    return this.httpClient.get<ITBLShamelCourse[]>(this.RestUrl +"TBLShamelCourse",options);  
    
  }

  fill()  {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const options = {  headers: headers };  
     this.httpClient.get<ITBLShamelCourse[]>(this.RestUrl +"TBLShamelCourse",options).subscribe
     (
      data=>
      {
        this.List_ITBLShamelCourse = data;
        this.List_ITBLShamelCourse_BehaviorSubject.next(data);
      }
     )  
    
  }


  delete(course_id:number)  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };
    return this.httpClient.delete("https://localhost:44335/api/TBLShamelCourse/"+course_id);
  }


  add(obj : ITBLShamelCourse )  {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});  
    const options = { headers: headers };
    return this.httpClient.post("https://localhost:44335/api/TBLShamelCourse",obj,options); 
  }

  update(obj : ITBLShamelCourse )  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {  headers: headers };    
    return this.httpClient.put(this.RestUrl +"TBLShamelCourse/"+obj.course_id,obj,options);
  }

}
