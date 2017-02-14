import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ConnectionStatusComponent } from './connection-status.component';
import { ConnectionService } from '../connection.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { By } from '@angular/platform-browser';

describe('ConnectionStatusComponent', () => {
  let component: ConnectionStatusComponent;
  let fixture: ComponentFixture<ConnectionStatusComponent>;
  let connection: ConnectionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionStatusComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        {
          provide: ConnectionService,
          deps: [Http],
          useFactory: (http) => {
            const conn = new ConnectionService(http);
            spyOn(conn, 'getStatusOnce').and.returnValue(Observable.of(true));

            return conn;
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionStatusComponent);
    component = fixture.componentInstance;

    connection = fixture.debugElement.injector.get(ConnectionService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start watching on initialization',
    async(() => {
      connection.stopWatch();
      spyOn(connection, 'startWatch').and.returnValue(Observable.of(true));

      component.ngOnInit();
      expect(connection.startWatch).toHaveBeenCalled();
    })
  );

  it('should update display when the component is offline',
    fakeAsync(() => {
        connection.stopWatch();
        spyOn(connection, 'startWatch').and.returnValue(Observable.of(false));
        component.ngOnInit();

        tick(300);
        fixture.detectChanges();

        const rootEl = fixture.debugElement.query(By.css('.connection-status.offline'));

        expect(rootEl).toBeTruthy();
        expect(rootEl.nativeElement.attributes.title.value).toEqual('SEM conexão com a internet');
      }
    )
  );

  it('should update display when the component is online',
    fakeAsync(() => {
        connection.stopWatch();
        spyOn(connection, 'startWatch').and.returnValue(Observable.of(true));
        component.ngOnInit();

        tick(300);
        fixture.detectChanges();

        const rootEl = fixture.debugElement.query(By.css('.connection-status.online'));
        expect(rootEl).toBeTruthy();
        expect(rootEl.nativeElement.attributes.title.value).toEqual('COM conexão com a internet');
      }
    )
  );

});
