import { TestBed, inject, async } from '@angular/core/testing';

import { RequestService } from './request.service';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

class RequestServiceImpl extends RequestService {}

describe('RequestService', () => {
  let service: RequestServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestServiceImpl],
    });
  });

  beforeEach(
    inject([RequestServiceImpl], (requestServiceImpl: RequestServiceImpl) => {
      service = requestServiceImpl;
    }),
  );

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError()', () => {
    it(
      'should return an errors message from response',
      async(() => {
        const httpError = new HttpErrorResponse({
          error: {
            code: 404,
            message: 'Prova not found',
          },
          status: 404,
          statusText: 'Not found',
        });
        const source = throwError(httpError).pipe(catchError(service.handleError));
        source.subscribe(
          () => {},
          error => {
            expect(error).toEqual(jasmine.any(Error));
            expect(error.message).toEqual('Prova not found');
          },
        );
      }),
    );

    it('should return an errors status code 0', () => {
      const response = new HttpErrorResponse({ status: 0 });
      const source = throwError(response).pipe(catchError(service.handleError));

      source.subscribe(
        () => {},
        error => {
          expect(error.message).toEqual(
            'Sistema temporariamente indisponível. Tente novamente mais tarde.',
          );
        },
      );
    });
  });
});
