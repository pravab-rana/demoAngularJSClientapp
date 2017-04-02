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
  message:string;
  httpdata:any;
  isLoggedIn:boolean;
  
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

    //checking if the user has already logged in
    this.isLoggedIn = this.checkUserinLocalStorage(loginform.value.username);
    if(this.isLoggedIn){
      console.log('User already loggedin');
      this.message="User already logged in";
      return;
    }

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
       
              //match has been found so no further users need to checked
              return;
              
            }//end of if(doc.password==loginform.value.password){
          }// end of if(doc.username==loginform.value.username)
        }//end of for loop
      }//end of if(this.httpdata!=null)      
  }

  checkUserinLocalStorage(username:string){
    console.log('Checking localStorage');
    if(username===localStorage.getItem('loggedusername')) {
      console.log('Logged user Exists in localStorage');
      var expiryDtTmString = localStorage.getItem('expirydttm');
      
      //console.log('CurrentDtTm:'+new Date().getTime());
      //console.log('ExpirtyDtTm:'+Date.parse(expiryDtTmString));
       
      var expirtyDtTmDate = Date.parse(expiryDtTmString);
      if(expirtyDtTmDate>new Date().getTime()){
        console.log('Login session has not expired');
        return(true);
      }
      else{
        console.log('Login session has expired');
        return(false);
      }
    }
    return(false);
  }

  /*
  This method uses the actual LoginService's getUsers observable to get data from the 
  expressJS end-point
  */
  getUsers() {
    console.log('Calling loginService.getUsers()');
    this.loginService.getUsers()
      .subscribe((data: any) => this.httpdata = data,
       (error:any) => {this.message = error;console.log('Error:',this.message)});
      console.log('Data from loginService:',this.httpdata);
    }
}
