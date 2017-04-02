import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';

@Injectable()
export class UserdetailsGuard implements CanActivate {
  canActivate() {
    console.log('UserdetailsGuard#canActivate called');
    return true;
  }
}