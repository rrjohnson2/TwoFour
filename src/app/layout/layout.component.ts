import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  
  constructor() { }

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

}
