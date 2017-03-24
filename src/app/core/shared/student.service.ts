import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Student } from '../../shared/model/student';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

const { API_URL } = environment;

@Injectable()
export class StudentService {

  constructor(private http: Http) {
  }

  getStudentByToken(studentToken: string, assessmentToken: string): Observable<Student> {
    let url = `${API_URL}/assessments/${assessmentToken}/students`;
    let headers = new Headers({
      'Authorization': studentToken
    });

    return this.http.get(url, { headers })
               .catch(StudentService.errorHandler)
               .map(StudentService.extractData);
  }

  static extractData(response: Response) {
    if (response.status == 200) {
      let studentRaw = response.json().data;
      return {
        id: studentRaw.id,
        name: studentRaw.name,
        matricula: studentRaw.registrationNumber,
        class: studentRaw.class.description
      }
    }
  }

  static errorHandler(error: Response|any): Observable<any> {
    if (error instanceof Response) {
      return Observable.throw(`Not possible to fetch the student: ${error.json().message}`)
    } else {
      return Observable.throw('Not possible to fetch the student.')
    }
  }

}
