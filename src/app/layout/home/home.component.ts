import { Component, OnInit, ViewChild } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Contest } from 'src/app/models/contest';
import { GlobalService } from 'src/app/service/global.service';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(SubmitModalComponent) submit: SubmitModalComponent;
  progress:number;
  contest:Contest;
  today:Date = new Date();
  hours_to_secs_24 :number = 86400;
  seconds_differ: number= this.hours_to_secs_24;
  constructor(private variables:AppVariablesService, private glob :GlobalService) { }

  ngOnInit(): void {
    this.init();
    
  }
  init()
  {
    this.variables.currentContest_ob.subscribe(data=> {
      this.contest = data
      this.countdown();
    });
  }

  countdown()
   {
      setTimeout(()=>{
        if(this.seconds_differ <= 0) {
          this.glob.getContest().subscribe(data=>{
          this.variables.populateContest(data);
          this.seconds_differ =this.hours_to_secs_24;
          });
        }
        else if(this.contest != null && this.contest.calendar !=null )
        {
          console.log("here");
          this.today = new Date();
          this.seconds_differ =  (new Date(this.contest.calendar).getTime() - this.today.getTime() )/ 1000;
          this.progress = this.seconds_differ / this.hours_to_secs_24 *100;
          this.countdown();
        }
      },1000)
  }

  

}
