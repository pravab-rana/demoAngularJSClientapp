import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public user:any = {
    username:"",
    password:""
  };

  onLogin(loginform:NgForm) {
    console.log('In login method');
    console.log('User details:',loginform.value);
  }

}
