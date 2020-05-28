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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReverseAuthGuard } from './reverse.auth.guard';
import { CountTimePipe } from '../pipe/count-time.pipe';
import { CountdownComponent } from './home/countdown/countdown.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SubmitModalComponent } from './home/submit-modal/submit-modal.component';
import { BitContentComponent } from './bit-content/bit-content.component';
import { SafeHtmlPipe } from '../pipe/safe-html.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { AlertManagerComponent } from './alert-manager/alert-manager.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    
    CountTimePipe,SafeHtmlPipe,
    HomeComponent, UpdateComponent, LoginComponent, 
    SignupComponent, FourDigitCodeComponent, LayoutComponent,
    FooterComponent, CountdownComponent, SubmitModalComponent,
    BitContentComponent,
    AlertManagerComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,MatFormFieldModule,MatInputModule,
    MatButtonModule,MatIconModule,MatProgressBarModule,
    MatCheckboxModule,MatChipsModule,MatTooltipModule,
    MatDialogModule,
    NgbModule,
  ],
  providers:[AuthGuard, ReverseAuthGuard]
})
export class LayoutModule { }
