import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

const userservice = inject(UserServiceService);
const myToken = userservice.getToken();


//console.log(myToken);
if(myToken)
  console.log('----------------------------------',myToken);
    req = req.clone({
 //headers: req.headers.set('Authorization',  `Bearer ${myToken}` )
    setHeaders: {
      'Authorization' : `Bearer ${myToken}`
    }
  });
  return next(req);

//return next(req);
};
