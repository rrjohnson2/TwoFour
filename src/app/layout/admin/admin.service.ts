import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }


  approveWinner()
  {
    return this.http.get(backendUrl+"approveWinner");
  }
  getWinner()
  {
    return this.http.get(backendUrl+"getWinner");
  }
  forceWinner()
  {
    return this.http.get(backendUrl+"forceWinner");
  }
  
}
