webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _math = __webpack_require__(4);

	var _math2 = _interopRequireDefault(_math);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var result = _math2.default.add(2000, 16);
	(0, _jquery2.default)('#demo').html('hello ' + result + ' !');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Math = {
	  add: function add(a, b) {
	    return a + b;
	  }
	};

	exports.default = Math;

/***/ }
]);