import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private routee: Router) {
  }
  canActivate(): boolean  {
    if (this._auth.isAutenticate()) {
      return true;
    } else {
      this.routee.navigateByUrl('/login');
      return false;
    }
  }

}
