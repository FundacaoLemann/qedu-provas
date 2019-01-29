import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixInfoComponent } from './matrix-info.component';

describe('MatrixInfoComponent', () => {
  let component: MatrixInfoComponent;
  let fixture: ComponentFixture<MatrixInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
