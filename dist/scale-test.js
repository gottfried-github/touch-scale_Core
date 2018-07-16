/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/scale.js":
/*!***********************!*\
  !*** ./dist/scale.js ***!
  \***********************/
/*! exports provided: ScaleCore, ScaleDomIo, Scale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleCore", function() { return ScaleCore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleDomIo", function() { return ScaleDomIo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scale", function() { return Scale; });
// import {getViewportWidth, getViewportHeight} from "pltfrm-lib"

// https://stackoverflow.com/questions/6942785/window-innerwidth-vs-document-documentelement-clientwidth
// https://bugzilla.mozilla.org/show_bug.cgi?id=156388#c14
function getViewportHeight() {
  return window.innerHeight && document.documentElement.clientHeight ?
    Math.min(window.innerHeight, document.documentElement.clientHeight) :
    window.innerHeight || document.documentElement.clientHeight
      || (document.querySelector('body') || document.getElementsByTagName('body')[0].clientHeight);
}

function getViewportWidth() {
  return window.innerWidth && document.documentElement.clientWidth ?
    Math.min(window.innerWidth, document.documentElement.clientWidth) :
    window.innerWidth || document.documentElement.clientWidth
      || (document.querySelector('body') || document.getElementsByTagName('body')[0].clientWidth);
}

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

function ScaleCore() {

}

ScaleCore.prototype.calculateTransform = function(transforms, rects, containerDims, target) {

  const transformsNew = {}
  Object.assign(transformsNew, transforms)

  // this.coordinates.rects = this.el.getBoundingClientRect();

  // figure out the dimensions for the element to obtain after scaling:
  var ratio = target / transforms.scaleX;

  // we make projection of the future scaled element...
  const transformsProjected = {
    rects: {
      left: (rects.left + rects.width / 2) - (transforms.originX * target),
      top: (rects.top + rects.height / 2) - (transforms.originY * target),
      width: rects.width * ratio,
      height: rects.height * ratio
    },
    // if we'd work with changing origin, these values in transforms would be altered by scaleStart.
    // in our case, however, these remain the same as they were left after the previous scaling of the element.
    translateX: transforms.translateX,
    translateY: transforms.translateY
  }

  // ... to see, if it would overflow the borders of the viewport, and, if so,
  // adjust the translation to avoid that
  var transformsBounded = this.encounterBounds(transformsProjected, containerDims);

  // set the values that the matrix of the element should have
  transformsNew.translateX = transformsBounded.translateX
  transformsNew.translateY = transformsBounded.translateY
  transformsNew.scaleX = target
  transformsNew.scaleY = target

  return transformsNew
}

ScaleCore.prototype.encounterBounds = function(coords, containerDims) {

  var array = [
    {
      length: coords.rects.width,
      pos: coords.rects.left,
      translation: coords.translateX,
      parent: containerDims.width // parseInt(getViewportWidth())
    },
    {
      length: coords.rects.height,
      pos: coords.rects.top,
      translation: coords.translateY,
      parent: containerDims.height // parseInt(getViewportHeight())
    }
  ]

  for (var i = 0; i < array.length; i++) {
    var temp = process(array[i]);
    // console.log("tweakIt", temp)
    array[i].newPos = (typeof(temp) === 'number') ? temp : array[i].translation;
  }

  const coordsNew = {}

  // Object.assign is es6, but there's a polyfill, in case of anything:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  Object.assign(coordsNew, coords)

  coordsNew.translateX = array[0].newPos;
  coordsNew.translateY = array[1].newPos;

  function process(axis) {

    if (axis.length <= axis.parent) {
      if (axis.pos > (axis.parent - axis.length)) {
        return ( axis.translation - (axis.pos - (axis.parent - axis.length)) );
      } else if (axis.pos < (0)) {
        return ( axis.translation + Math.abs(axis.pos) + 2 );
      }
      return false;
    } else if (axis.length > axis.parent) {
      if (axis.pos > (0)) {
        return ( axis.translation - axis.pos );
      } else if (axis.pos < (axis.parent - axis.length)) {
        return ( (axis.translation + ( Math.abs(axis.pos) - Math.abs(axis.parent - axis.length) )) );
      }
      return false;
    }
    return false;
  }

  return coordsNew;
  //this.element.css( 'transform', 'matrix(' + coords.scaleX + ', 0, 0, ' + coords.scaleY +  ', ' + x.newPos + ', ' + y.newPos + ')' );

}



/*
const ScaleCore = {
  expose: function() {
    return ScaleCoreCapsule()
  }
}
 
// export {ScaleCoreCapsule}
*/

