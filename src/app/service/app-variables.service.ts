import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalService } from './global.service';
import { Ticket } from '../interfaces/ticket';
import { LayoutModule } from '../layout/layout.module';
import { Contest } from '../models/contest';
import { IAlert,Type } from '../layout/alert-manager/alert-manager.component';
import { AlertTicket } from '../interfaces/alert-ticket';

@Injectable({
  providedIn: 'root'
})
export class AppVariablesService {

  current_member_id:string = localStorage.getItem("current_member_id");
  current_member_encrypted_password:string = localStorage.getItem("current_member_encrypted_password");
  current_member:Member;
  current_member_bs:BehaviorSubject<Member> = new BehaviorSubject<Member>(this.current_member);
  current_member_ob:Observable<Member> = this.current_member_bs.asObservable();

  currentContest:Contest;
  currentContest_bs:BehaviorSubject<Contest> = new BehaviorSubject<Contest>(this.currentContest);
  currentContest_ob:Observable<Contest> =  this.currentContest_bs.asObservable();

  temp_member:Member
  temp_ticket:Ticket;


  alerts:IAlert[]=[]
  alerts_bs:BehaviorSubject<IAlert[]> = new BehaviorSubject<IAlert[]>(this.alerts);
  alerts_ob: Observable<IAlert[]> = this.alerts_bs.asObservable();

  private count = 0;
  private popup =5000;

  private types =
  {
      success:{
       icon: 'ni ni-like-2',
       strong: 'Success!',
      },
      danger:{
        icon: 'ni ni-support-16',
        strong: 'Danger!',
       },
       info:{
        icon: 'ni ni-bell-55',
        strong: 'Info!',
       },
       warning:{
        icon: 'ni ni-bell-55',
        strong: 'Warning!',
       }

  }
  

  

  

 

  constructor(private glob:GlobalService) {
   }

  setup()
  {
    if(this.current_member_id !=null )
    {
      var ticket:Ticket={
        id: this.current_member_id,
        data: this.decrypt(this.current_member_encrypted_password)
      }
      this.glob.login(ticket).subscribe(data=>{
        this.fillMember(<Member>data,ticket)
      })
    }

    this.reload_contest()
  }
  reload_contest() {
    console.log("here");
    this.glob.getContest().subscribe(data=>{
      this.populateContest(data);
  })
  }
  

  encrypt(value)
  {
    var res = value;
    // encrypt
    return res;
    
  }
  decrypt(value)
  {
    var res =value ;
    // decrypt
    return res;
  }
  fillMember(mem:Member,ticket:Ticket)
  {
        this.current_member_id = ticket.id;
        localStorage.setItem("current_member_id", ticket.id);
        localStorage.setItem("current_member_encrypted_password", this.encrypt(ticket.data));   
         
        this.reloadBS(mem);


  }
  
  reloadBS(mem:Member)
  {
    this.current_member = mem;
    this.current_member_bs.next(mem);
  }
  logOff()
  {
    this.current_member_id = null;
    localStorage.removeItem("current_member_id");
    localStorage.removeItem("current_member_encrypted_password");  
    this.temp_member = null
    this.temp_ticket= null;
    this.reloadBS(null);
  }

  populateContest(data)
  {
      this.currentContest= data;
      this.currentContest_bs.next(data);
  }

  add(alert_ticket:AlertTicket)
  {
      var type:Type ;
      switch (alert_ticket.type) {
        case "success":
            type= this.types.success
          break;
        case "info":
          type= this.types.info
        break;
        case "warning":
          type= this.types.warning
        break;
        case "danger":
          type= this.types.danger
        break;
      
        default:
          break;
      }
      
      var alert:IAlert = {
        id: this.count,
        message:alert_ticket.msg,
        strong:type.strong,
        icon:type.icon,
        type:alert_ticket.type
      };
      this.alerts.push(alert);
      setTimeout(
        ()=>
        {
          this.close(alert);
        },
        this.popup
      );
  }

  close(alert: IAlert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  
}
