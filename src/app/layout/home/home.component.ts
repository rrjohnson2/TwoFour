import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Contest } from 'src/app/models/contest';
import { GlobalService } from 'src/app/service/global.service';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';
import { Actions } from 'src/app/constants/app.constant';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { BitContentComponent } from '../bit-content/bit-content.component';
import { HomeService } from './home.service';
import { Submission } from 'src/app/interfaces/submission';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(SubmitModalComponent) submit: SubmitModalComponent;
  @ViewChild(BitContentComponent) bitComp: BitContentComponent
  contest: Contest;
  previousWinner: Submission;
  today: Date = new Date();
  hours_to_secs_24: number = 86400;
  constructor(private variables: AppVariablesService, private glob: GlobalService, private homeService: HomeService) { }
  ngAfterViewInit(): void {

  }


  ngOnInit(): void {
    this.init();

  }
  init() {
    this.variables.currentContest_ob.subscribe(data => {
      this.contest = data
    });
    this.variables.previousWinner_ob.subscribe(data => {
      this.previousWinner = data;
      this.populateBit(<Submission>data);

    });
  }



  nextContest(event) {
    this.variables.current_member.post_count = 0;
    this.variables.reloadBS(this.variables.current_member);

    this.glob.getPreviousWinner().subscribe(data => { this.variables.populatePreviousWinner(data) },
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
  populateBit(data: Submission) {
    if (data != null && data.content_url != null) {
      if (this.bitComp != null) {
        this.bitComp.type = data.content_type;
        this.homeService.getSubmission(data.content_url+ data.content_extension).subscribe(
          data => {
            this.bitComp.src = URL.createObjectURL(data);
          }, error => {
            console.log(error)
            this.bitComp.type = 'image';
            this.bitComp.src = 'assets/icons/failed.jpg';
          }
        )
      }
      else {
        setTimeout(() => {
          this.populateBit(data);
        }, 1)
      }
    }
  }


}
