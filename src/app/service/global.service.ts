import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Ticket } from '../interfaces/ticket';
import { backendUrl } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }

  login(ticket:Ticket)
  {
      return this.http.post(backendUrl+"login",ticket);
  }

}
