import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'error enxpacted';
      
      if (error.error instanceof ErrorEvent) {
        errorMessage = `error: ${error.error.message}`;
      } else {
        errorMessage = `error status: ${error.status}, message: ${error.message}`;
      }
      
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};