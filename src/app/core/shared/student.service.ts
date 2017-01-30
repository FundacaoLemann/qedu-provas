import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import json from '../../utils/json';

import { Student } from '../../shared/model/student';

const apiUrl = "http://localhost:3000";

@Injectable()
export class StudentService {

  constructor (private http: Http) {
  }

  getStudentByToken (token: string): Observable<Student> {
    return this.http.get(`${apiUrl}/students/${token}`)
      .map(response => json.camelizeObject(response.json()).data as Student);
  }

}
