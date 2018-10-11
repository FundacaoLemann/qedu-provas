import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { Matrix } from '../../../shared/model/matrix';
import { RequestService } from '../request.service';
import { AssessmentService } from '../assessment.service';
import { Item } from '../../../shared/model/item';
// DTOs
import { GetMatrixResponseDTO } from './GetMatrixResponseDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class MatrixService extends RequestService {

  constructor(
    private http: HttpClient,
    private assessmentService: AssessmentService,
  ) {
    super();
    console.log(this.assessmentService);
  }

  getMatrix(query: {
    id?: string,
  }): Observable<Matrix> {
    const requestUrl = this.createRequestUrl('matrices/:id', query);

    return this.http
      .get<GetMatrixResponseDTO>(requestUrl)
      .pipe(
        map(this.formatGetMatrixResponse.bind(this)),
      );
  }

  private formatGetMatrixResponse(response: GetMatrixResponseDTO): Matrix {
    const { id, title } = response.data;

    const matrix = new Matrix();
    matrix.id = id;
    matrix.title = title;
    matrix.items = this.assessmentService.extractQuestionData(response.data);

    return matrix;
  }
}
