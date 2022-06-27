/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/sw/cache.js":
/*!**********************************!*\
  !*** ./resources/js/sw/cache.js ***!
  \**********************************/
/***/ (() => {

var MAX_AGE = 86400000;
var CACHE_NAME = 'app-cache'; // ссылки на кэшируемые файлы

var cacheUrls = ['', 'options.html', '/css/index.css', '/js/index.js', '/images/preload.svg', '/fonts/fontawesome/fa-thin-100.ttf', '/fonts/fontawesome/fa-thin-100.woff', '/fonts/fontawesome/fa-thin-100.woff2', '/fonts/OpenSans/OpenSans-Regular.ttf', '/fonts/OpenSans/OpenSans-Bold.ttf', '/fonts/OpenSans/OpenSans-SemiBold.ttf', '/fonts/OpenSans/OpenSans-Light.ttf'];
self.addEventListener('install', function (event) {
  // задержим обработку события
  // если произойдёт ошибка, serviceWorker не установится
  event.waitUntil( // находим в глобальном хранилище Cache-объект с нашим именем
  // если такого не существует, то он будет создан
  caches.open(CACHE_NAME).then(function (cache) {
    // загружаем в наш cache необходимые файлы
    return cache.addAll(cacheUrls);
  }));
});
self.addEventListener('activate', function (event) {
  // активация
  console.log('activate', event);
});
self.addEventListener('fetch', function (event) {
  console.log(event);
  event.respondWith( // ищем запрашиваемый ресурс в хранилище кэша
  caches.match(event.request, {
    ignoreVary: true
  }).then(function (cachedResponse) {
    var lastModified, fetchRequest;
    console.log(cachedResponse); // если ресурс есть в кэше

    if (cachedResponse) {
      // получаем дату последнего обновления
      lastModified = new Date(cachedResponse.headers.get('last-modified')); // и если мы считаем ресурс устаревшим

      /*if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
      		fetchRequest = event.request.clone();
      	// создаём новый запрос
      	return fetch(fetchRequest).then(function (response) {
      		// при неудаче всегда можно выдать ресурс из кэша
      		if (!response || response.status !== 200) {
      			return cachedResponse;
      		}
      		// обновляем кэш
      		caches.open(CACHE_NAME).then(function (cache) {
      			cache.put(event.request, response.clone());
      		});
      		// возвращаем свежий ресурс
      		return response;
      	}).catch(function () {
      		return cachedResponse;
      	});
      }*/

      return cachedResponse;
    } // запрашиваем из сети как обычно


    return fetch(event.request);
  }));
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./resources/js/sw/sw.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache */ "./resources/js/sw/cache.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cache__WEBPACK_IMPORTED_MODULE_0__);

})();

/******/ })()
;