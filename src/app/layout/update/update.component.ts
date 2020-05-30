import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { UIService } from 'src/app/service/ui.service';
import { MyErrorStateMatcher } from 'src/app/constants/error.state.matches';
import { UpdateService } from './update.service';
import { Ticket } from 'src/app/interfaces/ticket';
import { GlobalService } from 'src/app/service/global.service';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Actions } from 'src/app/constants/app.constant';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  member: Member
  usernameForm: FormGroup;
  emailForm: FormGroup;
  phoneForm: FormGroup;
  facebookForm: FormGroup;
  instagramForm: FormGroup;
  twitterForm: FormGroup;
  passwordForm: FormGroup;

  matcher = new MyErrorStateMatcher;

  phoneno = /\d/g;

  facebook = faFacebook;
  instagram = faInstagram;
  twitter = faTwitter;

  choice: string;
  message;
  @ViewChild('classic1') modal: ElementRef;
  constructor(
    private uiserve: UIService,
    private updateServe: UpdateService,
    private variables: AppVariablesService) { }

  ngOnInit(): void {
  }
  createForm() {

    switch (this.choice) {
      case 'username':
        this.usernameForm = new FormGroup({
          username: new FormControl(this.member.username, Validators.required)
        });
        break;
      case 'email':
        this.emailForm = new FormGroup({
          target: new FormControl(this.member.email, [Validators.required, Validators.email]),
          confirm: new FormControl(null, [Validators.required, Validators.email])

        }, { validators: this.confirming });
        break;
      case 'phone':
        this.phoneForm = new FormGroup({
          phone: new FormControl(this.member.phone, [Validators.pattern(this.phoneno), Validators.min(10)])
        });
        break;
      case 'facebook':
        this.facebookForm = new FormGroup({
          facebook: new FormControl(this.member.facebook, Validators.required)
        });
        break;
      case 'twitter':
        this.twitterForm = new FormGroup({
          twitter: new FormControl(this.member.twitter, Validators.required)
        });
        break;
      case 'instagram':
        this.instagramForm = new FormGroup({
          instagram: new FormControl(this.member.instagram, Validators.required)
        });
        break;
      case 'password':
        this.passwordForm = new FormGroup({
          old_password: new FormControl(null, Validators.required),
          target: new FormControl(null, Validators.required),
          confirm: new FormControl(null, Validators.required)

        }, { validators: this.confirming });
        break;
    }

  }
  choose(choice) {
    this.choice = choice;
    this.createForm();
    this.uiserve.open(this.modal, "modal-mini", 'sm');
  }

  submit() {
    console.log("here")
    var temp: Member = new Member(
      this.member.username,
      this.member.email,
      this.member.phone,
      this.member.verified,
      this.member.post_count,
      this.member.facebook,
      this.member.instagram,
      this.member.twitter,
      this.member.newsletter,
      this.member.messageMedium,
      this.member.notify
    )
    switch (this.choice) {
      case 'username':
        temp.username = this.usernameForm.get("username").value;
        break;
      case 'email':
        temp.email = this.emailForm.get("target").value;
        if (temp.phone != null) {
          temp.messageMedium = 'BOTH'
        }
        break;
      case 'phone':
        temp.phone = this.phoneForm.get("phone").value;
        if (temp.email != null) {
          temp.messageMedium = 'BOTH'
        }
        break;
      case 'facebook':
        temp.facebook = this.facebookForm.get("facebook").value;
        break;
      case 'twitter':
        temp.twitter = this.twitterForm.get("twitter").value;
        break;
      case 'instagram':
        temp.instagram = this.instagramForm.get("instagram").value;
        break;
      case 'password':
        var ticket: Ticket = {
          id: this.member.username, data: {
            old_password: this.passwordForm.get('old_password').value,
            password: this.passwordForm.get("target").value
          }
        }
        this.updateServe.updatePassword(ticket).subscribe(
          data => {
            var alert_ticket: AlertTicket = {
              action_attempted: Actions.signup,
              msg: 'Updated ' + this.choice.toLocaleUpperCase(),
              type: 'success'
            };

            this.variables.addAlert(alert_ticket);

            this.cancel();

          },
          error => {
            this.message = "Failed"
          }
        )
        return;
    }

    var ticket: Ticket = { id: this.member.username, data: temp }
    this.updateServe.update(ticket).subscribe(
      data => {
        this.variables.reloadBS(temp);
        var alert_ticket: AlertTicket = {
          action_attempted: Actions.signup,
          msg: 'Updated ' + this.choice.toLocaleUpperCase(),
          type: 'success'
        };

        this.variables.addAlert(alert_ticket);
        this.cancel();
      },
      error => {
        this.message = "Failed"
      }
    )



  }

  private confirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("target").value !== c.get("confirm").value) {
      return { invalid: true };
    }
  }

  cancel() {
    this.uiserve.dismissAll();
  }

}
