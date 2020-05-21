import { Component, OnInit } from '@angular/core';
import { UIService } from '../service/ui.service';
import { AppVariablesService } from '../service/app-variables.service';
import { Member } from '../model/member';
import { UpdateComponent } from './update/update.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  member:Observable<Member>;
  constructor(private ui:UIService,private variables:AppVariablesService) { }

  ngOnInit(): void {
    this.getMember()
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
      var thing = <UpdateComponent> event;

      this.member.subscribe(data=> thing.member=data);
    }
  }

}
