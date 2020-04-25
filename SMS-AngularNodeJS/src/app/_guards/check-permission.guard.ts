import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPermissionGuard implements  CanActivate {

    
  constructor(
    public router: Router,
    public auth: AuthServiceService 
     ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) {

      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }, replaceUrl: true });
    return false;
  }
}
