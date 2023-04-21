import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token')){
        return true;
      }
      else if (!this.authService.userID) {
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }
    }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem('token')){
      return true;
    }
    else if (!this.authService.userID) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }

  }
}
