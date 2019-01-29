import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedContentComponent } from './approved-content.component';

describe('ApprovedContentComponent', () => {
  let component: ApprovedContentComponent;
  let fixture: ComponentFixture<ApprovedContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
