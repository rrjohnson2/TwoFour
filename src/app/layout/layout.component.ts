import { Component, OnInit } from '@angular/core';
import { UIService } from '../service/ui.service';
import { AppVariablesService } from '../service/app-variables.service';
import { Member } from '../models/member';
import { UpdateComponent } from './update/update.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  member:Observable<Member>= new Observable<Member>();
  init_boolean =false;
  constructor(private router:Router, private ui:UIService,private variables:AppVariablesService) { }

  ngOnInit(): void {
    this.init();
  }
  init(){
      if(!this.init_boolean)
      {
        this.variables.setup();
        this.getMember();
        this.init_boolean=true;
      }
  }
  toggle(sidenav){
    if(sidenav.opened)
    {
      sidenav.close();
    }
    else{
      sidenav.open();
    }
  }
  get render_class()
  {
    return  this.ui.container_or_fluid();
  }
  getMember(){
      this.member = this.variables.current_member_ob;
  }
  onActivate(event)
  {
    if(event instanceof UpdateComponent)
    {
      this.init();
      var thing = <UpdateComponent> event;
      this.member.subscribe(data=> thing.member=data);
    }
  }
  logOff()
  {
    this.variables.logOff()
  }

}