import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
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
  constructor(private variables: AppVariablesService, private glob: GlobalService) { }
 

  ngOnInit(): void {
    this.init();

  }
  init() {
    this.variables.currentContest_ob.subscribe(data => {
      this.contest = data
    });
    this.variables.previousContest_ob.subscribe(data => {
      this.previousContest = data;
      this.populateBit(<Contest>data);
      
    });
  }

  

  nextContest(event) {
    console.log("here");
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

    
  }
  populateBit(data:Contest) {
    if (data!=null && data.winning_content_url != null) {

      this.bitComp.type=data.winning_content_type;
      this.bitComp.src = image_server_url + "getSubmission?sub=" + data.winning_content_url;
    }
  }


}
