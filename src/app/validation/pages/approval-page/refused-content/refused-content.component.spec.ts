import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusedContentComponent } from './refused-content.component';

describe('RefusedContentComponent', () => {
  let component: RefusedContentComponent;
  let fixture: ComponentFixture<RefusedContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefusedContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