function ScaleDomIo() {}

ScaleDomIo.prototype.initializeElementsMatrix = function(el) {
  // set the initial value of transform to matrix;
  const matrixStr = 'matrix(1, 0, 0, 1, 0, 0)'

  this.doSetMatrix(el, matrixStr)
}

ScaleDomIo.prototype.getTransforms = function(el) {
  // get the initial value of the origin
  const origin = window.getComputedStyle(el)['transform-origin'].split(' ')

  return {
    // rects: this.el.getBoundingClientRect(),
    scaleX: 1,
    scaleY: 1,
    originX: parseInt(origin[0]),
    originY: parseInt(origin[1]),
    translateX: 0,
    translateY: 0
      // offset: {
      //   x: 0,
      //   y: 0
      // }
  }
}

ScaleDomIo.prototype.getRects = function(el) {
  return el.getBoundingClientRect()
}

ScaleDomIo.prototype.setMatrix = function(el, transforms) {
  console.log('setMatrix', transforms)
  const matrixStr = 'matrix(' +
    transforms.scaleX + ', 0, 0, ' +
    transforms.scaleY + ', ' +
    transforms.translateX + ', ' +
    transforms.translateY +
    ')'

  this.doSetMatrix(el, matrixStr)
}

ScaleDomIo.prototype.doSetMatrix = function(el, matrixStr) {
  console.log('setMatrix', matrixStr)
  el.style.webkitTransform = matrixStr
  el.style.mozTransform = matrixStr
  el.style.msTransform = matrixStr
  el.style.oTransform = matrixStr
  el.style.transform = matrixStr
}

ScaleDomIo.prototype.getViewportDims = function() {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  }
}



/*
const ScaleDomIo = {
  expose: function() { // unveil
    return ScaleDomIoCapsule()
  }
}

// export {ScaleDomIoCapsule}

*/

// import {MeasureAlter} from "dom"
// import {Calculator} from "calculator"
//
// const MeasureAlter = MeasureAlter.init()
// const Calculator = Calculator.init()

// const ScaleCore = ScaleCore.expose()
// const ScaleDomIo = ScaleDomIo.expose()

function ScaleCapsule() {
}

function Scale(el, options) {
  this.el = el
  this.options = options || {}
  this.scaleFactor = options.scaleFactor;
  this.transitionClass = options.transitionClass || 'scalable-transition'

  this.core = new ScaleCore()
  this.domIo = new ScaleDomIo()

  // set the initial value of transform to matrix, in the element
  this.domIo.initializeElementsMatrix(this.el)

  this.transforms = this.domIo.getTransforms(this.el)
  this.rects = this.domIo.getRects(this.el)
}

Scale.prototype.scaleUp = function() {
  this.doScale(this.scaleFactor, true)
}

Scale.prototype.scaleDown = function() {
  this.doScale(1, false)
}

Scale.prototype.doScale = function(target, scaledUp) {

  // update our rects data, in case of anything
  this.rects = this.domIo.getRects(this.el)
  const vprtDims = this.domIo.getViewportDims()
  this.transforms = this.core.calculateTransform(this.transforms, this.rects, vprtDims, target)

  const self = this
  function trnsnEndCb() {
    self.el.removeEventListener("transitionend", trnsnEndCb)
    self.el.classList.remove(self.transitionClass)

    self.rects = self.domIo.getRects(self.el)
    self.scaledUp = scaledUp

    if (self.options.afterScale)
      self.options.afterScale(self.el);
  }

  this.el.addEventListener('transitionend', trnsnEndCb)

  if (this.options.beforeScale)
    this.options.beforeScale(this.rects)

  this.el.classList.add(this.transitionClass)
  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.updateTransformData = function(transforms) {
  this.transforms = Object.assign(this.transforms, transforms)
}



/*
const Scale = {
  expose: function() {
    return ScaleCapsule()
  }
}

export {Scale}

*/


/***/ }),

