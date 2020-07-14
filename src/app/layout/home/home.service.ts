import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { image_server_url } from 'src/app/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }


  getSubmission(sub: string) {
    
    return this.http.get(`${image_server_url}download`, {
      headers: { 'Content-type': 'application/json' },
      responseType:'blob', 
      params: { content: sub } 
    });
  }
}
