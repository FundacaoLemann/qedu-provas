"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TimerComponent = (function () {
    function TimerComponent(timer) {
        var _this = this;
        this.timer = timer;
        this.timeLeft = '00:00';
        this._timeLeftSubscription = this.timer.timeLeft.subscribe(function (timeLeft) { return _this.timeLeft = _this.clockFormat(timeLeft); });
    }
    TimerComponent.prototype.ngOnInit = function () {
        this.timeLeft = this.clockFormat(this.timer.timeLeftInSeconds);
    };
    TimerComponent.prototype.ngOnDestroy = function () {
        this._timeLeftSubscription.unsubscribe();
    };
    TimerComponent.prototype.clockFormat = function (time) {
        var minutes = Math.floor(time / 60).toString();
        var seconds = (time % 60).toString();
        var padleft = "00";
        minutes = (padleft + minutes).slice(-(minutes.length > padleft.length ? minutes.length : padleft.length));
        seconds = (padleft + seconds).slice(-(seconds.length > padleft.length ? seconds.length : padleft.length));
        return minutes + ":" + seconds;
    };
    TimerComponent = __decorate([
        core_1.Component({
            selector: 'qp-timer',
            template: "<div id=\"timer\">{{ timeLeft }}</div>",
            styleUrls: ['./timer.component.sass']
        })
    ], TimerComponent);
    return TimerComponent;
}());
exports.TimerComponent = TimerComponent;
