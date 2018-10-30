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

  constructor(private http: HttpClient,
              private assessmentService: AssessmentService) {
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
    return this.updateMatrixStatus(matrix, 'APPROVED');
  }

  setMatrixAsRequireChanges(matrix: Matrix | string): Observable<boolean> {
    return this.updateMatrixStatus(matrix, 'REQUIRE_CHANGES');
  }

  private updateMatrixStatus = (matrix: Matrix | string, status: string): Observable<boolean> => {
    let id;
    if (typeof matrix === 'string') {
      id = matrix;
    }
    if (matrix instanceof Matrix) {
      id = matrix.id;
    }

    const requestUrl = this.getStatusUpdateUrl(id, status);

    return this.http
      .post(requestUrl, {})
      .pipe(
        map((data: any) => data.data),
      );
  }

  private getStatusUpdateUrl = (matrixId: string, status: string): string => {
    let action = '';

    if (status === 'APPROVED') {
      action = 'approve';
    } else if (status === 'REQUIRE_CHANGES') {
      action = 'require-changes';
    }

    return this.createRequestUrl('matrices/:matrixId/:action', { matrixId, action });
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
