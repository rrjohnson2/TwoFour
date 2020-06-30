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
  sub;
  constructor(private variables: AppVariablesService,
     private adminS: AdminService,
      private homeServ: HomeService,
      ) { }

  ngOnInit(): void {
    this.adminS.getWinner().subscribe(
      data => {
        this.renderSrc(this.subToEntry(<any>data))
      }
    );
  }
  subToEntry(backup: Submission): any {
    let sub: Entry = {
      url: backup.content_url,
      type: backup.content_type,
      description: backup.description,
      member: backup.member,
      extension: backup.content_extension
    }
    return sub;
  }

  renderSrc(sub: Entry) {
   if(sub.url) 
   {
     this.homeServ.getSubmission(sub.url+sub.extension).subscribe(
      data => {
       sub.file = URL.createObjectURL(data);
       this.sub = sub
      },
      error =>{
          sub.type ='image';
          sub.file = "assets/icons/failed.jpg"
          this.sub=sub;
      }
    )
   }
   else{
     this.sub = sub;
   }
    
  }
  approveWinner() {
    this.adminS.approveWinner().subscribe(
      data =>
      {
        var alert_ticket: AlertTicket = { action_attempted: Actions.submit, msg: 'Selected', type: 'success' };

        this.variables.addAlert(alert_ticket);
      }
    )
  }

  forceWinner(){
    this.adminS.forceWinner().subscribe(
      data =>{
        this.renderSrc(this.subToEntry(<any>data));
      }
    )
  }


}
export interface Entry {
  description: string;
  member: Member;
  url: string;
  type: string,
  file?: any,
  extension:string
}





