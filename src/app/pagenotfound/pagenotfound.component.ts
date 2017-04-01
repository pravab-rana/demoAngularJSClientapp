import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {

  router:Router
  currentUrl:String;
  
  constructor(router: Router ) {
    this.router = router;
    this.currentUrl = this.router.url;
  }

}
