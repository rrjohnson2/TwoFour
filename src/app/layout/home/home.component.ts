import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Contest } from 'src/app/models/contest';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  progress:number;
  contest:Contest;
  today:Date = new Date();
  hours_to_secs_24 :number = 86400;
  seconds_differ: number=86399;
  reloading=false
  constructor(private variables:AppVariablesService, private glob :GlobalService) { }

  ngOnInit(): void {
    this.init();
    
  }
  init()
  {
    this.variables.currentContest_ob.subscribe(data=> {
      this.contest = data
      this.countdown();
      this.reloading=false;
    });
  }

  countdown()
  {
     var interval = setInterval(()=>{
        if(this.seconds_differ <= 0 && !this.reloading) {
          this.reloading = true;
          this.glob.getContest().subscribe(data=>{
          this.variables.populateContest(data);
          clearInterval(interval);
          this.seconds_differ=86399;
          })
          return
        }
        else if(!this.reloading)
        {
          this.today = new Date();
          this.seconds_differ =  (new Date(this.contest.calendar).getTime() - this.today.getTime() )/ 1000;
          this.progress = this.seconds_differ / this.hours_to_secs_24 *100;
        }
      },1000)
  }

}
