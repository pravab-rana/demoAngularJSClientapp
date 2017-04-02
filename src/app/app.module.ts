import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routes';

import { LoginService } from './login.service';
import { HelpComponent } from './help/help.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UserdetailsGuard } from "app/userdetails.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    PagenotfoundComponent,
    HomeComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [LoginService,UserdetailsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
