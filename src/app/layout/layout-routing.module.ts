import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FourDigitCodeComponent } from './four-digit-code/four-digit-code.component';
import { LayoutComponent } from './layout.component';
import { ReverseAuthGuard } from './reverse.auth.guard';
import { SubmitModalComponent } from './home/submit-modal/submit-modal.component';


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
                        component: LoginComponent,
                        canActivate:[ReverseAuthGuard]
                    }
                    ,
                    {
                        path:"signup",
                        component: SignupComponent,
                        canActivate:[ReverseAuthGuard]
                    },
                    {
                        path:"authenticate",
                        component: FourDigitCodeComponent,
                        canActivate:[ReverseAuthGuard]
                    },
                    {
                        path:"update",
                        component: UpdateComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path:"submit",
                        component: SubmitModalComponent,
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