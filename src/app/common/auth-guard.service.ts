import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
    ) {
    // this.navigationURL = state.url;
    if(sessionStorage.getItem('token') && sessionStorage.length > 0){
      return true
    }else{
      this._router.navigateByUrl('/login');
      return false
    }

  }
}
