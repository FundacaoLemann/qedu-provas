import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared/shared.module';
import { MatrixSearchPageComponent } from './matrix-search-page.component';
import { AssessmentService } from '../../core/services/assessment.service';

describe('MatrixSearchPageComponent', () => {
  let component: MatrixSearchPageComponent;
  let fixture: ComponentFixture<MatrixSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [AssessmentService,],
      declarations: [ MatrixSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
