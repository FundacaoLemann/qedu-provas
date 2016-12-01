"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var InstructionsComponent = (function () {
    function InstructionsComponent(router, dataService, timer) {
        this.router = router;
        this.dataService = dataService;
        this.timer = timer;
    }
    InstructionsComponent.prototype.ngOnInit = function () {
        this.assessment = this.dataService.assessment;
    };
    InstructionsComponent.prototype.startTimer = function () {
        this.timer.start();
    };
    InstructionsComponent = __decorate([
        core_1.Component({
            selector: 'app-instructions',
            templateUrl: './instructions.component.html',
            styleUrls: ['./instructions.component.sass']
        })
    ], InstructionsComponent);
    return InstructionsComponent;
}());
exports.InstructionsComponent = InstructionsComponent;
