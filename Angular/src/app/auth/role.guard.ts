import { Injectable } from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot
   ): boolean {
    //this will be passed from the route config
    // on the data property

    if (
      !this.userService.isLoggedIn() ||
      !this.userService.isAdmin()
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
}


