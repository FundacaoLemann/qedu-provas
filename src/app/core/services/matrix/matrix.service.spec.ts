import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatrixService } from './matrix.service';
import { AssessmentService } from '../assessment.service';
import { FormsModule } from '@angular/forms';

describe('MatrixService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        MatrixService,
        AssessmentService
      ]
    });
  });

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([MatrixService], (service: MatrixService) => {
    expect(service).toBeTruthy();
  }));

  it('it should request a matrix', async(inject(
    [MatrixService], (service: MatrixService) => {
      service
        .getMatrix({ id: 'e1234' })
        .subscribe( data => {
          expect(data.id).toEqual('e1234');
          expect(data.title).toEqual('Some Matrix to Tests');

          expect(data.items[0].id).toEqual('fff');
          expect(data.items[0].text).toEqual('A simple question');
          expect(data.items[0].media).toEqual([]);
          expect(data.items[0].answers).toEqual([
            { id: 1, text: 'A'},
            { id: 2, text: 'B'},
            { id: 3, text: 'C'},
            { id: 4, text: 'D'},
          ]);
        });

      const req = httpTestingController.expectOne('//localhost/matrices/e1234');
      expect(req.request.method).toEqual('GET');

      req.flush({
        data: {
          id: 'e1234',
          title: 'Some Matrix to Tests',
          items: [
            {
              id: 'fff',
              stem: 'A simple question',
              image: '',
              options: [
                { id: 1, description: 'A'},
                { id: 2, description: 'B'},
                { id: 3, description: 'C'},
                { id: 4, description: 'D'},
              ]
            }
          ]
        }
      });

      httpTestingController.verify();
    })
  ));
});
