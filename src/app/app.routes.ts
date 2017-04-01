import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";

import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from "app/app.component";
import { HelpComponent } from "app/help/help.component";
import { PagenotfoundComponent } from "app/pagenotfound/pagenotfound.component";
import { HomeComponent } from "app/home/home.component";

export const routes:Routes = [
    {
        path:"home",component:HomeComponent
    },
    {
        path:"help",component:HelpComponent
    },
    {
        path:"login", component:LoginComponent
    },
    {
        path:"",redirectTo:"home",pathMatch:"full"
    },
    {
        path:"**",component:PagenotfoundComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
