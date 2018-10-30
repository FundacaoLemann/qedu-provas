import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ValidationStateService } from './validation-state.service';

@Injectable({
  providedIn: 'root',
})
export class RouterGuardService implements CanActivate {
  constructor(
    private stateService: ValidationStateService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.stateService.state.matrix) {
      return true;
    }

    this.router.navigateByUrl('/validacao');
    return false;
  }
}
