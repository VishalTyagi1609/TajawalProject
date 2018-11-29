import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router:Router){}
  //constructor(private user: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Auth called')
    console.log('Auth called>'+localStorage.getItem('loginStatus'))
    if(localStorage.getItem('loginStatus')=='true'){
        return true;
    }
    else
    this.router.navigate(['/']);
      //return false;
  }
}
