import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Contest } from 'src/app/models/contest';

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
  constructor(private variables:AppVariablesService) { }

  ngOnInit(): void {
    this.variables.currentContest_ob.subscribe(data=> {
      this.contest = data
    });

    this.countdown();
    
  }

  countdown()
  {
      setInterval(()=>{
        if(this.seconds_differ < 0) return;
        this.today = new Date();
        this.seconds_differ =  (new Date(this.contest.calendar).getTime() - this.today.getTime() )/ 1000;
        this.progress = this.seconds_differ / this.hours_to_secs_24 *100;
        console.log("here")
      },1000)
  }

}
