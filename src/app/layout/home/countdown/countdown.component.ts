import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input() time;
  @Input() progress;
  @Input() subs;
  @Input() winner;
  constructor() { }

  ngOnInit(): void {
  }

  getSplitTime(pos)
  {
    const intervals = [
      3600,60,1
    ];
        

        var val = this.time;
        var place = 0;
        var times = [];
        // tslint:disable-next-line: align
        while(val > 0 && place < intervals.length)
        {
           var  amount = val/intervals[place]

           val = val - Math.floor(amount)*intervals[place];
           times.push(amount);
           place++;
        }
      for(const i in times)
      {
          times[i] = Math.floor(times[i]);
          if(times[i]<10) times[i] = "0"+times[i];
      }
      
      if(times[pos]== undefined) return "00";
      return times[pos];
  }

}
