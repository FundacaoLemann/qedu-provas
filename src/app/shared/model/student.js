"use strict";
var Student = (function () {
    function Student(name, register_number) {
        if (name === void 0) { name = ''; }
        if (register_number === void 0) { register_number = ''; }
        this.name = name;
        this.register_number = register_number;
    }
    return Student;
}());
exports.Student = Student;
