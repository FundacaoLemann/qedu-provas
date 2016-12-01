"use strict";
var rxjs_1 = require('rxjs');
var Timer = (function () {
    function Timer(minutes) {
        this._active = false;
        this._timeLeftSubject$ = new rxjs_1.Subject();
        if (minutes)
            this.setTimer(minutes);
        this.timeLeft = this._timeLeftSubject$.asObservable();
    }
    Object.defineProperty(Timer.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Timer.prototype.start = function () {
        var _this = this;
        if (this._active)
            return;
        this._active = true;
        setInterval(function () { return _this._descreaseTime(); }, 1000);
    };
    Timer.prototype.pause = function () {
        this._active = false;
        clearInterval(this._interval);
    };
    Timer.prototype.setTimer = function (minutes) {
        this._totalTimeInSeconds = this._leftTimeInSeconds = minutes * 60;
    };
    Timer.prototype._descreaseTime = function () {
        --this._leftTimeInSeconds;
        if (this._leftTimeInSeconds <= 0) {
            this._leftTimeInSeconds = 0;
            this.pause();
        }
        this._timeLeftSubject$.next(this._leftTimeInSeconds);
    };
    return Timer;
}());
exports.Timer = Timer;
