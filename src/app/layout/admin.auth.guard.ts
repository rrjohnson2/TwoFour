import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AppVariablesService } from '../service/app-variables.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot;
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private router: Router, private appVariables: AppVariablesService) { }

  canActivate() {
    if (this.appVariables.current_member.role != "admin") {

      this.router.navigate(['/layout/home']);
      return false;
    }
    else {
      return true;
    }
  }


}
