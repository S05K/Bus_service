import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

  constructor(private service:UserService,private router: Router) {}
  canActivate(): boolean {
    if(this.service.isUserRegistered())
    {
      return true;
    }
    else{
      this.router.navigate([''])
      return false;
    }
  }

}
