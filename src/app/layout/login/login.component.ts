import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { GlobalService } from 'src/app/service/global.service';
import { Member } from 'src/app/models/member';
import { Ticket } from 'src/app/interfaces/ticket';
import { Actions } from 'src/app/constants/app.constant';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private router: Router, private appVariables: AppVariablesService, private glob: GlobalService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup(
      {
        email_phone_username: new FormControl(null, [
          Validators.required
        ]),
        password: new FormControl(null, [
          Validators.required
        ])
      }
    );
  }


  submit() {
    if (this.loginForm.valid) {
      var ticket: Ticket = {
        id: this.loginForm.get("email_phone_username").value,
        data: this.loginForm.get("password").value
      };
      this.glob.login(ticket).subscribe(data => {

        this.appVariables.fillMember(<Member>data, ticket);
        this.router.navigate(['layout/home']);
        var alert_ticket:AlertTicket= {action_attempted:Actions.login,msg:'Login Worked',type:'success'};

        this.appVariables.addAlert(alert_ticket);
      },
        error => {
          var alert_ticket:AlertTicket= {action_attempted:Actions.login,msg:'Login Failed',type:'danger'};

        this.appVariables.addAlert(alert_ticket);
        });
    }
  }

  signUp() {
    this.router.navigate(['/layout/signup'])
  }


}
