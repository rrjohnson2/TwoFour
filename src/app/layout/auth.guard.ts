import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot;
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private router: Router) { }

  canActivate() {
    // if(false)
    // {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // else{
    //   return true;
    // }
    return true;
  }


}
