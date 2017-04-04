import { Injectable }     from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from "app/login.service";

@Injectable()
export class UserdetailsGuard implements CanActivate {

  loginService:LoginService;
  router:Router;

  constructor(loginService: LoginService,  router: Router){
    this.loginService = loginService;
    this.router = router;
  }  
  
  canActivate() {
    console.log('UserdetailsGuard#canActivate called');
    if(this.loginService.isloggedIn()){
            return true;
        }
        else{
            this.router.navigate(['/login'])
            return false;
        }
    //return true;
  }
}

