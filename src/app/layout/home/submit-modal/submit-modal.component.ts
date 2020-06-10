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
      content_extension: "",
      content_type: "",
      content_url: "",
      description: "",
      member: this.member,
      rolls: 1
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
        var subTicket: SubmissionTicket = <SubmissionTicket>data;
        if (this.content_file != null) {
          if (subTicket.win) {
            var winnerFile: File = new File([this.content_file], subTicket.win, { type: this.content_file.type });
            this.submitService.uploadSubmission(winnerFile).subscribe(
              data => {
                var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'File Uploaded', type: 'success' };

                this.variables.addAlert(alert_ticket);
                if(!subTicket.backupSlot){
                  this.reset();
                }
              },
              error => {
                var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Could Not Submit Fieloo', type: 'danger' };

                this.variables.addAlert(alert_ticket);
              }
            );
          }
          if (subTicket.backupSlot) {
            var backupFile: File = new File([this.content_file], subTicket.backupSlot, { type: this.content_file.type });
            this.submitService.uploadSubmission(backupFile).subscribe(
              data => {
                var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'File Uploaded', type: 'success' };

                this.variables.addAlert(alert_ticket);
                this.reset();
              },
              error => {
                var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Could Not Submit', type: 'danger' };

                this.variables.addAlert(alert_ticket);
              }
            );
          }
        }
        if (!(subTicket.win || subTicket.backupSlot)) {
          var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Post submitted', type: 'success' };

          this.variables.addAlert(alert_ticket);
          this.reset();
        }
      },
      error => {
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
  reset()
  {
    this.variables.setup();
    this.router.navigate(['/layout/home']);
  }

}
