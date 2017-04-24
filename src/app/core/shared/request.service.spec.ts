import { TestBed, inject, async } from '@angular/core/testing';

import { RequestService } from './request.service';
import { createResponse } from '../../../testing/testing-helper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

class RequestServiceImpl extends RequestService {
}

describe('RequestService', () => {
  let service: RequestServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestServiceImpl]
    });
  });

  beforeEach(inject([RequestServiceImpl], (requestServiceImpl: RequestServiceImpl) => {
    service = requestServiceImpl;
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError()', () => {
    it('should return an error message from response', async(() => {
      const response = createResponse(404, 'Not found', { message: 'Prova não encontrada' });
      const source = Observable.throw(response);

      const expected = error => {
        expect(error).toEqual('Prova não encontrada');
      };
      source
        .catch(service.handleError)
        .subscribe(() => {}, expected);
    }));

    it('should return an error status code 0', () => {
      const response = createResponse(0, undefined, null);
      const source = Observable.throw(response);

      const expected = error => {
        expect(error).toEqual('Sistema temporariamente indisponível. Tente novamente mais tarde.');
      };

      source
        .catch(service.handleError)
        .subscribe(() => {}, expected);
    });
  });
});
