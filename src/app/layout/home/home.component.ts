import { Component, OnInit, ViewChild } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Contest } from 'src/app/models/contest';
import { GlobalService } from 'src/app/service/global.service';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';
import { Actions, image_server_url } from 'src/app/constants/app.constant';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { BitContentComponent } from '../bit-content/bit-content.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(SubmitModalComponent) submit: SubmitModalComponent;
  @ViewChild(BitContentComponent) bitComp: BitContentComponent
  contest: Contest;
  previousContest: Contest;
  today: Date = new Date();
  hours_to_secs_24: number = 86400;
  seconds_differ: number = this.hours_to_secs_24;
  loading = false;
  constructor(private variables: AppVariablesService, private glob: GlobalService) { }

  ngOnInit(): void {
    this.init();

  }
  init() {
    this.variables.currentContest_ob.subscribe(data => {
      this.contest = data
      this.countdown();
    });
    this.variables.previousContest_ob.subscribe(data => {
      this.previousContest = data;
      this.populateBit(<Contest>data);
      this.loading=false;
    });
  }

  countdown() {
    setTimeout(() => {
      if (this.seconds_differ <= 0) {
        
        this.nextContest();
      }
      else if (this.contest != null && this.contest.calendar != null) {
        this.today = new Date();
        this.seconds_differ = (new Date(this.contest.calendar).getTime() - this.today.getTime()) / 1000;
        this.countdown();
        console.log("log");
      }
    }, 1000)
  }

  nextContest() {
    if(this.loading) return;
    console.log("here");
    this.loading = true;
    this.variables.current_member.post_count = 0;
    this.variables.reloadBS(this.variables.current_member);

    this.glob.getPreviousContest().subscribe(data => { this.variables.populatePreviousContest(data)},
      error => {
        var alert_ticket: AlertTicket = { action_attempted: Actions.currrentContest, msg: 'Could Load Current Contest', type: 'danger' };

        this.variables.addAlert(alert_ticket)
      });


    this.glob.getContest().subscribe(
      data => { this.variables.populateContest(data) },
      error => {
        var alert_ticket: AlertTicket = { action_attempted: Actions.currrentContest, msg: 'Could Load Prev Contest', type: 'danger' };

        this.variables.addAlert(alert_ticket)
      })

    this.seconds_differ = this.hours_to_secs_24;
  }
  populateBit(data:Contest) {
    console.log(data);
    if (data&& data.wiining_content_url != null) {
      this.bitComp.src = image_server_url + "getSubmission?sub=" + data.wiining_content_url;
    }
  }


}
