import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from "app/login/login.component";

import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from "app/app.component";

export const routes:Routes = [
    {
        path:'home',component:AppComponent
    },
    {
        path:"login", component:LoginComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
