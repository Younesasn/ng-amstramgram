import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
    url: req.url.startsWith('http') ? req.url : environment.apiUrl + req.url,
    withCredentials: true,
  });
  return next(clone);
};
