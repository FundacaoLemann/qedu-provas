import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NoConnectionModalComponent } from './no-connection-modal.component';

describe('NoConnectionModalComponent', () => {
  let component: NoConnectionModalComponent;
  let fixture: ComponentFixture<NoConnectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConnectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoConnectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClose when clicked', async(() => {
    spyOn(component.onClose, 'emit');

    fixture.debugElement.query(By.css('[close]')).nativeElement.click();

    expect(component.onClose.emit).toHaveBeenCalled();
  }));
});
