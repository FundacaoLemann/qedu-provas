import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLogosComponent } from './page-logos.component';
import { ApplymentModule } from '../../applyment.module';
import { By } from '@angular/platform-browser';

const db = require('../../../../../mock/db.json');

describe('PageLogosComponent', () => {
  let component: PageLogosComponent;
  let fixture: ComponentFixture<PageLogosComponent>;
  const ASSESSMENT = db.assessments[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             imports: [ApplymentModule]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display department logo', () => {
    component.assessment = ASSESSMENT;
    component.ngOnChanges();
    fixture.detectChanges();
    const logoDepartmentEl = fixture.debugElement.query(By.css('.department-logo')).nativeElement;
    const logoSchoolEl = fixture.debugElement.query(By.css('.school-logo')).nativeElement;
    expect(logoDepartmentEl.src).toEqual(ASSESSMENT.department.image);
    expect(logoSchoolEl.src).toEqual(ASSESSMENT.school.image);
  });
});
