/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructionsModalComponent } from './instructions-modal.component';
import { ApplymentModule } from '../applyment.module';
import { dispatchEvent } from '../../../testing/form-helper';
import { RouterStub } from '../../../testing/router-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';


describe('InstructionsModalComponent', () => {
  let component: InstructionsModalComponent;
  let fixture: ComponentFixture<InstructionsModalComponent>;
  let router: RouterStub;

  beforeEach(async(() => {
    let routerStub = new ActivatedRouteStub();
    routerStub.testParams = { uuid: '1'};

    TestBed.configureTestingModule({
        imports: [ApplymentModule],
        providers: [
          { provide: Router, useValue: new RouterStub() },
          { provide: ActivatedRoute, useValue: routerStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsModalComponent);
    component = fixture.componentInstance;

    router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to question page when button clicked', () => {
    dispatchEvent(fixture, '[confirm]', 'click');
    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'questao', '1']);
  });
});
