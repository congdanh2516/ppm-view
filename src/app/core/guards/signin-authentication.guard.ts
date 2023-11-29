import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/feature/authentication/services/authentication.service';
import { inject } from '@angular/core';

export const signinAuthenticationGuard: CanActivateFn = (route, state) => {

  const authen = inject(AuthenticationService);
  const router = inject(Router)
  if(authen.userId=="") {
    router.navigateByUrl("/sign-in");
    return false;
  }
  return true;
};
