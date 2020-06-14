import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Member } from 'src/app/models/member';
import { Submission } from 'src/app/interfaces/submission';
import { Actions } from 'src/app/constants/app.constant';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { AdminService } from './admin.service';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';
import { HomeService } from '../home/home.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  facebook = faFacebook;
  instagram = faInstagram;
  twitter = faTwitter;
  isLinear = false;
  subs = [];
  constructor(private variables: AppVariablesService, private adminS: AdminService, private homeServ: HomeService) { }

  ngOnInit(): void {
    this.variables.currentContest_ob.subscribe(
      data => {
        if (data != null) {

          if (data.winner != null) {
            let winner: Entry = this.dataToEntry(data, true);

            this.renderSrc(winner);
          }
        }
      }
    );

    this.adminS.getBackups().subscribe(
      data => {
        var res = <any>data;
        res.forEach(element => {
          this.renderSrc(this.subToEntry(element))
        });
      }
    )
  }
  subToEntry(backup: Submission): any {
    let sub: Entry = {
      url: backup.content_url,
      type: backup.content_type,
      description: backup.description,
      member: backup.member,
      winner: false,
      id: backup.id
    }
    return sub;
  }


  dataToEntry(data, winner) {
    let sub: Entry = {
      url: data.winning_content_url,
      type: data.winning_content_type,
      description: data.winning_description,
      member: data.winner,
      winner: winner
    }
    return sub;
    
  }

  renderSrc(sub: Entry) {
   if(sub.url) 
   {
     this.homeServ.getSubmission(sub.url).subscribe(
      data => {
       sub.file = URL.createObjectURL(data);
       this.subs.push(sub)
      },
      error =>{
          sub.type ='image';
          sub.file = "assets/icons/failed.jpg"
          this.subs.push(sub);
      }
    )
   }
   else{
     this.subs.push();
   }
    
  }
  choose(i: Entry = null) {
    var index;
    if (i.winner) {
      index = -1;
    }
    else {
      index = i.id;
    }

    this.adminS.choose(index).subscribe(
      data => {
        var alert_ticket: AlertTicket = { action_attempted: Actions.signup, msg: `${i.description} was choosen`, type: 'success' };

        this.variables.addAlert(alert_ticket);
      },
      error => {
        var alert_ticket: AlertTicket = { action_attempted: Actions.signup, msg: 'Did Not Work', type: 'danger' };

        this.variables.addAlert(alert_ticket);
      }
    )
  }


}
export interface Entry {
  description: string;
  member: Member;
  url: string;
  type: string;
  winner: boolean,
  id?: number
  file?: any
}





