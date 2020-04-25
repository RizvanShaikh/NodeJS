import { Injectable } from '@angular/core';
import { CanActivate, Router , RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth/service/auth-service.service';

//Ref:  https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  
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
