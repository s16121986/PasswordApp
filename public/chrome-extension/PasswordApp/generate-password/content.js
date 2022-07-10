/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/services/password-generator/generator.js":
/*!***************************************************************!*\
  !*** ./resources/js/services/password-generator/generator.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var availableChars = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numeric: '1234567890',
  symbols: '_=+-*&^%$#@!~:;'
};
var animateTime = 700;
var animateIteration = 3;

function getChars(charsKeys) {
  var chars = '';

  if (charsKeys) {
    for (var i = 0; i < charsKeys.length; i++) {
      chars += availableChars[charsKeys[i]];
    }
  } else {
    for (var _i in availableChars) {
      chars += availableChars[_i];
    }
  }

  return chars;
}

function getChar(items) {
  return items.charAt(Math.round(Math.random() * (items.length - 1)));
}

function setInputVal(input, password) {
  input.value = password;
  input.select();
  document.execCommand("copy");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  generate: function generate(length, charsKeys) {
    var chars = getChars(charsKeys);
    var password = '';

    for (var i = 0; i < length; i++) {
      password += getChar(chars);
    }

    return password;
  },
  animate: function animate(input, password) {
    var charsSet = getChars();
    var l = password.length;
    var dt = animateTime / animateIteration;
    var I = l,
        K = 0;
    var ti = window.setInterval(function () {
      var s = '';

      for (var j = 0; j < I; j++) {
        s += getChar(charsSet);
      }

      for (var _j = I; _j < l; _j++) {
        s += password.charAt(_j);
      }

      input.value = s;
      K++;
      if (K % animateIteration === 0) I--;
      if (I > 0) return;
      setInputVal(input, password);
      window.clearInterval(ti);
    }, dt / l);
  },
  set: setInputVal
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************************!*\
  !*** ./resources/js/content/generate-password/content.js ***!
  \***********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_password_generator_generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/password-generator/generator */ "./resources/js/services/password-generator/generator.js");


function execute() {
  var password = _services_password_generator_generator__WEBPACK_IMPORTED_MODULE_0__["default"].generate(12);
  var input = document.activeElement;
  _services_password_generator_generator__WEBPACK_IMPORTED_MODULE_0__["default"].animate(input, password);
}

execute();
})();

/******/ })()
;