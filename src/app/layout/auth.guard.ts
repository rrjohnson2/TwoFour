import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AppVariablesService } from '../service/app-variables.service';

@Injectable()
export class AuthGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot;
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private router: Router,private appVariables:AppVariablesService) { }

  canActivate() {
    if(localStorage.getItem("current_member_id")==null)
    {
      this.router.navigate(['/login']);
      return false;
    }
    else{
      return true;
    }
  }


}
