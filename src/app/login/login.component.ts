import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginService:LoginService;
  errorMessage:string;
  httpdata:any;
  
  constructor(loginService:LoginService){
     this.loginService = loginService;
   }

  ngOnInit() {
  }

  public user:any = {
    username:"",
    password:""
  };

  onLogin(loginform:NgForm) {
    console.log('In login method');
    console.log('User details:',loginform.value);
    this.getUsers();
  }

  getUsers() {
    console.log('Calling loginService.getUsers()');
    this.loginService.getUsers()
      .subscribe((data: any) => this.httpdata = data,
       (error:any) => {this.errorMessage = error;console.log('Error:',this.errorMessage)});

      console.log('Data from loginService:',this.httpdata);
  }

  
}
