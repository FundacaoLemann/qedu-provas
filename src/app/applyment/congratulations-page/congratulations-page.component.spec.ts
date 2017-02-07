import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
// App
import { CongratulationsPageComponent } from './congratulations-page.component';
import { ApplymentModule } from '../applyment.module';
import * as test from '../../../testing/testing-helper';

describe('CongratulationsPageComponent', () => {
  let component: CongratulationsPageComponent;
  let fixture: ComponentFixture<CongratulationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          ApplymentModule,
          RouterTestingModule.withRoutes([])
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('redirect to home', () => {
    const el = test.getNativeElement(fixture, 'a[continue]');
    expect(el.attributes.href.value).toEqual('/');
  });

});
