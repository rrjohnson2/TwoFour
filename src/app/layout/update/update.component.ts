import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Member } from 'src/app/model/member';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  member:Member 
  constructor() { }

  ngOnInit(): void {
  }

}
