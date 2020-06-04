import { Component, OnInit } from '@angular/core';
import { UIService } from '../service/ui.service';
import { AppVariablesService } from '../service/app-variables.service';
import { Member } from '../models/member';
import { UpdateComponent } from './update/update.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  member: Observable<Member> = new Observable<Member>();
  init_boolean = false;
  constructor(private router: Router, private ui: UIService, private variables: AppVariablesService) { }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.getMember();
  }
  toggle(sidenav) {
    if (sidenav.opened) {
      sidenav.close();
    }
    else {
      sidenav.open();
    }
  }
  get render_class() {
    return this.ui.container_or_fluid();
  }
  getMember() {
    this.member = this.variables.current_member_ob;
  }
  onActivate(event) {
    if (event instanceof UpdateComponent) {
      this.init();
      let thing = <UpdateComponent>event;
      this.member.subscribe(data => console.log());
    }
  }
  logOff() {
    this.variables.logOff()
    this.router.navigate(['/layout/home/']);
  }

}
