import { Component, OnInit } from '@angular/core';

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

  login(user) {
    console.log('In login method');
    console.log('User details:',user);
  }

}
