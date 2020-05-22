import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/constants/error.state.matches';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher;
  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm()
  {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl(null,[Validators.required]),
        email_phone: new FormControl(null,[Validators.required]),
        password: new FormControl(null,[Validators.required]),
        password_check: new FormControl(null,[Validators.required])
      },{validators:this.checkPasswords}
    )
  }
  submit()
  {
    
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPass = group.get('password_check').value;

  return pass === confirmPass ? null : { notSame: true }     
}

}
