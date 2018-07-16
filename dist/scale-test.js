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

ScaleCore.prototype.calculateTransform = function(target, transforms, rects, parent) {

  // project, what rects of el would look like after it's scaled
  const rectsProjected = this.projectRects(target, rects, transforms)

  // adjust the el's translation to fit it in it's container nicely
  const transformsNew = this.encounterBounds(transforms, rectsProjected, parent)

  // update the data
  transformsNew.scaleX = target
  transformsNew.scaleY = target

  return transformsNew
}

ScaleCore.prototype.projectRects = function(target, rects, transforms) {

  // this.coordinates.rects = this.el.getBoundingClientRect();

  // figure out the dimensions for the element to obtain after scaling:
  var ratio = target / transforms.scaleX;

  // we make projection of the future scaled element...
  const rectsProjected = {
    left: (rects.left + rects.width / 2) - (transforms.originX * target),
    top: (rects.top + rects.height / 2) - (transforms.originY * target),
    width: rects.width * ratio,
    height: rects.height * ratio
  }

  return rectsProjected
}

ScaleCore.prototype.encounterBounds = function(transforms, rects, parent) {

  console.log("encounterBounds", arguments)
  var array = [
    {
      length: rects.width,
      pos: rects.left,
      translation: transforms.translateX,
      parent: parent.width // parseInt(getViewportWidth())
    },
    {
      length: rects.height,
      pos: rects.top,
      translation: transforms.translateY,
      parent: parent.height // parseInt(getViewportHeight())
    }
  ]

  for (var i = 0; i < array.length; i++) {
    var temp = process(array[i]);
    // console.log("tweakIt", temp)
    array[i].newPos = (typeof(temp) === 'number') ? temp : array[i].translation;
  }

  const transformsNew = {}

  // Object.assign is es6, but there's a polyfill, in case of anything:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  Object.assign(transformsNew, transforms)

  transformsNew.translateX = array[0].newPos;
  transformsNew.translateY = array[1].newPos;

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

  return transformsNew;
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
  this.transforms = this.core.calculateTransform(target, this.transforms, this.rects, vprtDims)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zY2FsZS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3Rlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBLFdBQVcsb0NBQW9DOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIsMEJBQTBCO0FBQ25EOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFUTs7QUFFUjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQSxXQUFXOztBQUVYOztBQUVBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFdBQVc7QUFDdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVE7O0FBRVI7Ozs7Ozs7Ozs7Ozs7OztBQ25UYzs7QUFFZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEiLCJmaWxlIjoic2NhbGUtdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC90ZXN0LmpzXCIpO1xuIiwiLy8gaW1wb3J0IHtnZXRWaWV3cG9ydFdpZHRoLCBnZXRWaWV3cG9ydEhlaWdodH0gZnJvbSBcInBsdGZybS1saWJcIlxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82OTQyNzg1L3dpbmRvdy1pbm5lcndpZHRoLXZzLWRvY3VtZW50LWRvY3VtZW50ZWxlbWVudC1jbGllbnR3aWR0aFxuLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2Mzg4I2MxNFxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRIZWlnaHQoKSB7XG4gIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA/XG4gICAgTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSA6XG4gICAgd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgIHx8IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5jbGllbnRIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3cG9ydFdpZHRoKCkge1xuICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID9cbiAgICBNYXRoLm1pbih3aW5kb3cuaW5uZXJXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSA6XG4gICAgd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gICAgICB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xpZW50V2lkdGgpO1xufVxuXG5pZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuICAvLyBNdXN0IGJlIHdyaXRhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiB0cnVlXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QsIFwiYXNzaWduXCIsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgdmFyQXJncykgeyAvLyAubGVuZ3RoIG9mIGZ1bmN0aW9uIGlzIDJcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkgeyAvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuXG4gICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG5cbiAgICAgICAgaWYgKG5leHRTb3VyY2UgIT0gbnVsbCkgeyAvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcbiAgICAgICAgICBmb3IgKHZhciBuZXh0S2V5IGluIG5leHRTb3VyY2UpIHtcbiAgICAgICAgICAgIC8vIEF2b2lkIGJ1Z3Mgd2hlbiBoYXNPd25Qcm9wZXJ0eSBpcyBzaGFkb3dlZFxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXh0U291cmNlLCBuZXh0S2V5KSkge1xuICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdG87XG4gICAgfSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIFNjYWxlQ29yZSgpIHtcblxufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLmNhbGN1bGF0ZVRyYW5zZm9ybSA9IGZ1bmN0aW9uKHRhcmdldCwgdHJhbnNmb3JtcywgcmVjdHMsIHBhcmVudCkge1xuXG4gIC8vIHByb2plY3QsIHdoYXQgcmVjdHMgb2YgZWwgd291bGQgbG9vayBsaWtlIGFmdGVyIGl0J3Mgc2NhbGVkXG4gIGNvbnN0IHJlY3RzUHJvamVjdGVkID0gdGhpcy5wcm9qZWN0UmVjdHModGFyZ2V0LCByZWN0cywgdHJhbnNmb3JtcylcblxuICAvLyBhZGp1c3QgdGhlIGVsJ3MgdHJhbnNsYXRpb24gdG8gZml0IGl0IGluIGl0J3MgY29udGFpbmVyIG5pY2VseVxuICBjb25zdCB0cmFuc2Zvcm1zTmV3ID0gdGhpcy5lbmNvdW50ZXJCb3VuZHModHJhbnNmb3JtcywgcmVjdHNQcm9qZWN0ZWQsIHBhcmVudClcblxuICAvLyB1cGRhdGUgdGhlIGRhdGFcbiAgdHJhbnNmb3Jtc05ldy5zY2FsZVggPSB0YXJnZXRcbiAgdHJhbnNmb3Jtc05ldy5zY2FsZVkgPSB0YXJnZXRcblxuICByZXR1cm4gdHJhbnNmb3Jtc05ld1xufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLnByb2plY3RSZWN0cyA9IGZ1bmN0aW9uKHRhcmdldCwgcmVjdHMsIHRyYW5zZm9ybXMpIHtcblxuICAvLyB0aGlzLmNvb3JkaW5hdGVzLnJlY3RzID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAvLyBmaWd1cmUgb3V0IHRoZSBkaW1lbnNpb25zIGZvciB0aGUgZWxlbWVudCB0byBvYnRhaW4gYWZ0ZXIgc2NhbGluZzpcbiAgdmFyIHJhdGlvID0gdGFyZ2V0IC8gdHJhbnNmb3Jtcy5zY2FsZVg7XG5cbiAgLy8gd2UgbWFrZSBwcm9qZWN0aW9uIG9mIHRoZSBmdXR1cmUgc2NhbGVkIGVsZW1lbnQuLi5cbiAgY29uc3QgcmVjdHNQcm9qZWN0ZWQgPSB7XG4gICAgbGVmdDogKHJlY3RzLmxlZnQgKyByZWN0cy53aWR0aCAvIDIpIC0gKHRyYW5zZm9ybXMub3JpZ2luWCAqIHRhcmdldCksXG4gICAgdG9wOiAocmVjdHMudG9wICsgcmVjdHMuaGVpZ2h0IC8gMikgLSAodHJhbnNmb3Jtcy5vcmlnaW5ZICogdGFyZ2V0KSxcbiAgICB3aWR0aDogcmVjdHMud2lkdGggKiByYXRpbyxcbiAgICBoZWlnaHQ6IHJlY3RzLmhlaWdodCAqIHJhdGlvXG4gIH1cblxuICByZXR1cm4gcmVjdHNQcm9qZWN0ZWRcbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5lbmNvdW50ZXJCb3VuZHMgPSBmdW5jdGlvbih0cmFuc2Zvcm1zLCByZWN0cywgcGFyZW50KSB7XG5cbiAgY29uc29sZS5sb2coXCJlbmNvdW50ZXJCb3VuZHNcIiwgYXJndW1lbnRzKVxuICB2YXIgYXJyYXkgPSBbXG4gICAge1xuICAgICAgbGVuZ3RoOiByZWN0cy53aWR0aCxcbiAgICAgIHBvczogcmVjdHMubGVmdCxcbiAgICAgIHRyYW5zbGF0aW9uOiB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVgsXG4gICAgICBwYXJlbnQ6IHBhcmVudC53aWR0aCAvLyBwYXJzZUludChnZXRWaWV3cG9ydFdpZHRoKCkpXG4gICAgfSxcbiAgICB7XG4gICAgICBsZW5ndGg6IHJlY3RzLmhlaWdodCxcbiAgICAgIHBvczogcmVjdHMudG9wLFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zZm9ybXMudHJhbnNsYXRlWSxcbiAgICAgIHBhcmVudDogcGFyZW50LmhlaWdodCAvLyBwYXJzZUludChnZXRWaWV3cG9ydEhlaWdodCgpKVxuICAgIH1cbiAgXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVtcCA9IHByb2Nlc3MoYXJyYXlbaV0pO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidHdlYWtJdFwiLCB0ZW1wKVxuICAgIGFycmF5W2ldLm5ld1BvcyA9ICh0eXBlb2YodGVtcCkgPT09ICdudW1iZXInKSA/IHRlbXAgOiBhcnJheVtpXS50cmFuc2xhdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRyYW5zZm9ybXNOZXcgPSB7fVxuXG4gIC8vIE9iamVjdC5hc3NpZ24gaXMgZXM2LCBidXQgdGhlcmUncyBhIHBvbHlmaWxsLCBpbiBjYXNlIG9mIGFueXRoaW5nOlxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduXG4gIE9iamVjdC5hc3NpZ24odHJhbnNmb3Jtc05ldywgdHJhbnNmb3JtcylcblxuICB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZVggPSBhcnJheVswXS5uZXdQb3M7XG4gIHRyYW5zZm9ybXNOZXcudHJhbnNsYXRlWSA9IGFycmF5WzFdLm5ld1BvcztcblxuICBmdW5jdGlvbiBwcm9jZXNzKGF4aXMpIHtcblxuICAgIGlmIChheGlzLmxlbmd0aCA8PSBheGlzLnBhcmVudCkge1xuICAgICAgaWYgKGF4aXMucG9zID4gKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiAoIGF4aXMudHJhbnNsYXRpb24gLSAoYXhpcy5wb3MgLSAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpICk7XG4gICAgICB9IGVsc2UgaWYgKGF4aXMucG9zIDwgKDApKSB7XG4gICAgICAgIHJldHVybiAoIGF4aXMudHJhbnNsYXRpb24gKyBNYXRoLmFicyhheGlzLnBvcykgKyAyICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChheGlzLmxlbmd0aCA+IGF4aXMucGFyZW50KSB7XG4gICAgICBpZiAoYXhpcy5wb3MgPiAoMCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiAtIGF4aXMucG9zICk7XG4gICAgICB9IGVsc2UgaWYgKGF4aXMucG9zIDwgKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiAoIChheGlzLnRyYW5zbGF0aW9uICsgKCBNYXRoLmFicyhheGlzLnBvcykgLSBNYXRoLmFicyhheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSApKSApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJhbnNmb3Jtc05ldztcbiAgLy90aGlzLmVsZW1lbnQuY3NzKCAndHJhbnNmb3JtJywgJ21hdHJpeCgnICsgY29vcmRzLnNjYWxlWCArICcsIDAsIDAsICcgKyBjb29yZHMuc2NhbGVZICsgICcsICcgKyB4Lm5ld1BvcyArICcsICcgKyB5Lm5ld1BvcyArICcpJyApO1xuXG59XG5cbmV4cG9ydCB7U2NhbGVDb3JlfVxuXG4vKlxuY29uc3QgU2NhbGVDb3JlID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTY2FsZUNvcmVDYXBzdWxlKClcbiAgfVxufVxuXG4vLyBleHBvcnQge1NjYWxlQ29yZUNhcHN1bGV9XG4qL1xuXG5mdW5jdGlvbiBTY2FsZURvbUlvKCkge31cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuaW5pdGlhbGl6ZUVsZW1lbnRzTWF0cml4ID0gZnVuY3Rpb24oZWwpIHtcbiAgLy8gc2V0IHRoZSBpbml0aWFsIHZhbHVlIG9mIHRyYW5zZm9ybSB0byBtYXRyaXg7XG4gIGNvbnN0IG1hdHJpeFN0ciA9ICdtYXRyaXgoMSwgMCwgMCwgMSwgMCwgMCknXG5cbiAgdGhpcy5kb1NldE1hdHJpeChlbCwgbWF0cml4U3RyKVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm1zID0gZnVuY3Rpb24oZWwpIHtcbiAgLy8gZ2V0IHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBvcmlnaW5cbiAgY29uc3Qgb3JpZ2luID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyd0cmFuc2Zvcm0tb3JpZ2luJ10uc3BsaXQoJyAnKVxuXG4gIHJldHVybiB7XG4gICAgLy8gcmVjdHM6IHRoaXMuZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgc2NhbGVYOiAxLFxuICAgIHNjYWxlWTogMSxcbiAgICBvcmlnaW5YOiBwYXJzZUludChvcmlnaW5bMF0pLFxuICAgIG9yaWdpblk6IHBhcnNlSW50KG9yaWdpblsxXSksXG4gICAgdHJhbnNsYXRlWDogMCxcbiAgICB0cmFuc2xhdGVZOiAwXG4gICAgICAvLyBvZmZzZXQ6IHtcbiAgICAgIC8vICAgeDogMCxcbiAgICAgIC8vICAgeTogMFxuICAgICAgLy8gfVxuICB9XG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmdldFJlY3RzID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLnNldE1hdHJpeCA9IGZ1bmN0aW9uKGVsLCB0cmFuc2Zvcm1zKSB7XG4gIGNvbnNvbGUubG9nKCdzZXRNYXRyaXgnLCB0cmFuc2Zvcm1zKVxuICBjb25zdCBtYXRyaXhTdHIgPSAnbWF0cml4KCcgK1xuICAgIHRyYW5zZm9ybXMuc2NhbGVYICsgJywgMCwgMCwgJyArXG4gICAgdHJhbnNmb3Jtcy5zY2FsZVkgKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVggKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVkgK1xuICAgICcpJ1xuXG4gIHRoaXMuZG9TZXRNYXRyaXgoZWwsIG1hdHJpeFN0cilcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZG9TZXRNYXRyaXggPSBmdW5jdGlvbihlbCwgbWF0cml4U3RyKSB7XG4gIGNvbnNvbGUubG9nKCdzZXRNYXRyaXgnLCBtYXRyaXhTdHIpXG4gIGVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5tb3pUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUubXNUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUub1RyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBtYXRyaXhTdHJcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0Vmlld3BvcnREaW1zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IGdldFZpZXdwb3J0V2lkdGgoKSxcbiAgICBoZWlnaHQ6IGdldFZpZXdwb3J0SGVpZ2h0KClcbiAgfVxufVxuXG5leHBvcnQge1NjYWxlRG9tSW99XG5cbi8qXG5jb25zdCBTY2FsZURvbUlvID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkgeyAvLyB1bnZlaWxcbiAgICByZXR1cm4gU2NhbGVEb21Jb0NhcHN1bGUoKVxuICB9XG59XG5cbi8vIGV4cG9ydCB7U2NhbGVEb21Jb0NhcHN1bGV9XG5cbiovXG5cbi8vIGltcG9ydCB7TWVhc3VyZUFsdGVyfSBmcm9tIFwiZG9tXCJcbi8vIGltcG9ydCB7Q2FsY3VsYXRvcn0gZnJvbSBcImNhbGN1bGF0b3JcIlxuLy9cbi8vIGNvbnN0IE1lYXN1cmVBbHRlciA9IE1lYXN1cmVBbHRlci5pbml0KClcbi8vIGNvbnN0IENhbGN1bGF0b3IgPSBDYWxjdWxhdG9yLmluaXQoKVxuXG4vLyBjb25zdCBTY2FsZUNvcmUgPSBTY2FsZUNvcmUuZXhwb3NlKClcbi8vIGNvbnN0IFNjYWxlRG9tSW8gPSBTY2FsZURvbUlvLmV4cG9zZSgpXG5cbmZ1bmN0aW9uIFNjYWxlQ2Fwc3VsZSgpIHtcbn1cblxuZnVuY3Rpb24gU2NhbGUoZWwsIG9wdGlvbnMpIHtcbiAgdGhpcy5lbCA9IGVsXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdGhpcy5zY2FsZUZhY3RvciA9IG9wdGlvbnMuc2NhbGVGYWN0b3I7XG4gIHRoaXMudHJhbnNpdGlvbkNsYXNzID0gb3B0aW9ucy50cmFuc2l0aW9uQ2xhc3MgfHwgJ3NjYWxhYmxlLXRyYW5zaXRpb24nXG5cbiAgdGhpcy5jb3JlID0gbmV3IFNjYWxlQ29yZSgpXG4gIHRoaXMuZG9tSW8gPSBuZXcgU2NhbGVEb21JbygpXG5cbiAgLy8gc2V0IHRoZSBpbml0aWFsIHZhbHVlIG9mIHRyYW5zZm9ybSB0byBtYXRyaXgsIGluIHRoZSBlbGVtZW50XG4gIHRoaXMuZG9tSW8uaW5pdGlhbGl6ZUVsZW1lbnRzTWF0cml4KHRoaXMuZWwpXG5cbiAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5kb21Jby5nZXRUcmFuc2Zvcm1zKHRoaXMuZWwpXG4gIHRoaXMucmVjdHMgPSB0aGlzLmRvbUlvLmdldFJlY3RzKHRoaXMuZWwpXG59XG5cblNjYWxlLnByb3RvdHlwZS5zY2FsZVVwID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZG9TY2FsZSh0aGlzLnNjYWxlRmFjdG9yLCB0cnVlKVxufVxuXG5TY2FsZS5wcm90b3R5cGUuc2NhbGVEb3duID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZG9TY2FsZSgxLCBmYWxzZSlcbn1cblxuU2NhbGUucHJvdG90eXBlLmRvU2NhbGUgPSBmdW5jdGlvbih0YXJnZXQsIHNjYWxlZFVwKSB7XG5cbiAgLy8gdXBkYXRlIG91ciByZWN0cyBkYXRhLCBpbiBjYXNlIG9mIGFueXRoaW5nXG4gIHRoaXMucmVjdHMgPSB0aGlzLmRvbUlvLmdldFJlY3RzKHRoaXMuZWwpXG4gIGNvbnN0IHZwcnREaW1zID0gdGhpcy5kb21Jby5nZXRWaWV3cG9ydERpbXMoKVxuICB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmNvcmUuY2FsY3VsYXRlVHJhbnNmb3JtKHRhcmdldCwgdGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB2cHJ0RGltcylcblxuICBjb25zdCBzZWxmID0gdGhpc1xuICBmdW5jdGlvbiB0cm5zbkVuZENiKCkge1xuICAgIHNlbGYuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgdHJuc25FbmRDYilcbiAgICBzZWxmLmVsLmNsYXNzTGlzdC5yZW1vdmUoc2VsZi50cmFuc2l0aW9uQ2xhc3MpXG5cbiAgICBzZWxmLnJlY3RzID0gc2VsZi5kb21Jby5nZXRSZWN0cyhzZWxmLmVsKVxuICAgIHNlbGYuc2NhbGVkVXAgPSBzY2FsZWRVcFxuXG4gICAgaWYgKHNlbGYub3B0aW9ucy5hZnRlclNjYWxlKVxuICAgICAgc2VsZi5vcHRpb25zLmFmdGVyU2NhbGUoc2VsZi5lbCk7XG4gIH1cblxuICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0cm5zbkVuZENiKVxuXG4gIGlmICh0aGlzLm9wdGlvbnMuYmVmb3JlU2NhbGUpXG4gICAgdGhpcy5vcHRpb25zLmJlZm9yZVNjYWxlKHRoaXMucmVjdHMpXG5cbiAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKHRoaXMudHJhbnNpdGlvbkNsYXNzKVxuICB0aGlzLmRvbUlvLnNldE1hdHJpeCh0aGlzLmVsLCB0aGlzLnRyYW5zZm9ybXMpXG59XG5cblNjYWxlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm1EYXRhID0gZnVuY3Rpb24odHJhbnNmb3Jtcykge1xuICB0aGlzLnRyYW5zZm9ybXMgPSBPYmplY3QuYXNzaWduKHRoaXMudHJhbnNmb3JtcywgdHJhbnNmb3Jtcylcbn1cblxuZXhwb3J0IHtTY2FsZX1cblxuLypcbmNvbnN0IFNjYWxlID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTY2FsZUNhcHN1bGUoKVxuICB9XG59XG5cbmV4cG9ydCB7U2NhbGV9XG5cbiovXG4iLCJpbXBvcnQge1NjYWxlfSBmcm9tIFwiLi4vZGlzdC9zY2FsZS5qc1wiXG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnNvbGUubG9nKFNjYWxlKVxuXG4gIGNvbnN0IHNjYWxhYmxlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGFibGUnKVxuICBjb25zdCBzY2FsYWJsZSA9IG5ldyBTY2FsZShcbiAgICBzY2FsYWJsZUVsLFxuICAgIHtcbiAgICAgIHNjYWxlRmFjdG9yOiAzLFxuICAgICAgYmVmb3JlU2NhbGU6IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdiZWZvcmVTY2FsZScpXG4gICAgICB9LFxuICAgICAgYWZ0ZXJTY2FsZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FmdGVyU2NhbGUnKVxuICAgICAgfSxcbiAgICAgIGFjY291bnRGb3JUcmFuc2xhdGlvbjogZmFsc2UsXG4gICAgICAvLyBnZXRTaXplOiBmdW5jdGlvbihlbCkge1xuICAgICAgLy8gICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIC8vIH1cbiAgICAgIHRyYW5zaXRpb25DbGFzczogXCJzY2FsYWJsZS10cmFuc2l0aW9uXCJcbiAgICB9XG4gIClcblxuICAvLyBhbiBpbXByb3Zpc2F0aW9uYWwgdHJhbnNsYXRlIG1ldGhvZCwgdG8gY2hlY2sgdGhhdCB1cGRhdGVUcmFuc2Zvcm1EYXRhIHdvcmtzLlxuICBzY2FsYWJsZS50cmFuc2xhdGUgPSBmdW5jdGlvbih0cmFuc2wsIHNjYWxlRmFjdG9yKSB7XG4gICAgc2NhbGFibGUuZWwuc3R5bGUudHJhbnNmb3JtID0gXCJtYXRyaXgoXCIrIHNjYWxlRmFjdG9yICtcIiwgMCwgMCwgXCIrIHNjYWxlRmFjdG9yICtcIiwgXCIrIHRyYW5zbCArXCIsIFwiKyB0cmFuc2wgK1wiKVwiXG4gICAgLy8gdHJhbnNsYXRlKHNjYWxhYmxlLmVsLCB0cmFuc2wsIHNjYWxlRmFjdG9yKVxuXG4gICAgY29uc3QgdHJhbnNsYXRlQWN0dWFsID0gc2NhbGFibGUuZWwuc3R5bGUudHJhbnNmb3JtLnNwbGl0KCcoJylbMV0uc3BsaXQoJyknKVswXS5zcGxpdCgnLCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhbnNsYXRlQWN0dWFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cmFuc2xhdGVBY3R1YWxbaV0gPSBwYXJzZUZsb2F0KHRyYW5zbGF0ZUFjdHVhbFtpXSk7XG4gICAgfVxuXG4gICAgc2NhbGFibGUudXBkYXRlVHJhbnNmb3JtRGF0YSh7XG4gICAgICB0cmFuc2xhdGVYOiB0cmFuc2xhdGVBY3R1YWxbNF0sXG4gICAgICB0cmFuc2xhdGVZOiB0cmFuc2xhdGVBY3R1YWxbNV0sXG4gICAgfSlcbiAgfVxuXG4gIGNvbnNvbGUubG9nKHNjYWxhYmxlKVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbWFpbilcbiJdLCJzb3VyY2VSb290IjoiIn0=