import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ConnectionStatusComponent } from '../shared/connection-status/connection-status.component';
import { ConnectionService } from '../shared/connection.service';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { ApplymentService } from '../../applyment/shared/applyment.service';
import { ApplymentModule } from '../../applyment/applyment.module';

const mockStudent = require('../../../../mock/db.json').students[0];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let applyment: ApplymentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApplymentModule
      ],
      providers: [
        ConnectionService,
        ApplymentService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Services
    applyment = fixture.debugElement.injector.get(ApplymentService);
    applyment.setStudent(mockStudent);

    fixture.detectChanges();
  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should get getStudent data from service', () => {
    expect(component.student).toEqual(mockStudent);
  });

  it('should display getStudent name', () => {
    const name = fixture.debugElement.query(By.css('[studentName]'));
    expect(name.nativeElement.textContent.trim()).toEqual(mockStudent.name);
  });

  it('should display getStudent matricula', () => {
    const matricula = fixture.debugElement.query(By.css('[studentMatricula]'));
    expect(matricula.nativeElement.textContent.trim()).toEqual(mockStudent.matricula);
  });

  it('should display getStudent class', () => {
    const klass = fixture.debugElement.query(By.css('[studentClass]'));
    expect(klass.nativeElement.textContent.trim()).toEqual(mockStudent.class);
  });

});
