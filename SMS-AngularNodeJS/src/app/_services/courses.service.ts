import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  // Base url
  baseurl = 'http://localhost:4009';

  constructor(
    private _http:HttpClient
  ) { }

getCourseList():Observable<any> {
 
  // return  this._http.get<any>(`${this.baseurl}/SchoolManagementSystem/api/v1/user/allCourses`);
  return  this._http.get<any>(`${this.baseurl}/SchoolManagementSystem/api/v1/user/teachersCourses`);
}

}
