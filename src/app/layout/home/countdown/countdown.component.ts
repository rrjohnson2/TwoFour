import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input() time:Date;
  @Input() progress;
  @Input() subs;
  @Input() winner;
  @Input() description;
  @Output() reload:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  refresh_contest(){
    this.reload.emit(null);
  }


}
