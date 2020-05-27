import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Router } from '@angular/router';
import { UIService } from 'src/app/service/ui.service';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Submission } from 'src/app/interfaces/submission';
import { BitContentComponent } from '../../bit-content/bit-content.component';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss']
})
export class SubmitModalComponent implements OnInit,AfterViewInit {

  member: Member;
  @ViewChild('classic1') modal: ElementRef;
  @ViewChild(BitContentComponent) bitComp: BitContentComponent;

  submitForm: FormGroup;
  submission: Submission;
  content_file: File;
  extension: string;

  constructor(private router: Router, private uiService: UIService,
     private variables: AppVariablesService,
     ) { }
  ngAfterViewInit(): void {
    this.uiService.auto_size_text_area();
    this.uiService.upload_button();
    this.submission  ={
      content_type:"",
      content_url:"",
      description:"",
      member:this.member,
      rolls:1
    };
  }

  ngOnInit(): void {
    this.variables.current_member_ob.subscribe(data => this.member = data);

    this.createForm();

  }
  createForm() {
    this.submitForm = new FormGroup({
      description: new FormControl(null, [Validators.required])
    })
  }
  submit() {

  }
  fileChangeEvent(event) {
    var old_file = event.target.files[0];

    this.extension = old_file.name.split('.').pop();

    console.log(this.bitComp);

    this.submission.content_type = this.bitComp.render_type(old_file.type);
    this.bitComp.init(old_file);
    this.content_file = new File([old_file], "temp", { type: old_file.type });

  }

}
