import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Student } from '../shared/model/student';
import { RequestService } from './request.service';
import { catchError, map } from 'rxjs/operators';

const { API_URL } = environment;

interface StudentResponse {
  data: {
    id: string;
    registrationNumber: string;
    name: string;
    class: {
      id: string;
      description: string;
    };
  };
}

@Injectable()
export class StudentService extends RequestService {
  constructor(private http: HttpClient) {
    super();
  }

  private extractData(resp: StudentResponse): Student {
    const rawStudent = resp.data;
    return {
      id: rawStudent.id,
      name: rawStudent.name,
      matricula: rawStudent.registrationNumber,
      class: rawStudent.class.description,
    };
  }

  getStudentByToken(
    studentToken: string,
    assessmentToken: string,
  ): Observable<Student> {
    const url = `${API_URL}/assessments/${assessmentToken}/students`;
    const headers = new HttpHeaders({
      Authorization: studentToken,
    });

    return this.http
      .get<StudentResponse>(url, { headers })
      .pipe(map(this.extractData), catchError(this.handleError));
  }
}
