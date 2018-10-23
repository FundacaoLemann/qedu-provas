import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';


import { Matrix } from '../../../shared/model/matrix';
import { RequestService } from '../request.service';
import { AssessmentService } from '../assessment.service';
// DTOs
import { GetMatrixResponseDTO } from './GetMatrixResponseDTO.interface';
import { mapTo } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class MatrixService extends RequestService {

  constructor(
    private http: HttpClient,
    private assessmentService: AssessmentService
  ) {
    super();
  }

  getMatrix(query: {
    id?: string,
  }): Observable<Matrix> {
    const requestUrl = this.createRequestUrl('matrices/:id', query);

    return this.http
      .get<GetMatrixResponseDTO>(requestUrl)
      .pipe(
        map(this.formatGetMatrixResponse.bind(this)),
        catchError(this.handleError),
      );
  }

  setMatrixAsApproved(matrix: Matrix | string): Observable<boolean> {
    let id;
    if (typeof matrix === 'string') {
      id = matrix;
    }
    if (matrix instanceof Matrix) {
      id = matrix.id;
    }

    const requestUrl = this.createRequestUrl('matrices/:id', { id });

    return this.http
      .patch(requestUrl, { status: 'APPROVED' })
        .pipe(
          map((data: any) => data.data),
        );
  }

  private formatGetMatrixResponse(response: GetMatrixResponseDTO): Matrix {
    const { id, title, numberOfItems, grade, subjects } = response.data;

    const matrix = new Matrix();
    matrix.id = id;
    matrix.title = title;
    matrix.numberOfItems = numberOfItems;
    matrix.grade = grade;
    matrix.subjects = subjects;
    matrix.items = this.assessmentService.extractQuestionData(response.data);

    return matrix;
  }
}
