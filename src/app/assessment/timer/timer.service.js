"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var timer_1 = require('../../shared/timer');
var TimerService = (function () {
    function TimerService() {
        this._active = false;
        this._timeLeftInSeconds = 0;
        this._timer = new timer_1.Timer(0);
    }
    Object.defineProperty(TimerService.prototype, "active", {
        get: function () { return this._active; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerService.prototype, "timeLeft", {
        get: function () { return this._timer.timeLeft; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerService.prototype, "timeLeftInSeconds", {
        get: function () { return this._timeLeftInSeconds; },
        enumerable: true,
        configurable: true
    });
    TimerService.prototype.setTimer = function (minutes) {
        this._timeLeftInSeconds = minutes * 60;
        this._timer.setTimer(minutes);
    };
    TimerService.prototype.start = function () {
        var _this = this;
        if (this._timer.active)
            return;
        this._timer.start();
        this._timer.timeLeft.subscribe(function (timeLeft) { return _this.onTimeLeftChanges(timeLeft); });
    };
    TimerService.prototype.onTimeLeftChanges = function (timeLeft) {
        this._timeLeftInSeconds = timeLeft;
        if (timeLeft <= 0) {
            this._timer.pause();
        }
    };
    TimerService = __decorate([
        core_1.Injectable()
    ], TimerService);
    return TimerService;
}());
exports.TimerService = TimerService;
