(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MyPromise.js":
/*!**************************!*\
  !*** ./src/MyPromise.js ***!
  \**************************/
/*! exports provided: MyPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MyPromise\", function() { return MyPromise; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar PENDING = \"pending\";\nvar RESOLVED = \"resolved\";\nvar REJECTED = \"resolved\";\nvar PROMISE_STATUS = Symbol(\"PromiseStatus\");\nvar PROMISE_VALUE = Symbol(\"PromiseValue\");\nvar RESOLVED_CALLBACKS = Symbol(\"Resolved callbacks\");\nvar REJECTED_CALLBACKS = Symbol(\"Rejected callbacks\");\nvar MyPromise =\n/*#__PURE__*/\nfunction () {\n  function MyPromise(fn) {\n    _classCallCheck(this, MyPromise);\n\n    _defineProperty(this, \"PROMISE_STATUS\", PENDING);\n\n    _defineProperty(this, \"PROMISE_VALUE\", undefined);\n\n    _defineProperty(this, \"RESOLVED_CALLBACKS\", []);\n\n    _defineProperty(this, \"REJECTED_CALLBACKS\", []);\n\n    if (typeof fn !== \"function\") {\n      throw new ReferenceError(\"\".concat(fn, \" is not a function\"));\n    }\n\n    fn(this._resolve.bind(this), this._reject.bind(this));\n  } // 这里有问题 因为msg如果是异步的话，那么unbox不能直接取它的值\n\n\n  _createClass(MyPromise, [{\n    key: \"_unbox\",\n    value: function _unbox(msg) {\n      return typeof msg.then === \"function\" ? msg.PROMISE_VALUE : msg;\n    }\n  }, {\n    key: \"_resolve\",\n    value: function _resolve(msg) {\n      var _this = this;\n\n      if (this.PROMISE_STATUS !== PENDING) return;\n      this.PROMISE_STATUS = RESOLVED;\n      this.PROMISE_VALUE = this._unbox(msg);\n      this.RESOLVED_CALLBACKS.forEach(function (cb) {\n        cb(_this.PROMISE_VALUE);\n      });\n    }\n  }, {\n    key: \"_reject\",\n    value: function _reject(msg) {\n      var _this2 = this;\n\n      if (this.PROMISE_STATUS !== PENDING) return;\n      this.PROMISE_STATUS = REJECTED;\n      this.PROMISE_VALUE = this._unbox(msg);\n      this.REJECTED_CALLBACKS.forEach(function (cb) {\n        cb(_this2.PROMISE_VALUE);\n      });\n    }\n  }, {\n    key: \"_fulfiledCallbackWapper\",\n    value: function _fulfiledCallbackWapper(pro, fn) {\n      var _this3 = this;\n\n      fn = typeof fn == \"function\" ? fn : function (msg) {\n        return msg;\n      };\n      return function (msg) {\n        var result;\n        var IS_RESOLVED = _this3.PROMISE_STATUS == RESOLVED;\n\n        try {\n          result = _this3._unbox(fn(msg));\n\n          if (IS_RESOLVED) {\n            pro.PROMISE_STATUS = RESOLVED;\n            pro.PROMISE_VALUE = result;\n\n            pro._resolve(result);\n          } else {\n            pro.PROMISE_STATUS = REJECTED;\n            pro.PROMISE_VALUE = result;\n\n            pro._reject(result);\n          }\n        } catch (err) {\n          pro.PROMISE_STATUS = REJECTED;\n          pro.PROMISE_VALUE = result;\n\n          pro._reject(result);\n        }\n      };\n    }\n  }, {\n    key: \"then\",\n    value: function then(resolved, rejected) {\n      var pro = new MyPromise(function () {});\n\n      if (this.PROMISE_STATUS === RESOLVED) {\n        this._fulfiledCallbackWapper(pro, resolved)(this.PROMISE_VALUE);\n      } else if (this.PROMISE_VALUE === REJECTED) {\n        this._fulfiledCallbackWapper(pro, resolved)(this.PROMISE_VALUE);\n      } else {\n        this.RESOLVED_CALLBACKS.push(this._fulfiledCallbackWapper(pro, resolved));\n        this.REJECTED_CALLBACKS.push(this._fulfiledCallbackWapper(pro, rejected));\n      }\n\n      return pro;\n    }\n  }]);\n\n  return MyPromise;\n}();\n\n//# sourceURL=webpack:///./src/MyPromise.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: MyPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MyPromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MyPromise */ \"./src/MyPromise.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"MyPromise\", function() { return _MyPromise__WEBPACK_IMPORTED_MODULE_0__[\"MyPromise\"]; });\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
});