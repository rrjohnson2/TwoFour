import { Component, OnInit } from '@angular/core';
import { UIService } from '../service/ui.service';
import { AppVariablesService } from '../service/app-variables.service';
import { Member } from '../model/member';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  member:Member
  constructor(private ui:UIService,private variables:AppVariablesService) { }

  ngOnInit(): void {
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
      this.variables.current_member_ob.subscribe(
        data =>
        {
            this.member = data;
        }
      )
  }
  onActivate(event)
  {
    if(event instanceof UpdateComponent)
    {
      var thing = <UpdateComponent> event;

      thing.member = this.member;
    }
  }

}
