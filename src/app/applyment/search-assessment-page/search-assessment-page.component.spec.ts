///<reference path="../../../../node_modules/@angular/core/testing/fake_async.d.ts"/>
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SearchAssessmentPageComponent } from "./search-assessment-page.component";

import { setInputValue, dispatchEvent } from "../../../testing/testing-helper";
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';


describe('SearchAssessmentPageComponent', () => {
  let component: SearchAssessmentPageComponent;
  let fixture: ComponentFixture<SearchAssessmentPageComponent>;
  let routerService: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [CoreModule, SharedModule],
        declarations: [SearchAssessmentPageComponent],
        providers: [
          { provide: Router, useValue: new RouterStub() }
        ]
      })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssessmentPageComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to `prova/7sk0d88kw9` when `Buscar` button is clicked', async(() => {
    // Spy on service
    spyOn(routerService, 'navigate');
    // Change the input
    setInputValue(fixture, 'input', '7sk0d88kw9');
    dispatchEvent(fixture, 'button.search', 'click');

    fixture.whenStable().then(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['prova', '7sk0d88kw9'])
    });

  }));
});
