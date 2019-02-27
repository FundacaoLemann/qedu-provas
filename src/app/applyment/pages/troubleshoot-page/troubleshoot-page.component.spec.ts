import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../../../app.module';
import { TroubleshootPageComponent } from './troubleshoot-page.component';

describe('TroubleshootPageComponent', () => {
  let component: TroubleshootPageComponent;
  let fixture: ComponentFixture<TroubleshootPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule,
          RouterTestingModule.withRoutes([])
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleshootPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
