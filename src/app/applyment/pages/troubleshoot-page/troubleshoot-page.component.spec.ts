import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from '../../../app.module';
import { TroubleshootPageComponent } from './troubleshoot-page.component';

const browserMock = {
  name: 'Chrome',
  version: 73
};

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

    fixture = TestBed.createComponent(TroubleshootPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should display the browser name and version', async(() => {
    component.ngOnInit();
    fixture.detectChanges();

    const text = `Chrome 72 (navegador suportado)`;
    const title = fixture
      .debugElement
      .query(By.css('.troubleshoot-title'))
      .nativeElement
      .innerText;

    expect(title).toEqual(text);
  }));
});
