import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Router } from '@angular/router';
import { UIService } from 'src/app/service/ui.service';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Submission } from 'src/app/interfaces/submission';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss']
})
export class SubmitModalComponent implements OnInit {

  member:Member;
  @ViewChild('classic1') modal : ElementRef;
  submitForm:FormGroup
  submission:Submission;
  constructor(private router:Router, private uiService:UIService, private variables:AppVariablesService) { }

  ngOnInit(): void {
    this.variables.current_member_ob.subscribe(data=> this.member = data);
    
    this.createForm();
    
  }
  createForm()
  {
    this.submitForm = new FormGroup({
      description: new FormControl(null,[Validators.required])
    })
  }

  open()
  {
    if(this.member == null) {
      this.router.navigate(['layout/login']);
      return;
    }

    this.uiService.open(this.modal, "modal-mini", 'sm');
    this.uiService.auto_size_text_area();
    this.uiService.upload_button();
  }
  submit()
  {

  }
  fileChangeEvent(event){

  }

}
