import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/constants/error.state.matches';
import { GlobalService } from 'src/app/service/global.service';
import { Member } from 'src/app/models/member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher;
  email_regex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
  phoneno = /\d/g;
  constructor(private router:Router,private glob:GlobalService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        email_phone: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        password_check: new FormControl(null, [Validators.required]),
        newsletter: new FormControl(null, []),
        notify: new FormControl(null, [])
      }, { validators: this.checkPasswords }
    )
  }
  submit() {
    var messageMedium = this.email_or_phone();

    if(messageMedium !=null)
    {
      var member:Member = new Member(
        this.signUpForm.get("username").value,
        null,
        null,
        false,
        null,
        null,
        null,
        null,
        this.signUpForm.get("newsletter").value,
        messageMedium,
        this.signUpForm.get("notify").value,
      )

      if(messageMedium == "EMAIL")
      {
        member.email = this.signUpForm.get("email_phone").value;
      }
      else{
        member.phone = this.signUpForm.get("email_phone").value;
      }
      console.log(member);
      this.glob.generateCode(member).subscribe(data=>{

          this.router.navigate(['/layout/code']);
      })
    }
    // failed
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('password_check').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  email_or_phone()
  {
      var emailPhone:string = this.signUpForm.get("email_phone").value
      if(emailPhone.match(this.email_regex))
      {
        return 'EMAIL'
      }
      else if(emailPhone.match(this.phoneno).length===10)
      {
        console.log("phone");
          return 'PHONE'
      }
  }

}
