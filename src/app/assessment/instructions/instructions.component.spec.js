"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var instructions_component_1 = require('./instructions.component');
var timer_component_1 = require("../timer/timer.component");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
describe('InstructionsComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [instructions_component_1.InstructionsComponent, timer_component_1.TimerComponent],
            providers: [router_1.Router, { provide: common_1.APP_BASE_HREF, useValue: '/' }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(instructions_component_1.InstructionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
