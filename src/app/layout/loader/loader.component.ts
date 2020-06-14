import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show:boolean;
  constructor(private loaderServe:LoaderService) { }

  ngOnInit(): void {
    this.loaderServe.loaderOB.subscribe(data => this.show = data);
  }

}
