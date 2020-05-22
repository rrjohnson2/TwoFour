import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { Router } from '@angular/router';

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
      },
      error=>
      {
        //fail;ed
      })
  }
  resendCode()
  {
    this.glob.generateCode(this.appvariables.temp_member).subscribe(
      data=>
      {
        // passed
      },
      error =>{
        // failed
      }
    )
  }
}
