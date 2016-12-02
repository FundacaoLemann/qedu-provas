import { Injectable } from '@angular/core';

import { Student } from "../../shared/model/student";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class StoreService {
  private _studentSubject: BehaviorSubject<Student>;
  private _student: Observable<Student>;

  constructor () {
    this._studentSubject = new BehaviorSubject({ name: '', register_number: '' });
    this._student = this._studentSubject.asObservable();
  }

  setStudent (student: Student) {
    this._studentSubject.next(student);
  }

  getStudentValue (): Student {
    return this._studentSubject.getValue();
  }

  get student (): Observable<Student> {
    return this._student;
  }
}
