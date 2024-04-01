import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../Services/user-service.service';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const userservices = inject(UserServiceService);
  const router = inject(Router);
  const toaster = inject (ToastrService)
  if(userservices.isLoggedIn())
  {
    return true;
  }
  else{
    toaster.error("error");
    router.navigate(['login']);
    
    return false;
  }

}



