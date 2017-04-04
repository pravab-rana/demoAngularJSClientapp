import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginService:LoginService;
  message:string;
  
  constructor(loginService:LoginService){
     this.loginService = loginService;
   }

  public user:any = {
    username:"",
    password:""
  };

  onLogin(loginform:NgForm) {
    this.loginService.loginProcessor(loginform);
    this.message = this.loginService.message;
  }
}
