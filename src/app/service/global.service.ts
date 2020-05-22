import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket';
import { backendUrl } from '../constants/app.constant';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }

  login(ticket:Ticket)
  {
      return this.http.post(backendUrl+"login",ticket);
  }
  generateCode(mem:Member)
  {
     return this.http.post(backendUrl+"generateCode",mem);
  }
  authenticate(ticket:Ticket)
  {
      return this.http.post(backendUrl+"authenticateCode",ticket);
  }

}
