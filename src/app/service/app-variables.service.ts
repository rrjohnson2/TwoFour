import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalService } from './global.service';
import { Ticket } from '../interfaces/ticket';
import { LayoutModule } from '../layout/layout.module';
import { Contest } from '../models/contest';

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
  
}
