import { BehaviorSubject } from 'rxjs';

export class ActivatedRouteStub {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  private _testParams: {};

  constructor(params = {}) {
    if (params) {
      this.testParams = params;
    }
  }

  // Test parameters
  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return {params: this.testParams};
  }
}
