import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Student } from '../../shared/model/student';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { camelizeObject } from '../../utils/json';
import { environment } from '../../../environments/environment';

const { API_URL } = environment;

@Injectable()
export class StudentService {

  constructor(private http: Http) {
  }

  getStudentByToken(token: string): Observable<Student> {
    return this.http.get(`${API_URL}/students/${token}`)
      .map(response => camelizeObject(response.json()).data as Student);
  }

}
