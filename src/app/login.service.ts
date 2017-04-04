import { Injectable } from '@angular/core';
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { NgForm } from "@angular/forms";

@Injectable()
export class LoginService {
  
  http:Http
  private getUsersUrl:string ='http://localhost:3000/getusers';
  private isLoggedIn:boolean;
  message:string;
  httpdata:any;

  constructor(http:Http){
    this.http=http;
    this.isLoggedIn = false;
  }

  /*
  This method calls the getUsersSubscriber method internally to retrieve user details 
  from mongodb database calling the expressJS end-point
  It then checks for matching username and password against the form entered values
  */
  loginProcessor(loginform:NgForm) {
    console.log('onLogin method');
    console.log('User details:',loginform.value);

    //checking if the user has already logged in
    this.isLoggedIn = this.checkUserinLocalStorage(loginform.value.username);
    if(this.isLoggedIn){
      console.log('User already loggedin');
      this.message="User already logged in";
      return;
    }
    else{
      console.log('Need to proceed further');
    }

    //this.getUsers();
    this.getUsersSubscriber();
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

              this.isLoggedIn=true;
              this.message = 'User '+loginform.value.username+' has been logged in and can access login details';
       
              //match has been found so no further users need to checked
              return;
              
            }//end of if(doc.password==loginform.value.password){
          }// end of if(doc.username==loginform.value.username)
        }//end of for loop
      }//end of if(this.httpdata!=null)      
  }//end of loginProcessor


  /*This method checks if the entered username exists in localStorage and if it does,
    checks the expiry date/time 
  */
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

  
  //This method makes the http call
  getUsers(){
    return this.http.get(this.getUsersUrl)
    .map((data: Response) => data.json());
  }

  
  /*
  This method uses the getUsers observable to get data from the 
  expressJS end-point
  */
  getUsersSubscriber() {
    console.log('Calling loginService.getUsers()');
    this.getUsers()
      .subscribe((data: any) => this.httpdata = data,
       (error:any) => {this.message = error;console.log('Error:',this.message)});
      console.log('Data from loginService:',this.httpdata);
  }

  isloggedIn(){
    return this.isLoggedIn;
  }

}//end of LoginService
