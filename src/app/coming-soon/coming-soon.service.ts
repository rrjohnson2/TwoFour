import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SeedMember } from './coming-soon.component';
import { seedUrl } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class ComingSoonService {

  constructor(private http: HttpClient) { }

  addToMailList(seed: SeedMember) {
    return this.http.post(
      seedUrl + "addToMailList",
      seed
    )
  }
}
