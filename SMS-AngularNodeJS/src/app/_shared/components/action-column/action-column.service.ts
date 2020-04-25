import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionColumnService {

  // Base url
  baseurl = 'http://localhost:4009';

  constructor(
    private _http:HttpClient
  ) { }

  deleteObj(id:number) {  
    // let url = `${this.BACKEND_API}/${deleteUrl}/${id}`;
    // return this._http.delete<any>(url);
    return this._http.delete<any>(`${this.baseurl}/SchoolManagementSystem/api/v1/user/deleteCours/${id}`);
  }
}
