import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'count_time'
})
export class CountTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const intervals = [
      3600,60,1
    ];
        

        var val = value;
        var place = 0;
        var time = [];
        while(val > 0 && place < intervals.length)
        {
           var  amount = val/intervals[place]

           val = val - Math.floor(amount)*intervals[place];
           time.push(amount);
           place++;
        }
      for(const i in time)
      {
        
        time[i] = Math.floor(time[i]);
        if(time[i]== undefined) time[i] = "00";
        if(time[i]<10) time[i] = "0"+time[i];
      }
        
      return `${time[0]}:${time[1]}:${time[2]}`
  }

}