/***/ "./test/test.js":
/*!**********************!*\
  !*** ./test/test.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_scale_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/scale.js */ "./dist/scale.js");


function main() {
  console.log(_dist_scale_js__WEBPACK_IMPORTED_MODULE_0__["Scale"])

  const scalableEl = document.querySelector('.scalable')
  const scalable = new _dist_scale_js__WEBPACK_IMPORTED_MODULE_0__["Scale"](
    scalableEl,
    {
      scaleFactor: 3,
      beforeScale: function(coordinates) {
        console.log('beforeScale')
      },
      afterScale: function(el) {
        console.log('afterScale')
      },
      accountForTranslation: false,
      // getSize: function(el) {
      //   return el.getBoundingClientRect()
      // }
      transitionClass: "scalable-transition"
    }
  )

  // an improvisational translate method, to check that updateTransformData works.
  scalable.translate = function(transl, scaleFactor) {
    scalable.el.style.transform = "matrix("+ scaleFactor +", 0, 0, "+ scaleFactor +", "+ transl +", "+ transl +")"
    // translate(scalable.el, transl, scaleFactor)

    const translateActual = scalable.el.style.transform.split('(')[1].split(')')[0].split(',');
    for (let i = 0; i < translateActual.length; i++) {
      translateActual[i] = parseFloat(translateActual[i]);
    }

    scalable.updateTransformData({
      translateX: translateActual[4],
      translateY: translateActual[5],
    })
  }

  console.log(scalable)
}

