import { Injectable } from '@angular/core';
import { Member } from '../model/member';
import { Observable, BehaviorSubject } from 'rxjs';
import { GlobalService } from './global.service';
import { Ticket } from '../interfaces/ticket';
import { LayoutModule } from '../layout/layout.module';

@Injectable({
  providedIn: 'root'
})
export class AppVariablesService {

  current_member_id:string = localStorage.getItem("current_member_id");
  current_member_encrypted_password:string = localStorage.getItem("current_member_encrypted_password");
  current_member:Member;
  current_member_bs:BehaviorSubject<Member> = new BehaviorSubject<Member>(this.current_member);
  current_member_ob:Observable<Member> = this.current_member_bs.asObservable();

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
  public reloadBS(mem:Member)
  {
    this.current_member = mem;
    this.current_member_bs.next(mem);
  }
  
}
