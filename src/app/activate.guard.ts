import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export default class ActivateGuard implements CanActivate {

  private can = false;

  constructor(private router: Router) {
  }

  canActivate() {
    console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (!this.can) {
      this.router.navigate(['/login']);
      alert('Please, log in to continue');
      return false;
    }

    return true;
  }

  setCanActivate(can) {
    this.can = can;
  }
}
