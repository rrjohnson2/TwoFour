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
import { FooterComponent } from './footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    HomeComponent, UpdateComponent, LoginComponent, SignupComponent, FourDigitCodeComponent, LayoutComponent, FooterComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatSidenavModule, MatToolbarModule, MatListModule,
  ],
  providers:[AuthGuard]
})
export class LayoutModule { }
