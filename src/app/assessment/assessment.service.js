"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var assessment_mock_1 = require('../shared/mock/assessment-mock');
var AssessmentService = (function () {
    function AssessmentService() {
    }
    AssessmentService.prototype.getAssessment = function (uuid) {
        for (var _i = 0, ASSESSMENTS_1 = assessment_mock_1.ASSESSMENTS; _i < ASSESSMENTS_1.length; _i++) {
            var assessment = ASSESSMENTS_1[_i];
            if (uuid === assessment.uuid) {
                return Promise.resolve(assessment);
            }
        }
        return Promise.resolve();
    };
    AssessmentService = __decorate([
        core_1.Injectable()
    ], AssessmentService);
    return AssessmentService;
}());
exports.AssessmentService = AssessmentService;
