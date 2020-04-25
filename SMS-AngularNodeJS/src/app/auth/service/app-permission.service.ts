import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AppPermissionService {

  constructor(
    private _authService:AuthServiceService
  ) { }
  
  public getModelPermissionList(model) {
     // redirect to home if already logged in
     if (this._authService.currentPermissionValue) {
      let permissions =  this._authService.currentPermissionValue.permission;
      return permissions[model]
    }
    return false;
  }
}
