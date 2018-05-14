import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewModalComponent } from './review-modal.component';
import { dispatchEvent } from '../../../../../testing/testing-helper';
import { RouterStub } from '../../../../../testing/router-stub';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../../../../testing/activated-route-stub';
import { By } from '@angular/platform-browser';

describe('ReviewModalComponent', () => {
  let component: ReviewModalComponent;
  let fixture: ComponentFixture<ReviewModalComponent>;
  let router: Router;
  const route = new ActivatedRouteStub();
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
    spyOn(component.onCancel, 'emit');
    dispatchEvent(fixture, '[close-button]', 'click');
    expect(component.onCancel.emit).toHaveBeenCalled();
  });

  it('should emit onConfirm', async(() => {
    spyOn(component.onConfirm, 'emit');

    fixture.debugElement.query(By.css('[finishButton]')).nativeElement.click();
    expect(component.onConfirm.emit).toHaveBeenCalled();
  }));
});
