import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppTokenService } from './app-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private currentPermissionSubject: BehaviorSubject<any>;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  // Base url
  baseurl = 'http://localhost:4009';

  constructor(
    private _http:HttpClient,
    private _appToken: AppTokenService
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsForImage = {
    headers: new HttpHeaders()
  }

  // APIs
public userRegister(data): Observable<any> {

    return  this._http.post<any>(`${this.baseurl}/SchoolManagementSystem/api/v1/user/register`, data,  this.httpOptionsForImage);
  }

  public userLogin(data): Observable<any> {
     console.log(data, "from the auth services 22")
     return  this._http.post<any>(`${this.baseurl}/SchoolManagementSystem/api/v1/user/login`, data, this.httpOptions);
}

  public forgotPassword(data): Observable<any> {

    return this._http.post(`${this.baseurl}/SchoolManagementSystem/api/v1/user/forgotPassword`, data, this.httpOptions);
  }

  public get currentPermissionValue() {
    return this.currentPermissionSubject.value;
  }

  
  // Class methods
  public isAuthenticated(): boolean {
    const token = this._appToken.getToken();
    console.log(token , "token got from the local storage 61 auth-service")
    if (token) {
      return true;
    }
    return false;
  }
  // localStorage.getItem("_app_token")
  
  public setAuthDetail(loginData): void {
    
    console.log(loginData.userProfile.user.user.token, "login Data from the auth 62")
    const Token = loginData.userProfile.user.user.token;
    const User = loginData.userProfile.user.user
    const userToken = Token ? Token : [];
    const UserDetail = User ? User : [];
    // const PermissionDetail = loginData.Permission ? loginData.Permission : [];
   // we will set token to local storage
    this._appToken.saveToken(userToken);
    this.saveCurrentUser(UserDetail);
    // this.savePermission(PermissionDetail);

  }

  public onUserLogout(): void {
    this.removeAuthDetail();
  }

  // currentUserSubject functions
  public saveCurrentUser(UserDetail): void {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(UserDetail));
    this.currentUserSubject.next(UserDetail);
    console.log("\n==> saveCurrentUser: ")
  }

  public removeAuthDetail(): void {

    // this._appToken.deleteToken();
    this.removeCurrentUser();
    this.removePermission();
  }
 // currentUserSubject functions
  public removeCurrentUser(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public removePermission(): void {
    // remove permissions from local storage and set current permission to null
    localStorage.removeItem('currentPermission');
    this.currentPermissionSubject.next(null);

  }

}

