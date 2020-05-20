import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FourDigitCodeComponent } from './four-digit-code/four-digit-code.component';
import { LayoutComponent } from './layout.component';


const routes: Routes = [

    {
        path:'',
        component: LayoutComponent,
        children:[
                    { path: '', redirectTo:'home', pathMatch:"prefix"},
                   

                    {
                        path:"home",
                        component: HomeComponent,
                    },
                    {
                        path:"login",
                        component: LoginComponent
                    }
                    ,
                    {
                        path:"signup",
                        component: SignupComponent
                    },
                    {
                        path:"authenticate",
                        component: FourDigitCodeComponent
                    },
                    {
                        path:"update",
                        component: UpdateComponent,
                        canActivate: [AuthGuard]
                    },
                    { path: '**', redirectTo:'home', pathMatch:"prefix"},
        ]
    }

    
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }




// canActivate: [AuthGuard]