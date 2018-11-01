import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { StoreService } from '../../core/services/store.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        StoreService,
        { provide: Router, useValue: { navigateByUrl: () => {} } },
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ],
    });
  });

  it('should be created', inject(
    [AuthGuardService],
    (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    },
  ));


  it('redirects when matrix is empty', inject(
    [AuthGuardService, RouterStateSnapshot, ActivatedRouteSnapshot, Router],
    (
      service: AuthGuardService,
      routerSnapshot: RouterStateSnapshot,
      routeSnapshot: ActivatedRouteSnapshot,
      router: Router,
    ) => {
      spyOn(router, 'navigateByUrl');
      const activated = service.canActivate(routeSnapshot, routerSnapshot);

      expect(activated).toEqual(false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('');
    },
  ));
});
