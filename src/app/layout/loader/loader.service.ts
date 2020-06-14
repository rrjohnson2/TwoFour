import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader:boolean=false;
  private loaderBS:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loader);
  loaderOB:Observable<boolean> = this.loaderBS.asObservable();

  constructor() { }

  showOrHide(choice:boolean)
  {
    this.loader = choice;
    this.loaderBS.next(this.loader);
  }
}
