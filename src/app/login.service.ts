import { Injectable } from '@angular/core';
import { Http,Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class LoginService {
  http:Http
  private getUsersUrl='http://localhost:3000/getusers'
  constructor(http:Http){
    this.http=http;
  }

  getUsers(){
    return this.http.get(this.getUsersUrl)
    .map((data: Response) => data.json());
  }

}
