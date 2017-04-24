import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Student } from '../../shared/model/student';
import { RequestService } from './request.service';

const { API_URL } = environment;

@Injectable()
export class StudentService extends RequestService {

  static extractData(response: Response) {
    if (response.status === 200) {
      const studentRaw = response.json().data;
      return {
        id: studentRaw.id,
        name: studentRaw.name,
        matricula: studentRaw.registrationNumber,
        class: studentRaw.class.description
      };
    }
  }

  constructor(private http: Http) {
    super();
  }

  getStudentByToken(studentToken: string, assessmentToken: string): Observable<Student> {
    const url = `${API_URL}/assessments/${assessmentToken}/students`;
    const headers = new Headers({
      'Authorization': studentToken
    });

    return this.http.get(url, { headers })
      .catch(this.handleError)
      .map(StudentService.extractData);
  }
}
