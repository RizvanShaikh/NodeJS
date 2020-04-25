import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthServiceService } from '../auth/service/auth-service.service';
import swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthServiceService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(

            // retry(1),

            catchError(err => {

            console.log("\n======= ErrorHandlerInterceptor ==========\n");
            console.log("err : ", err);
            console.log("\n======= ! ErrorHandlerInterceptor ==========\n");
           
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this._authenticationService.onUserLogout();
                location.reload(true);
            }

            if (err.status === 403) {
                // auto logout if 401 response returned from api
                swal.fire(err.statusText, 'NO permission allowed', 'error');

            }

            else if (err.status === 404) {
                // url not found
                swal.fire('Server Error', 'Url not found', 'error');
            }

            else if (err.status === 0) {
                // url not found
                swal.fire(err.statusText, 'Please check your Internet connectivity', 'error');
            }
            else{    
                swal.fire('Server Error', 'Please try again later', 'error');
            }
            
            const error = err.error.message || err.statusText;


            return throwError(error);
        }))
    }
}