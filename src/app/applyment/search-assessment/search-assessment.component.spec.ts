/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchAssessmentComponent } from './search-assessment.component';
import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stub';
import { SharedModule } from '../../shared/shared.module';


describe('SearchAssessmentComponent', () => {
  let component: SearchAssessmentComponent;
  let fixture: ComponentFixture<SearchAssessmentComponent>;
  let routerService: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ SearchAssessmentComponent ],
      providers: [
        { provide: Router, useValue: new RouterStub() }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAssessmentComponent);
    component = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should navigate to `prova/7sk0d88kw9` when `Buscar` button is clicked', (done) => {
    // Spy on service
    spyOn(routerService, 'navigate');
    // Change the input
    let input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '7sk0d88kw9';
    input.dispatchEvent(new Event('input'));
    console.log(component.uuid);
    fixture.detectChanges();
    // Listen to button click and evaluate the test
    let button = fixture.debugElement.query(By.css('button.search')).nativeElement;
    button.addEventListener('click', () => {
      expect(routerService.navigate).toHaveBeenCalledWith(['prova', '7sk0d88kw9']);
      done();
    });
    button.dispatchEvent(new Event('click'));
  });
});
