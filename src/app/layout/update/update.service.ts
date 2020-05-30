import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/app/interfaces/ticket';
import { backendUrl } from 'src/app/constants/app.constant';
import { Member } from 'src/app/models/member';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  
  

  constructor(private http:HttpClient) { }


  updatePassword(ticket:Ticket) {
    return this.http.post(backendUrl+"updatePassword",ticket);
  }
  update(temp:Member) {
    return this.http.post(backendUrl+"update",temp);
  }
}