window.addEventListener("load", main)


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zY2FsZS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBLFdBQVcsb0NBQW9DOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIsMEJBQTBCO0FBQ25EOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7O0FBRVI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWDs7QUFFQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFROztBQUVSOzs7Ozs7Ozs7Ozs7Ozs7QUN0VGM7O0FBRWQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLDRCQUE0QjtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBIiwiZmlsZSI6InNjYWxlLXRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3QvdGVzdC5qc1wiKTtcbiIsIi8vIGltcG9ydCB7Z2V0Vmlld3BvcnRXaWR0aCwgZ2V0Vmlld3BvcnRIZWlnaHR9IGZyb20gXCJwbHRmcm0tbGliXCJcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjk0Mjc4NS93aW5kb3ctaW5uZXJ3aWR0aC12cy1kb2N1bWVudC1kb2N1bWVudGVsZW1lbnQtY2xpZW50d2lkdGhcbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjM4OCNjMTRcbmZ1bmN0aW9uIGdldFZpZXdwb3J0SGVpZ2h0KCkge1xuICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgP1xuICAgIE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgOlxuICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xpZW50SGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRXaWR0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/XG4gICAgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgOlxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsaWVudFdpZHRoKTtcbn1cblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2FsZUNvcmUoKSB7XG5cbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5jYWxjdWxhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbih0cmFuc2Zvcm1zLCByZWN0cywgY29udGFpbmVyRGltcywgdGFyZ2V0KSB7XG5cbiAgY29uc3QgdHJhbnNmb3Jtc05ldyA9IHt9XG4gIE9iamVjdC5hc3NpZ24odHJhbnNmb3Jtc05ldywgdHJhbnNmb3JtcylcblxuICAvLyB0aGlzLmNvb3JkaW5hdGVzLnJlY3RzID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAvLyBmaWd1cmUgb3V0IHRoZSBkaW1lbnNpb25zIGZvciB0aGUgZWxlbWVudCB0byBvYnRhaW4gYWZ0ZXIgc2NhbGluZzpcbiAgdmFyIHJhdGlvID0gdGFyZ2V0IC8gdHJhbnNmb3Jtcy5zY2FsZVg7XG5cbiAgLy8gd2UgbWFrZSBwcm9qZWN0aW9uIG9mIHRoZSBmdXR1cmUgc2NhbGVkIGVsZW1lbnQuLi5cbiAgY29uc3QgdHJhbnNmb3Jtc1Byb2plY3RlZCA9IHtcbiAgICByZWN0czoge1xuICAgICAgbGVmdDogKHJlY3RzLmxlZnQgKyByZWN0cy53aWR0aCAvIDIpIC0gKHRyYW5zZm9ybXMub3JpZ2luWCAqIHRhcmdldCksXG4gICAgICB0b3A6IChyZWN0cy50b3AgKyByZWN0cy5oZWlnaHQgLyAyKSAtICh0cmFuc2Zvcm1zLm9yaWdpblkgKiB0YXJnZXQpLFxuICAgICAgd2lkdGg6IHJlY3RzLndpZHRoICogcmF0aW8sXG4gICAgICBoZWlnaHQ6IHJlY3RzLmhlaWdodCAqIHJhdGlvXG4gICAgfSxcbiAgICAvLyBpZiB3ZSdkIHdvcmsgd2l0aCBjaGFuZ2luZyBvcmlnaW4sIHRoZXNlIHZhbHVlcyBpbiB0cmFuc2Zvcm1zIHdvdWxkIGJlIGFsdGVyZWQgYnkgc2NhbGVTdGFydC5cbiAgICAvLyBpbiBvdXIgY2FzZSwgaG93ZXZlciwgdGhlc2UgcmVtYWluIHRoZSBzYW1lIGFzIHRoZXkgd2VyZSBsZWZ0IGFmdGVyIHRoZSBwcmV2aW91cyBzY2FsaW5nIG9mIHRoZSBlbGVtZW50LlxuICAgIHRyYW5zbGF0ZVg6IHRyYW5zZm9ybXMudHJhbnNsYXRlWCxcbiAgICB0cmFuc2xhdGVZOiB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVlcbiAgfVxuXG4gIC8vIC4uLiB0byBzZWUsIGlmIGl0IHdvdWxkIG92ZXJmbG93IHRoZSBib3JkZXJzIG9mIHRoZSB2aWV3cG9ydCwgYW5kLCBpZiBzbyxcbiAgLy8gYWRqdXN0IHRoZSB0cmFuc2xhdGlvbiB0byBhdm9pZCB0aGF0XG4gIHZhciB0cmFuc2Zvcm1zQm91bmRlZCA9IHRoaXMuZW5jb3VudGVyQm91bmRzKHRyYW5zZm9ybXNQcm9qZWN0ZWQsIGNvbnRhaW5lckRpbXMpO1xuXG4gIC8vIHNldCB0aGUgdmFsdWVzIHRoYXQgdGhlIG1hdHJpeCBvZiB0aGUgZWxlbWVudCBzaG91bGQgaGF2ZVxuICB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZVggPSB0cmFuc2Zvcm1zQm91bmRlZC50cmFuc2xhdGVYXG4gIHRyYW5zZm9ybXNOZXcudHJhbnNsYXRlWSA9IHRyYW5zZm9ybXNCb3VuZGVkLnRyYW5zbGF0ZVlcbiAgdHJhbnNmb3Jtc05ldy5zY2FsZVggPSB0YXJnZXRcbiAgdHJhbnNmb3Jtc05ldy5zY2FsZVkgPSB0YXJnZXRcblxuICByZXR1cm4gdHJhbnNmb3Jtc05ld1xufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLmVuY291bnRlckJvdW5kcyA9IGZ1bmN0aW9uKGNvb3JkcywgY29udGFpbmVyRGltcykge1xuXG4gIHZhciBhcnJheSA9IFtcbiAgICB7XG4gICAgICBsZW5ndGg6IGNvb3Jkcy5yZWN0cy53aWR0aCxcbiAgICAgIHBvczogY29vcmRzLnJlY3RzLmxlZnQsXG4gICAgICB0cmFuc2xhdGlvbjogY29vcmRzLnRyYW5zbGF0ZVgsXG4gICAgICBwYXJlbnQ6IGNvbnRhaW5lckRpbXMud2lkdGggLy8gcGFyc2VJbnQoZ2V0Vmlld3BvcnRXaWR0aCgpKVxuICAgIH0sXG4gICAge1xuICAgICAgbGVuZ3RoOiBjb29yZHMucmVjdHMuaGVpZ2h0LFxuICAgICAgcG9zOiBjb29yZHMucmVjdHMudG9wLFxuICAgICAgdHJhbnNsYXRpb246IGNvb3Jkcy50cmFuc2xhdGVZLFxuICAgICAgcGFyZW50OiBjb250YWluZXJEaW1zLmhlaWdodCAvLyBwYXJzZUludChnZXRWaWV3cG9ydEhlaWdodCgpKVxuICAgIH1cbiAgXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVtcCA9IHByb2Nlc3MoYXJyYXlbaV0pO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidHdlYWtJdFwiLCB0ZW1wKVxuICAgIGFycmF5W2ldLm5ld1BvcyA9ICh0eXBlb2YodGVtcCkgPT09ICdudW1iZXInKSA/IHRlbXAgOiBhcnJheVtpXS50cmFuc2xhdGlvbjtcbiAgfVxuXG4gIGNvbnN0IGNvb3Jkc05ldyA9IHt9XG5cbiAgLy8gT2JqZWN0LmFzc2lnbiBpcyBlczYsIGJ1dCB0aGVyZSdzIGEgcG9seWZpbGwsIGluIGNhc2Ugb2YgYW55dGhpbmc6XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAgT2JqZWN0LmFzc2lnbihjb29yZHNOZXcsIGNvb3JkcylcblxuICBjb29yZHNOZXcudHJhbnNsYXRlWCA9IGFycmF5WzBdLm5ld1BvcztcbiAgY29vcmRzTmV3LnRyYW5zbGF0ZVkgPSBhcnJheVsxXS5uZXdQb3M7XG5cbiAgZnVuY3Rpb24gcHJvY2VzcyhheGlzKSB7XG5cbiAgICBpZiAoYXhpcy5sZW5ndGggPD0gYXhpcy5wYXJlbnQpIHtcbiAgICAgIGlmIChheGlzLnBvcyA+IChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uIC0gKGF4aXMucG9zIC0gKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpKSApO1xuICAgICAgfSBlbHNlIGlmIChheGlzLnBvcyA8ICgwKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uICsgTWF0aC5hYnMoYXhpcy5wb3MpICsgMiApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYXhpcy5sZW5ndGggPiBheGlzLnBhcmVudCkge1xuICAgICAgaWYgKGF4aXMucG9zID4gKDApKSB7XG4gICAgICAgIHJldHVybiAoIGF4aXMudHJhbnNsYXRpb24gLSBheGlzLnBvcyApO1xuICAgICAgfSBlbHNlIGlmIChheGlzLnBvcyA8IChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gKCAoYXhpcy50cmFuc2xhdGlvbiArICggTWF0aC5hYnMoYXhpcy5wb3MpIC0gTWF0aC5hYnMoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkgKSkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGNvb3Jkc05ldztcbiAgLy90aGlzLmVsZW1lbnQuY3NzKCAndHJhbnNmb3JtJywgJ21hdHJpeCgnICsgY29vcmRzLnNjYWxlWCArICcsIDAsIDAsICcgKyBjb29yZHMuc2NhbGVZICsgICcsICcgKyB4Lm5ld1BvcyArICcsICcgKyB5Lm5ld1BvcyArICcpJyApO1xuXG59XG5cbmV4cG9ydCB7U2NhbGVDb3JlfVxuXG4vKlxuY29uc3QgU2NhbGVDb3JlID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTY2FsZUNvcmVDYXBzdWxlKClcbiAgfVxufVxuIFxuLy8gZXhwb3J0IHtTY2FsZUNvcmVDYXBzdWxlfVxuKi9cblxuZnVuY3Rpb24gU2NhbGVEb21JbygpIHt9XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmluaXRpYWxpemVFbGVtZW50c01hdHJpeCA9IGZ1bmN0aW9uKGVsKSB7XG4gIC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0cmFuc2Zvcm0gdG8gbWF0cml4O1xuICBjb25zdCBtYXRyaXhTdHIgPSAnbWF0cml4KDEsIDAsIDAsIDEsIDAsIDApJ1xuXG4gIHRoaXMuZG9TZXRNYXRyaXgoZWwsIG1hdHJpeFN0cilcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtcyA9IGZ1bmN0aW9uKGVsKSB7XG4gIC8vIGdldCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgb3JpZ2luXG4gIGNvbnN0IG9yaWdpbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsndHJhbnNmb3JtLW9yaWdpbiddLnNwbGl0KCcgJylcblxuICByZXR1cm4ge1xuICAgIC8vIHJlY3RzOiB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIHNjYWxlWDogMSxcbiAgICBzY2FsZVk6IDEsXG4gICAgb3JpZ2luWDogcGFyc2VJbnQob3JpZ2luWzBdKSxcbiAgICBvcmlnaW5ZOiBwYXJzZUludChvcmlnaW5bMV0pLFxuICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgdHJhbnNsYXRlWTogMFxuICAgICAgLy8gb2Zmc2V0OiB7XG4gICAgICAvLyAgIHg6IDAsXG4gICAgICAvLyAgIHk6IDBcbiAgICAgIC8vIH1cbiAgfVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRSZWN0cyA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5zZXRNYXRyaXggPSBmdW5jdGlvbihlbCwgdHJhbnNmb3Jtcykge1xuICBjb25zb2xlLmxvZygnc2V0TWF0cml4JywgdHJhbnNmb3JtcylcbiAgY29uc3QgbWF0cml4U3RyID0gJ21hdHJpeCgnICtcbiAgICB0cmFuc2Zvcm1zLnNjYWxlWCArICcsIDAsIDAsICcgK1xuICAgIHRyYW5zZm9ybXMuc2NhbGVZICsgJywgJyArXG4gICAgdHJhbnNmb3Jtcy50cmFuc2xhdGVYICsgJywgJyArXG4gICAgdHJhbnNmb3Jtcy50cmFuc2xhdGVZICtcbiAgICAnKSdcblxuICB0aGlzLmRvU2V0TWF0cml4KGVsLCBtYXRyaXhTdHIpXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmRvU2V0TWF0cml4ID0gZnVuY3Rpb24oZWwsIG1hdHJpeFN0cikge1xuICBjb25zb2xlLmxvZygnc2V0TWF0cml4JywgbWF0cml4U3RyKVxuICBlbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUubW96VHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLm1zVHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLm9UcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUudHJhbnNmb3JtID0gbWF0cml4U3RyXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmdldFZpZXdwb3J0RGltcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBnZXRWaWV3cG9ydFdpZHRoKCksXG4gICAgaGVpZ2h0OiBnZXRWaWV3cG9ydEhlaWdodCgpXG4gIH1cbn1cblxuZXhwb3J0IHtTY2FsZURvbUlvfVxuXG4vKlxuY29uc3QgU2NhbGVEb21JbyA9IHtcbiAgZXhwb3NlOiBmdW5jdGlvbigpIHsgLy8gdW52ZWlsXG4gICAgcmV0dXJuIFNjYWxlRG9tSW9DYXBzdWxlKClcbiAgfVxufVxuXG4vLyBleHBvcnQge1NjYWxlRG9tSW9DYXBzdWxlfVxuXG4qL1xuXG4vLyBpbXBvcnQge01lYXN1cmVBbHRlcn0gZnJvbSBcImRvbVwiXG4vLyBpbXBvcnQge0NhbGN1bGF0b3J9IGZyb20gXCJjYWxjdWxhdG9yXCJcbi8vXG4vLyBjb25zdCBNZWFzdXJlQWx0ZXIgPSBNZWFzdXJlQWx0ZXIuaW5pdCgpXG4vLyBjb25zdCBDYWxjdWxhdG9yID0gQ2FsY3VsYXRvci5pbml0KClcblxuLy8gY29uc3QgU2NhbGVDb3JlID0gU2NhbGVDb3JlLmV4cG9zZSgpXG4vLyBjb25zdCBTY2FsZURvbUlvID0gU2NhbGVEb21Jby5leHBvc2UoKVxuXG5mdW5jdGlvbiBTY2FsZUNhcHN1bGUoKSB7XG59XG5cbmZ1bmN0aW9uIFNjYWxlKGVsLCBvcHRpb25zKSB7XG4gIHRoaXMuZWwgPSBlbFxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHRoaXMuc2NhbGVGYWN0b3IgPSBvcHRpb25zLnNjYWxlRmFjdG9yO1xuICB0aGlzLnRyYW5zaXRpb25DbGFzcyA9IG9wdGlvbnMudHJhbnNpdGlvbkNsYXNzIHx8ICdzY2FsYWJsZS10cmFuc2l0aW9uJ1xuXG4gIHRoaXMuY29yZSA9IG5ldyBTY2FsZUNvcmUoKVxuICB0aGlzLmRvbUlvID0gbmV3IFNjYWxlRG9tSW8oKVxuXG4gIC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0cmFuc2Zvcm0gdG8gbWF0cml4LCBpbiB0aGUgZWxlbWVudFxuICB0aGlzLmRvbUlvLmluaXRpYWxpemVFbGVtZW50c01hdHJpeCh0aGlzLmVsKVxuXG4gIHRoaXMudHJhbnNmb3JtcyA9IHRoaXMuZG9tSW8uZ2V0VHJhbnNmb3Jtcyh0aGlzLmVsKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxufVxuXG5TY2FsZS5wcm90b3R5cGUuc2NhbGVVcCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRvU2NhbGUodGhpcy5zY2FsZUZhY3RvciwgdHJ1ZSlcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlRG93biA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRvU2NhbGUoMSwgZmFsc2UpXG59XG5cblNjYWxlLnByb3RvdHlwZS5kb1NjYWxlID0gZnVuY3Rpb24odGFyZ2V0LCBzY2FsZWRVcCkge1xuXG4gIC8vIHVwZGF0ZSBvdXIgcmVjdHMgZGF0YSwgaW4gY2FzZSBvZiBhbnl0aGluZ1xuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuICBjb25zdCB2cHJ0RGltcyA9IHRoaXMuZG9tSW8uZ2V0Vmlld3BvcnREaW1zKClcbiAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5jb3JlLmNhbGN1bGF0ZVRyYW5zZm9ybSh0aGlzLnRyYW5zZm9ybXMsIHRoaXMucmVjdHMsIHZwcnREaW1zLCB0YXJnZXQpXG5cbiAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgZnVuY3Rpb24gdHJuc25FbmRDYigpIHtcbiAgICBzZWxmLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHRybnNuRW5kQ2IpXG4gICAgc2VsZi5lbC5jbGFzc0xpc3QucmVtb3ZlKHNlbGYudHJhbnNpdGlvbkNsYXNzKVxuXG4gICAgc2VsZi5yZWN0cyA9IHNlbGYuZG9tSW8uZ2V0UmVjdHMoc2VsZi5lbClcbiAgICBzZWxmLnNjYWxlZFVwID0gc2NhbGVkVXBcblxuICAgIGlmIChzZWxmLm9wdGlvbnMuYWZ0ZXJTY2FsZSlcbiAgICAgIHNlbGYub3B0aW9ucy5hZnRlclNjYWxlKHNlbGYuZWwpO1xuICB9XG5cbiAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdHJuc25FbmRDYilcblxuICBpZiAodGhpcy5vcHRpb25zLmJlZm9yZVNjYWxlKVxuICAgIHRoaXMub3B0aW9ucy5iZWZvcmVTY2FsZSh0aGlzLnJlY3RzKVxuXG4gIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnRyYW5zaXRpb25DbGFzcylcbiAgdGhpcy5kb21Jby5zZXRNYXRyaXgodGhpcy5lbCwgdGhpcy50cmFuc2Zvcm1zKVxufVxuXG5TY2FsZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtRGF0YSA9IGZ1bmN0aW9uKHRyYW5zZm9ybXMpIHtcbiAgdGhpcy50cmFuc2Zvcm1zID0gT2JqZWN0LmFzc2lnbih0aGlzLnRyYW5zZm9ybXMsIHRyYW5zZm9ybXMpXG59XG5cbmV4cG9ydCB7U2NhbGV9XG5cbi8qXG5jb25zdCBTY2FsZSA9IHtcbiAgZXhwb3NlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU2NhbGVDYXBzdWxlKClcbiAgfVxufVxuXG5leHBvcnQge1NjYWxlfVxuXG4qL1xuIiwiaW1wb3J0IHtTY2FsZX0gZnJvbSBcIi4uL2Rpc3Qvc2NhbGUuanNcIlxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zb2xlLmxvZyhTY2FsZSlcblxuICBjb25zdCBzY2FsYWJsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxhYmxlJylcbiAgY29uc3Qgc2NhbGFibGUgPSBuZXcgU2NhbGUoXG4gICAgc2NhbGFibGVFbCxcbiAgICB7XG4gICAgICBzY2FsZUZhY3RvcjogMyxcbiAgICAgIGJlZm9yZVNjYWxlOiBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnYmVmb3JlU2NhbGUnKVxuICAgICAgfSxcbiAgICAgIGFmdGVyU2NhbGU6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhZnRlclNjYWxlJylcbiAgICAgIH0sXG4gICAgICBhY2NvdW50Rm9yVHJhbnNsYXRpb246IGZhbHNlLFxuICAgICAgLy8gZ2V0U2l6ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgIC8vICAgcmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAvLyB9XG4gICAgICB0cmFuc2l0aW9uQ2xhc3M6IFwic2NhbGFibGUtdHJhbnNpdGlvblwiXG4gICAgfVxuICApXG5cbiAgLy8gYW4gaW1wcm92aXNhdGlvbmFsIHRyYW5zbGF0ZSBtZXRob2QsIHRvIGNoZWNrIHRoYXQgdXBkYXRlVHJhbnNmb3JtRGF0YSB3b3Jrcy5cbiAgc2NhbGFibGUudHJhbnNsYXRlID0gZnVuY3Rpb24odHJhbnNsLCBzY2FsZUZhY3Rvcikge1xuICAgIHNjYWxhYmxlLmVsLnN0eWxlLnRyYW5zZm9ybSA9IFwibWF0cml4KFwiKyBzY2FsZUZhY3RvciArXCIsIDAsIDAsIFwiKyBzY2FsZUZhY3RvciArXCIsIFwiKyB0cmFuc2wgK1wiLCBcIisgdHJhbnNsICtcIilcIlxuICAgIC8vIHRyYW5zbGF0ZShzY2FsYWJsZS5lbCwgdHJhbnNsLCBzY2FsZUZhY3RvcilcblxuICAgIGNvbnN0IHRyYW5zbGF0ZUFjdHVhbCA9IHNjYWxhYmxlLmVsLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zbGF0ZUFjdHVhbC5sZW5ndGg7IGkrKykge1xuICAgICAgdHJhbnNsYXRlQWN0dWFsW2ldID0gcGFyc2VGbG9hdCh0cmFuc2xhdGVBY3R1YWxbaV0pO1xuICAgIH1cblxuICAgIHNjYWxhYmxlLnVwZGF0ZVRyYW5zZm9ybURhdGEoe1xuICAgICAgdHJhbnNsYXRlWDogdHJhbnNsYXRlQWN0dWFsWzRdLFxuICAgICAgdHJhbnNsYXRlWTogdHJhbnNsYXRlQWN0dWFsWzVdLFxuICAgIH0pXG4gIH1cblxuICBjb25zb2xlLmxvZyhzY2FsYWJsZSlcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4pXG4iXSwic291cmNlUm9vdCI6IiJ9