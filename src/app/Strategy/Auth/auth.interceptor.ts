import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@Environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authReq = req.clone({
    headers: req.headers.set('X-API-KEY', environment.ApiKeys)
  });

  return next(authReq);
};
