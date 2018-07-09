(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var BcaCalculator = function () {
    function BcaCalculator() {
        _classCallCheck(this, BcaCalculator);
    }

    _createClass(BcaCalculator, null, [{
        key: "IsEligible",
        value: function IsEligible(application) {
            return false;
        }
    }]);

    return BcaCalculator;
}();

exports.BcaCalculator = BcaCalculator;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bca_calculator_1 = require("./bca-calculator");
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    var timeSpan = { years: "2", months: "3" };
    var transaction = { date: new Date("2018-03-01T00:00:00.000Z"), value: 6966 };
    var transactions = [transaction];
    var application = {
        amountRequested: 2000,
        timeInBusiness: timeSpan,
        transactions: transactions
    };
    elt.innerText = bca_calculator_1.BcaCalculator.IsEligible(application).toString();
}
showHello("greeting", "TypeScript");

},{"./bca-calculator":1}]},{},[2])

//# sourceMappingURL=bca-eligibility.js.map
