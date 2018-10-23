import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MatrixService } from './matrix.service';
import { AssessmentService } from '../assessment.service';
import { FormsModule } from '@angular/forms';
import { MatrixFixture } from '../../../../testing/fixtures/matrix-fixture';

fdescribe('MatrixService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      providers: [MatrixService, AssessmentService]
    });
  });

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([MatrixService], (service: MatrixService) => {
    expect(service).toBeTruthy();
  }));

  it('requests a matrix', async(inject(
    [MatrixService], (service: MatrixService) => {
      service
        .getMatrix({ id: 'e1234' })
        .subscribe( data => {
          expect(data.id).toEqual('e1234');
          expect(data.title).toEqual('Some Matrix to Tests');
          expect(data.numberOfItems).toEqual(10);
          expect(data.grade).toEqual(5);
          expect(data.subjects.join(', ')).toEqual('Subject A, Subject B');

          expect(data.items[0].id).toEqual('fff');
          expect(data.items[0].text).toEqual('A simple currentItem');
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
          numberOfItems: 10,
          grade: 5,
          subjects: ['Subject A', 'Subject B'],
          items: [
            {
              id: 'fff',
              stem: 'A simple currentItem',
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

  it('updates matrix state to APPROVED',
    inject([MatrixService], (service: MatrixService) => {
      const matrix = MatrixFixture.get();

      service
        .setMatrixAsApproved(matrix)
        .subscribe(data => {
          expect(data).toEqual(true);
        });

      const req = httpTestingController.expectOne(`//localhost/matrices/${matrix.id}`);

      expect(req.request.method).toEqual('PATCH');
      expect(req.request.body).toEqual({ status: 'APPROVED' });

      req.flush({ data: true });
    })
  );
});
