import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ConnectionStatusComponent } from '../shared/connection-status/connection-status.component';
import { ConnectionService } from '../shared/connection.service';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { StoreService } from '../shared/store.service';

const mockStudent = require('../../../../mock/db.json').students[0];

describe('ReviewPageComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: StoreService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      declarations: [
        HeaderComponent,
        ConnectionStatusComponent
      ],
      providers: [
        ConnectionService,
        StoreService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Services
    store = fixture.debugElement.injector.get(StoreService);
    store.setState({ applyment: { student: mockStudent } });

    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get student data from service', () => {
    expect(component.student).toEqual(store.state.applyment.student);
  });

  it('should display student name', () => {
    const name = fixture.debugElement.query(By.css('[studentName]'));
    expect(name.nativeElement.textContent.trim()).toEqual(mockStudent.name);
  });

  it('should display student matricula', () => {
    const matricula = fixture.debugElement.query(By.css('[studentMatricula]'));
    expect(matricula.nativeElement.textContent.trim()).toEqual(mockStudent.matricula);
  });

  it('should display student class', () => {
    const klass = fixture.debugElement.query(By.css('[studentClass]'));
    expect(klass.nativeElement.textContent.trim()).toEqual(mockStudent.class);
  });

});
