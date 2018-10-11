import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixSearchPageComponent } from './matrix-search-page.component';

describe('MatrixSearchPageComponent', () => {
  let component: MatrixSearchPageComponent;
  let fixture: ComponentFixture<MatrixSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
