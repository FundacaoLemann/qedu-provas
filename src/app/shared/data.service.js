"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Subject_1 = require('rxjs/Subject');
var DataService = (function () {
    function DataService(assessmentService, router, timer) {
        this.assessmentService = assessmentService;
        this.router = router;
        this.timer = timer;
        this.assessmentSource$ = new Subject_1.Subject();
        this.studentSource$ = new Subject_1.Subject();
        this.assessmentObservable = this.assessmentSource$.asObservable();
        this.studentObservable = this.studentSource$.asObservable();
    }
    DataService.prototype.loadAssessment = function (uuid) {
        var _this = this;
        this.assessmentService.getAssessment(uuid).then(function (assessment) {
            _this.assessmentSource$.next(assessment);
            _this.assessment = assessment;
            _this.timer.setTimer(_this.assessment.duration);
        });
        return this.assessmentObservable;
    };
    DataService.prototype.setStudent = function (student) {
        this.studentSource$.next(student);
        this.student = student;
    };
    DataService = __decorate([
        core_1.Injectable()
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
