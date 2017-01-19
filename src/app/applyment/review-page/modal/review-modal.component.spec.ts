/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewModalComponent } from './review-modal.component';
import { dispatchEvent } from '../../../../testing/form-helper';
import { RouterStub } from '../../../../testing/router-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../../testing/activated-route-stub';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;
  let router: Router;
  let route = new ActivatedRouteStub();
  route.testParams = { uuid: '1' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ReviewModalComponent],
        providers: [
          { provide: ActivatedRoute, useValue: route},
          { provide: Router, useClass: RouterStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewModalComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClose when click on cancel button', () => {
    spyOn(component.onClose, 'emit');
    dispatchEvent(fixture, '[close-button]', 'click');
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should redirect to congratulations screen on click', () => {
    spyOn(router, 'navigate');
    dispatchEvent(fixture, '[finishButton]', 'click');
    expect(router.navigate).toHaveBeenCalledWith(['prova', '1', 'parabens']);
  });
});
