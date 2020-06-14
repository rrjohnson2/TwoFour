import { Component, OnInit, Input } from '@angular/core';
import {  faFacebook, faTwitter,faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() placeholder =false;
  facebook = faFacebook;
  instagram = faInstagram;
  twitter = faTwitter;
  constructor() { }

  ngOnInit(): void {
  }

}
