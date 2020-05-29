import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { Router } from '@angular/router';
import { Actions } from 'src/app/constants/app.constant';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';

@Component({
  selector: 'app-four-digit-code',
  templateUrl: './four-digit-code.component.html',
  styleUrls: ['./four-digit-code.component.scss']
})
export class FourDigitCodeComponent implements OnInit {

  constructor(private router:Router, private appvariables:AppVariablesService, private glob:GlobalService) { }

  codeForm:FormGroup;
  ngOnInit(): void {
    this.createForm()
  }
  createForm()
  {
    this.codeForm = new FormGroup({
      code:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(6)])
    });
  }
  submit(){
      var ticket:Ticket={
        data:{
          mem: this.appvariables.temp_member,
          code:this.codeForm.get("code").value
        }
      }

      this.glob.authenticate(ticket).subscribe(data=>{
        this.appvariables.fillMember(this.appvariables.temp_member,this.appvariables.temp_ticket);
        this.router.navigate(['/layout/home'])
        var alert_ticket:AlertTicket= {action_attempted:Actions.authenicateCode,msg:'Authenicate Code Success',type:'success'};

        this.appvariables.addAlert(alert_ticket);
      },
      error=>
      {
        var alert_ticket:AlertTicket= {action_attempted:Actions.authenicateCode,msg:'Could not Authenicate Code',type:'danger'};

        this.appvariables.addAlert(alert_ticket);
      })
  }
  resendCode()
  {
    this.glob.generateCode(this.appvariables.temp_member).subscribe(
      data=>
      {
        var alert_ticket:AlertTicket= {action_attempted:Actions.authenicateCode,msg:'Code Generated',type:'success'};

        this.appvariables.addAlert(alert_ticket);
      },
      error =>{
        var alert_ticket:AlertTicket= {action_attempted:Actions.authenicateCode,msg:'Could not Generate Code',type:'danger'};

        this.appvariables.addAlert(alert_ticket);
      }
    )
  }
}
