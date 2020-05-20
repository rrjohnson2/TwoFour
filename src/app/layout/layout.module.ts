import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FourDigitCodeComponent } from './four-digit-code/four-digit-code.component';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent, UpdateComponent, LoginComponent, SignupComponent, FourDigitCodeComponent, LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule
  ],
  providers:[AuthGuard]
})
export class LayoutModule { }
