import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backendUrl } from 'src/app/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }


  choose(choice)
  {
    return this.http.post(backendUrl+"chooseWinner",choice);
  }
  getBackups()
  {
    return this.http.get(backendUrl+"getBackups");
  }
  
}
