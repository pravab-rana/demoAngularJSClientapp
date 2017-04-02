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

  /*
  This method calls the getUser method internally to retrieve user details 
  from mongodb database calling the expressJS end-point
  It then checks for matching username and password against the form entered values
  */
  onLogin(loginform:NgForm) {
    console.log('onLogin method');
    console.log('User details:',loginform.value);
    this.getUsers();
    if(this.httpdata!=null){
        console.log('User no:'+this.httpdata.docs.length);
        for(let doc of this.httpdata.docs){
          console.log('Doc:',doc);
          if(doc.username==loginform.value.username) {
            console.log('Matching username found');
            if(doc.password==loginform.value.password){
              console.log('Credentials match');
             
              var currentDtTm = new Date();
              
              //getTime() returns the numeric value in milliseconds since Jan 1,1970
              //as such 60000 is 1 min, and I am setting the expiryDtTm to 5 mins
              var expirtyDtTm = new Date(currentDtTm.getTime() + 5*60000);
              
              console.log('Date:'+Date());
              console.log('Date+5',new Date(currentDtTm.getTime() + 5*60000));
              
              //adding to localStorage for persistance
              localStorage.setItem('loggedusername',loginform.value.username);
              localStorage.setItem('expirydttm',expirtyDtTm.toString());
             
              
            }
          }
        }
      }
      
  }

  /*
  This method uses the actual LoginService's getUsers observable to get data from the 
  expressJS end-point
  */
  getUsers() {
    console.log('Calling loginService.getUsers()');
    this.loginService.getUsers()
      .subscribe((data: any) => this.httpdata = data,
       (error:any) => {this.errorMessage = error;console.log('Error:',this.errorMessage)});
      console.log('Data from loginService:',this.httpdata);
    }
}
