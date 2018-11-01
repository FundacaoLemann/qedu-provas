import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterGuardService } from './router-guard.service';
import { ValidationStateService } from './validation-state.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

describe('RouterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouterGuardService,
        ValidationStateService,
        { provide: Router, useValue: {navigateByUrl: () => {}}},
        { provide: ActivatedRouteSnapshot, useValue: {}},
        { provide: RouterStateSnapshot, useValue: {}},
      ],
    });
  });

  it('should be created', inject(
    [RouterGuardService],
    (service: RouterGuardService) => {
      expect(service).toBeTruthy();
    },
  ));

  it('redirects when matrix is empty', inject(
    [RouterGuardService, RouterStateSnapshot, ActivatedRouteSnapshot, Router],
    (
      service: RouterGuardService,
      routerSnapshot: RouterStateSnapshot,
      routeSnapshot: ActivatedRouteSnapshot,
      router: Router,
    ) => {
      spyOn(router, 'navigateByUrl');
      const activated = service.canActivate(routeSnapshot, routerSnapshot);

      expect(activated).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/validacao');
    },
  ));
});
