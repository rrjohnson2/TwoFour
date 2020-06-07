import { Component, OnInit } from '@angular/core';
import { AppVariablesService } from 'src/app/service/app-variables.service';
import { Member } from 'src/app/models/member';
import { Submission } from 'src/app/interfaces/submission';
import { image_server_url, Actions } from 'src/app/constants/app.constant';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { AdminService } from './admin.service';
import { AlertTicket } from 'src/app/interfaces/alert-ticket';


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
  constructor(private variables: AppVariablesService, private adminS: AdminService) { }

  ngOnInit(): void {
    this.variables.currentContest_ob.subscribe(
      data => {
        if (data != null) {

          if (data.winner != null) {
            let winner: Entry = this.dataToEntry(data, true);

            this.subs.push(winner);
          }
        }
      }
    );

    this.adminS.getBackups().subscribe(
      data =>{
        var res = <any> data;
        res.forEach(element => {
            this.subs.push(this.subToEntry(element))
        });
      }
    )
  }
  subToEntry(backup: Submission): any {
    return {
      url: backup.content_url,
      type: backup.content_type,
      description: backup.description,
      member: backup.member,
      winner: false,
      id: backup.id,
    }
  }


  dataToEntry(data, winner) {
    return {
      url: data.winning_content_url,
      type: data.winning_content_type,
      description: data.winning_description,
      member: data.winner,
      winner: winner
    }
  }

  renderSrc(sub: Entry) {
    return image_server_url + "getSubmission?sub=" + sub.url;
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
}





