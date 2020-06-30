import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Router } from '@angular/router';
import { UIService } from 'src/app/service/ui.service';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Submission } from 'src/app/interfaces/submission';
import { BitContentComponent } from '../../bit-content/bit-content.component';
import { SubmitModalService } from './submit-modal.service';
import { SubmissionTicket } from 'src/app/models/submission-ticket';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { Actions } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-submit-modal',
  templateUrl: './submit-modal.component.html',
  styleUrls: ['./submit-modal.component.scss']
})
export class SubmitModalComponent implements OnInit, AfterViewInit {

  member: Member;
  @ViewChild('classic1') modal: ElementRef;
  @ViewChild(BitContentComponent) bitComp: BitContentComponent;

  submitForm: FormGroup;
  submission: Submission;
  content_file: File;
  extension: string;

  constructor(private router: Router, private uiService: UIService,
    private variables: AppVariablesService,
    private submitService: SubmitModalService
  ) { }
  ngAfterViewInit(): void {
    this.uiService.auto_size_text_area();
    this.uiService.upload_button();
    this.submission = {
      content_extension: null,
      content_type: null,
      content_url: null,
      description: null,
      member: this.member,
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
    this.submission.description = this.submitForm.get("description").value;
    this.submitService.submit(this.submission).subscribe(
      data => {
        var filename: string = <string>data;
        if (filename != null && this.content_file !=null) {
          var FileNew: File = new File([this.content_file], filename +this.submission.content_extension, { type: this.content_file.type });
          this.submitService.uploadSubmission(FileNew).subscribe(
            data => {
              var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'File Uploaded', type: 'success' };

              this.variables.addAlert(alert_ticket);
            },
            error => {
              var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Could Not Submit File', type: 'danger' };

              this.variables.addAlert(alert_ticket);
            }
          );
        }
          var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Post Uploaded', type: 'success' };

          this.variables.addAlert(alert_ticket);
          this.router.navigate(['/layout/home']);
          this.submitForm.reset();



      },
      error => {
        console.log(error)
        var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Could Not Submit', type: 'danger' };

        this.variables.addAlert(alert_ticket);
        this.submitForm.reset();
        this.bitComp.init(null);
      }
    )

  }
  fileChangeEvent(event) {
    var old_file = event.target.files[0];

    this.submission.content_extension = "." + old_file.name.split('.').pop();

    this.submission.content_type = old_file.type;
    this.bitComp.init(old_file);
    this.content_file = new File([old_file], "temp", { type: old_file.type });

  }
  reset() {
    this.variables.setup();
    this.router.navigate(['/layout/home']);
  }

}
