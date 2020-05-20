import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isSmallScreen } from '../constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  
  

  constructor() { 
    
  }

  container_or_fluid() {

    if(isSmallScreen) return "container-fluid"
    return "container"
  }
}
