import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap, Params,
  Router,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';

import { ItemPageComponent } from './item-page.component';
import { ValidationModule } from '../../validation.module';
import { ApplymentService } from '../../../applyment/shared/applyment.service';
import { StoreService } from '../../../core/services/store.service';
import { ValidationStateService } from '../../services/validation-state.service';
import { MatrixFixture } from '../../../../testing/fixtures/matrix-fixture';
import { Matrix } from '../../../shared/model/matrix';

@Component({
  template: '<div>none</div>',
})
class StubComponent {}

describe('ItemPageComponent', () => {
  let component: ItemPageComponent;
  let fixture: ComponentFixture<ItemPageComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let location: Location;
  let stateService: ValidationStateService;
  let params: Params;
  let paramMap$: BehaviorSubject<ParamMap>;
  let matrixMock: Matrix;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StubComponent],
      imports: [
        ValidationModule,
        RouterTestingModule.withRoutes([
          { path: 'validacao', component: StubComponent },
        ]),
      ],
      providers: [ApplymentService, StoreService],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    route = TestBed.get(ActivatedRoute);
    stateService = TestBed.get(ValidationStateService);

    params = { 'id': 'abc', 'itemIndex': '1' };
    paramMap$ = new BehaviorSubject(convertToParamMap(params));
    matrixMock = MatrixFixture.get();

    spyOn(router, 'navigateByUrl');
    spyOn(router, 'navigate');
    spyOnProperty(route, 'paramMap', 'get').and.returnValue(paramMap$.asObservable());
    spyOnProperty(stateService, 'state', 'get').and.returnValue({ matrix: matrixMock });

    fixture = TestBed.createComponent(ItemPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirects when matrix is empty', () => {
    component.ngOnInit();
    expect(router.navigateByUrl).not.toHaveBeenCalledWith('/validacao');
  });

  it('binds data correctly', () => {
    expect(component.matrix).toEqual(matrixMock);
    expect(component.itemsLength).toEqual(matrixMock.items.length);
    expect(component.title).toEqual(matrixMock.title);
  });

  it(
    'update props on url change',
    fakeAsync(() => {
      paramMap$.next(convertToParamMap({ ...params, 'itemIndex': '2' }));
      tick();
      expect(component.currentItem).toEqual(matrixMock.items[1]);
      expect(component.currentItemIndex).toEqual(2);
    }),
  );
});
