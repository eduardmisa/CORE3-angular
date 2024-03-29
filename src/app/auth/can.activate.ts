import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { IsServer } from 'src/helpers/processHelper';


@Injectable()
export class AuthGuardService implements CanActivate  {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (IsServer()) {
      return true
    }

    let cookieObject = (Object as any).fromEntries(document.cookie.split(/; */).map(c => {
        const [ key, ...v ] = c.split('=');
        return [ key, decodeURIComponent(v.join('=')) ];
    }));

    let token = cookieObject.access_token

    if (!token) {
      this.router.navigateByUrl(`/login`)
      return false;
    }
    
    return true;
  }
} 