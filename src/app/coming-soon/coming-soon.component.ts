import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComingSoonService } from './coming-soon.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit, AfterViewInit {

  player: HTMLAudioElement;
  emailForm: FormGroup;
  msg: string;
  constructor(private soonServirce: ComingSoonService) { }

  ngAfterViewInit(): void {
    this.player = <HTMLAudioElement>document.getElementById("audioplayer");
  }

  ngOnInit(): void {

    this.emailForm = new FormGroup(
      {
        email: new FormControl(null, Validators.required),
        loop: new FormControl(true),
        blumorel: new FormControl(true)
      }
    )
  }
  volume(slider: MatSliderChange) {

    this.player.volume = slider.value / 100;
  }
  submit() {
    let loop = this.emailForm.get("loop").value;
    let blumorel = this.emailForm.get("blumorel").value;
    let res = "both";

    if (loop && !blumorel) {
      res = "loop"
    }
    if (blumorel && !loop) {
      res = "blumorel";
    }
    var seed: SeedMember = {
      email: this.emailForm.get("email").value,
      reason: res
    }

    this.soonServirce.addToMailList(seed).subscribe(
      data => {
        this.msg = "";
        this.emailForm.reset();
      },

      error => {
        this.msg = "Something Wnet Wrong Try Again";
      }
    )
  }


}

export interface SeedMember {
  email: string,
  reason: string;
}
