import { Component, OnInit } from '@angular/core';
import { UIService } from '../service/ui.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  
  constructor(private ui:UIService) { }

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

}
