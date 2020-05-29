import { Component, OnInit, Input } from '@angular/core';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { AppVariablesService } from 'src/app/service/app-variables.service';

@Component({
  selector: 'app-alert-manager',
  templateUrl: './alert-manager.component.html',
  styleUrls: ['./alert-manager.component.scss']
})
export class AlertManagerComponent implements OnInit {

  
  @Input()
  public alerts: Array<IAlert> = [];
  

  ngOnInit(): void {
    this.variable.alerts_ob.subscribe(data=>{
      this.alerts = data;
    })
  }
  constructor(private variable:AppVariablesService) {
      
  }

  close(alert: IAlert) {
    this.variable.closeAlert(alert)
  }
  
}

export interface IAlert {
  id: number;
  type: string;
  strong?: string;
  message: string;
  icon?: string;
}

export interface Type {
  strong?: string;
  icon?: string;
}

