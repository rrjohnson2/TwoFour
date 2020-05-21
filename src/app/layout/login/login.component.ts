import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppVariablesService } from 'src/app/service/app-variables.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private router:Router,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm()
  {
    this.loginForm = new FormGroup(
      {
        email_phone: new FormControl(null,[
            Validators.required
        ]),
        password: new FormControl(null,[
          Validators.required
         ])
      }
    );
  }


  submit()
  {

  }

  signUp(){
    this.router.navigate(['/layout/signup'])
  }


}
