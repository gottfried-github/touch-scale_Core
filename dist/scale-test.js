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

/***/ "../emulate-pinch/dist/emulate-pinch.js":
/*!**********************************************!*\
  !*** ../emulate-pinch/dist/emulate-pinch.js ***!
  \**********************************************/
/*! exports provided: pinchEmulator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pinchEmulator", function() { return pinchEmulator; });
const pinchEmulator = {
  subscribe: function() {
    const self = this

    function onmousemove(ev) {
      console.log("mousemove")
      // console.log("mousemove", self)

      if (typeof(self.onmove) === "function")
        self.onmove(self.movePinch(ev))
      // console.log(this.movePinch(ev))
    }

    const bodyEl = document.querySelector("body")

    bodyEl.addEventListener("mousedown", (ev) => {
      // console.log("mousedown")
      if (typeof(this.onstart) === "function")
        this.onstart(this.initPinch(ev))

      // console.log(pinchEmulator.initPinch(ev))
      bodyEl.addEventListener("mousemove", onmousemove)
    })

    bodyEl.addEventListener("mouseup", (ev) => {
      if (typeof(this.onend) === "function")
        this.onend(this.endPinch(ev))

      bodyEl.removeEventListener("mousemove", onmousemove)
    })
  },
  pointsOffset: 75,
  initPinch: function(ev) {
    this.initial = {
      center: {
        x: ev.pageX,
        y: ev.pageY
      },

    }

    this.initial.pointLeft = this.initial.center.x - this.pointsOffset
    this.initial.pointRight = this.initial.center.x + this.pointsOffset

    this.initial.distance = this.initial.pointRight - this.initial.pointLeft

    // console.log("initPinch", this.initial)
    this.pointLeft = this.initial.pointLeft
    this.pointRight = this.initial.pointRight

    this.scale = 1

    return {
      scale: this.scale,
      center: this.initial.center
    }
  },
  movePinch: function(ev) {
    const dx = ev.pageX - this.initial.center.x // Math.abs()
    // console.log("initCenter, ev.pageX, dx", this.initial.center.x, ev.pageX, dx)

    this.pointLeft = this.initial.pointLeft - dx // Math.abs(dx)
    this.pointRight = this.initial.pointRight + dx // Math.abs(dx)

    const distance = this.pointRight - this.pointLeft
    // console.log("distance, pL, pR", distance, this.pointLeft, this.pointRight)

    this.scale = distance / this.initial.distance

    return {
      scale: this.scale,

      // center.y is not calculated properly, but we have to return center in this form
      center: {x: this.initial.center.x, y: this.initial.center.y}
      // {x: this.initial.center.x + dx / 2, y: this.initial.center.y}
    }
  },
  endPinch: function(ev) {
    return this.movePinch(ev)
  }
}




/***/ }),

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
  this.anchor = {
    scale: {
      x: 1, y: 1
    }
  }
}

ScaleCore.prototype.initializeMovement = function(gesture, transforms, rects) {

  /*
  initialize the occuring gesture:
  */

  // capture the initial coordinates of ev and el
  this.anchor.center = gesture.center

  // map ev's position to the appropriate (proper) transform-origin value (which is always in scale of 1)
  // (map ev's position onto the el's matrix)
  const newOrigin = this.mapToOrigin(gesture.center, transforms, rects)


  // annigilate shifting of the element on origin change
  const translate = this.annigilateShift(newOrigin, transforms)
  // const translate = transforms.translate

  this.anchor.translate = translate

  // console.log("initMovement - origin, translate, anchor", origin, translate, this.anchor)
  return {
    translate: translate, // transforms.translate,
    origin: newOrigin
  }
}

// calculate a discrete point in the move
ScaleCore.prototype.calculateDiscretePoint = function(gesture, transforms) {
  // console.log("core, calculateDiscretePoint - gesture, transforms, anchor:", gesture, transforms, this.anchor)
  // console.log("core, calculateDiscretePoint - translate.x, ~y:", transforms.translate.x, transforms.translate.y)
  // console.log("core, calculateDiscretePoint - anchor.translate.x, ~y:", this.anchor.translate.x, this.anchor.translate.y)
  const scale = {}
  const translate = {}

  // hammer's scale starts with 0, emulate-pinch - from 1
  scale.x = this.anchor.scale.x * gesture.scale;
  scale.y = this.anchor.scale.y * gesture.scale;

  // transforms.scaleX = this.anchor.scaleX * gesture.scale;
  // transforms.scaleY = this.anchor.scaleY * gesture.scale;

  translate.x = this.anchor.translate.x + (gesture.center.x - this.anchor.center.x);
  translate.y = this.anchor.translate.y + (gesture.center.y - this.anchor.center.y);

  // console.log("core, calculateDiscretePoint - translate:", translate)
  return {
    scale: scale,
    translate: translate
  }
}

ScaleCore.prototype.finishMovement = function(gesture, transforms) {

  const transformsNew = this.calculateDiscretePoint(gesture, transforms)

  // anchor the scale value, to use as point of departure in next movement
  this.anchor.scale = transformsNew.scale

  return transformsNew
}

ScaleCore.prototype.mapToOrigin = function(gestureCenter, transforms, rects) {
  // determine point's position, relative to the scalable element
  const pointPosWithinEl = {
    left: gestureCenter.x - rects.left,
    top: gestureCenter.y - rects.top
  }

  // map point's position to the appropriate (proper) transform-origin value (which is always in scale of 1)
  const origin = {
    x: pointPosWithinEl.left / transforms.scale.x,
    y: pointPosWithinEl.top / transforms.scale.y
  }

  return origin
}

ScaleCore.prototype.annigilateShift = function(origin, transforms) {

  // 150 is (if I recall it right) half of the element's size (no idea why that
  // needs or needs not to be the case)

  // in fact, 150 is full size of the element
  const translate = {
    x: ((origin.x - 50) * transforms.scale.x - (origin.x - 50)), //  + transforms.offset.x
    y: ((origin.y - 50) * transforms.scale.y - (origin.y - 50)) //  + transforms.offset.y
  }

  return translate
}

ScaleCore.prototype.encounterBounds = function(transforms, rects, parent) {

  var array = [
    {
      length: rects.width,
      pos: rects.left,
      translation: transforms.translate.x,
      parent: parent.width // parseInt(getViewportWidth())
    },
    {
      length: rects.height,
      pos: rects.top,
      translation: transforms.translate.y,
      parent: parent.height // parseInt(getViewportHeight())
    }
  ]

  for (var i = 0; i < array.length; i++) {
    var temp = process(array[i]);
    // console.log("tweakIt", temp)
    array[i].newPos = (typeof(temp) === 'number') ? temp : array[i].translation;
  }

  const translate = {
    x: array[0].newPos,
    y: array[1].newPos
  }

  // Object.assign is es6, but there's a polyfill, in case of anything:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  // Object.assign(transformsNew, transforms)

  // transformsNew.translateX = array[0].newPos;
  // transformsNew.translateY = array[1].newPos;

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

  return translate

  // return transformsNew;
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

ScaleDomIo.prototype.getOrigin = function(el) {
  const originData = window.getComputedStyle(el)['transform-origin'].split(' ')

  const origin = {
    x: parseInt(originData[0]),
    y: parseInt(originData[1])
  }

  return origin
}

ScaleDomIo.prototype.getTransforms = function(el) {
  const transforms = {}
  const transformsData = el.style.transform.split('(')[1].split(')')[0].split(',');

  transforms.scale = {
    x: parseFloat(transformsData[0]),
    y: parseFloat(transformsData[3])
  }

  transforms.translate = {
    x: parseFloat(transformsData[4]),
    y: parseFloat(transformsData[5])
  }

  return transforms
}

ScaleDomIo.prototype.getRects = function(el) {
  return el.getBoundingClientRect()
}

ScaleDomIo.prototype.getViewportDims = function() {
  return {
    width: getViewportWidth(),
    height: getViewportHeight()
  }
}

ScaleDomIo.prototype.setMatrix = function(el, transforms) {
  console.log('setMatrix', transforms)
  const matrixStr = 'matrix(' +
    transforms.scale.x + ', 0, 0, ' +
    transforms.scale.y + ', ' +
    transforms.translate.x + ', ' +
    transforms.translate.y +
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

ScaleDomIo.prototype.setOrigin = function(el, origin) {
  el.style.transformOrigin = origin.x+ "px "+ origin.y+ "px"
}

ScaleDomIo.prototype.initializeElementsMatrix = function(el) {
  // set the initial value of transform to matrix;
  const matrixStr = 'matrix(1, 0, 0, 1, 0, 0)'
  this.doSetMatrix(el, matrixStr)
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
  // this.scaleFactor = options.scaleFactor;
  // this.transitionClass = options.transitionClass || 'scalable-transition'

  this.core = new ScaleCore()
  this.domIo = new ScaleDomIo()

  // set the initial value of transform to matrix, in the element
  this.domIo.initializeElementsMatrix(this.el)

  this.transforms = this.domIo.getTransforms(this.el)
  this.origin = this.domIo.getOrigin(this.el)
  this.rects = this.domIo.getRects(this.el)

  // console.log("scaler: ", this)
}

Scale.prototype.scaleStart = function(gesture) {
  // console.log("scaleStart, gesture: ", gesture)
  const coords = this.core.initializeMovement(gesture, this.transforms, this.rects, this.origin)
  // console.log("scaleStart, initMovement return", coords)

  this.transforms.translate = coords.translate
  this.origin = coords.origin

  this.domIo.setOrigin(this.el, this.origin)
  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.scaleMove = function(gesture) {
  // console.log("scaleMove, gesture: ", gesture)
  const calculated = this.core.calculateDiscretePoint(gesture, this.transforms)

  this.transforms.scale = calculated.scale
  this.transforms.translate = calculated.translate

  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.scaleStop = function(gesture) {
  // console.log("scaleStop, gesture: ", gesture)
  this.transforms = this.core.finishMovement(gesture, this.transforms)

  const vprtDims = this.domIo.getViewportDims()

  // see, if el exceeds parent's area in an ugly way
  const translateBound = this.core.encounterBounds(this.transforms, this.rects, vprtDims)

  // this.transforms.translate = translateBound
  this.domIo.setMatrix(this.el, this.transforms)
  this.rects = this.domIo.getRects(this.el)

  // if (
  //   transformsBounded.translateX != this.transforms.translateX
  //   || transformsBounded.translateY != this.transforms.translateY
  // ) {
  //   this.tweenIn()
  // }
}

Scale.prototype.updateTransformData = function(transforms) {
  this.transforms = Object.assign(this.transforms, transforms)
}

/*

Scale.prototype.rAf = function() {
  var rafId = 0
  rafCb = function() {

    const rafIdPrev = rafId
    rafId = window.requestAnimationFrame(() => {

      // prevent multiple simultaneuos rAfs
      if (rafId == rafIdPrev) return

      // do our animation

      const val = this.range.getNext()
      this.transforms.translateX = val
      this.transforms.translateY = val
      rafCb()
    })
  }
}

Scale.prototype.tweenIn = function() {

    var value = new Range(
      // length of the range
      transformsBound.translateX - this.transforms.translateX,

      // points to go from and to
      {
        from: this.transforms.translateY,
        to: transformsBound.translateY
      },

      // current position
      this.transforms.translateX
    )
}
*/




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
/* harmony import */ var emulate_pinch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emulate-pinch */ "../emulate-pinch/dist/emulate-pinch.js");



function main() {
  console.log(_dist_scale_js__WEBPACK_IMPORTED_MODULE_0__["Scale"])

  const el = document.querySelector('.scalable')
  const scaler = new _dist_scale_js__WEBPACK_IMPORTED_MODULE_0__["Scale"](el)

  // an improvisational translate method, to check that updateTransformData works.
  scaler.translate = function(transl, scaleFactor) {
    // scaler.el.style.transform = "matrix("+ scaleFactor +", 0, 0, "+ scaleFactor +", "+ transl +", "+ transl +")"
    // translate(scalable.el, transl, scaleFactor)

    scaler.domIo.setMatrix(el, {
      translate: {
        x: transl,
        y: transl
      },
      scale: {
        x: scaleFactor,
        y: scaleFactor
      }
    })

    const transforms = scaler.domIo.getTransforms()

    scalable.updateTransformData(transforms)
  }

  //
  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].onstart = function(ev) {
    // console.log("onstart", ev)
    scaler.scaleStart(ev)
  }

  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].onmove = function(ev) {
    // console.log("onmove", ev)
    scaler.scaleMove(ev)
  }

  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].onend = function(ev) {
    // console.log("onend", ev)
    scaler.scaleStop(ev)
  }

  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].subscribe()

}

window.addEventListener("load", main)


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2VtdWxhdGUtcGluY2gvZGlzdC9lbXVsYXRlLXBpbmNoLmpzIiwid2VicGFjazovLy8uL2Rpc3Qvc2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmLFVBQVU7QUFDVjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFUTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGUjtBQUFBLFdBQVcsb0NBQW9DOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIsMEJBQTBCO0FBQ25EOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7O0FBRVI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWDs7QUFFQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFROztBQUVSOzs7Ozs7Ozs7Ozs7Ozs7O0FDcmJjO0FBQ1E7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBIiwiZmlsZSI6InNjYWxlLXRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3QvdGVzdC5qc1wiKTtcbiIsImNvbnN0IHBpbmNoRW11bGF0b3IgPSB7XG4gIHN1YnNjcmliZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAgIGZ1bmN0aW9uIG9ubW91c2Vtb3ZlKGV2KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm1vdXNlbW92ZVwiKVxuICAgICAgLy8gY29uc29sZS5sb2coXCJtb3VzZW1vdmVcIiwgc2VsZilcblxuICAgICAgaWYgKHR5cGVvZihzZWxmLm9ubW92ZSkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgc2VsZi5vbm1vdmUoc2VsZi5tb3ZlUGluY2goZXYpKVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tb3ZlUGluY2goZXYpKVxuICAgIH1cblxuICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpXG5cbiAgICBib2R5RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXYpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW91c2Vkb3duXCIpXG4gICAgICBpZiAodHlwZW9mKHRoaXMub25zdGFydCkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhpcy5vbnN0YXJ0KHRoaXMuaW5pdFBpbmNoKGV2KSlcblxuICAgICAgLy8gY29uc29sZS5sb2cocGluY2hFbXVsYXRvci5pbml0UGluY2goZXYpKVxuICAgICAgYm9keUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25tb3VzZW1vdmUpXG4gICAgfSlcblxuICAgIGJvZHlFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXYpID0+IHtcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vbmVuZCkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhpcy5vbmVuZCh0aGlzLmVuZFBpbmNoKGV2KSlcblxuICAgICAgYm9keUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25tb3VzZW1vdmUpXG4gICAgfSlcbiAgfSxcbiAgcG9pbnRzT2Zmc2V0OiA3NSxcbiAgaW5pdFBpbmNoOiBmdW5jdGlvbihldikge1xuICAgIHRoaXMuaW5pdGlhbCA9IHtcbiAgICAgIGNlbnRlcjoge1xuICAgICAgICB4OiBldi5wYWdlWCxcbiAgICAgICAgeTogZXYucGFnZVlcbiAgICAgIH0sXG5cbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYWwucG9pbnRMZWZ0ID0gdGhpcy5pbml0aWFsLmNlbnRlci54IC0gdGhpcy5wb2ludHNPZmZzZXRcbiAgICB0aGlzLmluaXRpYWwucG9pbnRSaWdodCA9IHRoaXMuaW5pdGlhbC5jZW50ZXIueCArIHRoaXMucG9pbnRzT2Zmc2V0XG5cbiAgICB0aGlzLmluaXRpYWwuZGlzdGFuY2UgPSB0aGlzLmluaXRpYWwucG9pbnRSaWdodCAtIHRoaXMuaW5pdGlhbC5wb2ludExlZnRcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiaW5pdFBpbmNoXCIsIHRoaXMuaW5pdGlhbClcbiAgICB0aGlzLnBvaW50TGVmdCA9IHRoaXMuaW5pdGlhbC5wb2ludExlZnRcbiAgICB0aGlzLnBvaW50UmlnaHQgPSB0aGlzLmluaXRpYWwucG9pbnRSaWdodFxuXG4gICAgdGhpcy5zY2FsZSA9IDFcblxuICAgIHJldHVybiB7XG4gICAgICBzY2FsZTogdGhpcy5zY2FsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5pbml0aWFsLmNlbnRlclxuICAgIH1cbiAgfSxcbiAgbW92ZVBpbmNoOiBmdW5jdGlvbihldikge1xuICAgIGNvbnN0IGR4ID0gZXYucGFnZVggLSB0aGlzLmluaXRpYWwuY2VudGVyLnggLy8gTWF0aC5hYnMoKVxuICAgIC8vIGNvbnNvbGUubG9nKFwiaW5pdENlbnRlciwgZXYucGFnZVgsIGR4XCIsIHRoaXMuaW5pdGlhbC5jZW50ZXIueCwgZXYucGFnZVgsIGR4KVxuXG4gICAgdGhpcy5wb2ludExlZnQgPSB0aGlzLmluaXRpYWwucG9pbnRMZWZ0IC0gZHggLy8gTWF0aC5hYnMoZHgpXG4gICAgdGhpcy5wb2ludFJpZ2h0ID0gdGhpcy5pbml0aWFsLnBvaW50UmlnaHQgKyBkeCAvLyBNYXRoLmFicyhkeClcblxuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5wb2ludFJpZ2h0IC0gdGhpcy5wb2ludExlZnRcbiAgICAvLyBjb25zb2xlLmxvZyhcImRpc3RhbmNlLCBwTCwgcFJcIiwgZGlzdGFuY2UsIHRoaXMucG9pbnRMZWZ0LCB0aGlzLnBvaW50UmlnaHQpXG5cbiAgICB0aGlzLnNjYWxlID0gZGlzdGFuY2UgLyB0aGlzLmluaXRpYWwuZGlzdGFuY2VcblxuICAgIHJldHVybiB7XG4gICAgICBzY2FsZTogdGhpcy5zY2FsZSxcblxuICAgICAgLy8gY2VudGVyLnkgaXMgbm90IGNhbGN1bGF0ZWQgcHJvcGVybHksIGJ1dCB3ZSBoYXZlIHRvIHJldHVybiBjZW50ZXIgaW4gdGhpcyBmb3JtXG4gICAgICBjZW50ZXI6IHt4OiB0aGlzLmluaXRpYWwuY2VudGVyLngsIHk6IHRoaXMuaW5pdGlhbC5jZW50ZXIueX1cbiAgICAgIC8vIHt4OiB0aGlzLmluaXRpYWwuY2VudGVyLnggKyBkeCAvIDIsIHk6IHRoaXMuaW5pdGlhbC5jZW50ZXIueX1cbiAgICB9XG4gIH0sXG4gIGVuZFBpbmNoOiBmdW5jdGlvbihldikge1xuICAgIHJldHVybiB0aGlzLm1vdmVQaW5jaChldilcbiAgfVxufVxuXG5leHBvcnQge3BpbmNoRW11bGF0b3J9XG4iLCIvLyBpbXBvcnQge2dldFZpZXdwb3J0V2lkdGgsIGdldFZpZXdwb3J0SGVpZ2h0fSBmcm9tIFwicGx0ZnJtLWxpYlwiXG5cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzY5NDI3ODUvd2luZG93LWlubmVyd2lkdGgtdnMtZG9jdW1lbnQtZG9jdW1lbnRlbGVtZW50LWNsaWVudHdpZHRoXG4vLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTYzODgjYzE0XG5mdW5jdGlvbiBnZXRWaWV3cG9ydEhlaWdodCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0ID9cbiAgICBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpIDpcbiAgICB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICAgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsaWVudEhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGdldFZpZXdwb3J0V2lkdGgoKSB7XG4gIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggP1xuICAgIE1hdGgubWluKHdpbmRvdy5pbm5lcldpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpIDpcbiAgICB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgIHx8IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5jbGllbnRXaWR0aCk7XG59XG5cbmlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPSAnZnVuY3Rpb24nKSB7XG4gIC8vIE11c3QgYmUgd3JpdGFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCwgXCJhc3NpZ25cIiwge1xuICAgIHZhbHVlOiBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCB2YXJBcmdzKSB7IC8vIC5sZW5ndGggb2YgZnVuY3Rpb24gaXMgMlxuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7IC8vIFR5cGVFcnJvciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG5cbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblxuICAgICAgICBpZiAobmV4dFNvdXJjZSAhPSBudWxsKSB7IC8vIFNraXAgb3ZlciBpZiB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gbmV4dFNvdXJjZSkge1xuICAgICAgICAgICAgLy8gQXZvaWQgYnVncyB3aGVuIGhhc093blByb3BlcnR5IGlzIHNoYWRvd2VkXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5leHRTb3VyY2UsIG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0bztcbiAgICB9LFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gU2NhbGVDb3JlKCkge1xuICB0aGlzLmFuY2hvciA9IHtcbiAgICBzY2FsZToge1xuICAgICAgeDogMSwgeTogMVxuICAgIH1cbiAgfVxufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLmluaXRpYWxpemVNb3ZlbWVudCA9IGZ1bmN0aW9uKGdlc3R1cmUsIHRyYW5zZm9ybXMsIHJlY3RzKSB7XG5cbiAgLypcbiAgaW5pdGlhbGl6ZSB0aGUgb2NjdXJpbmcgZ2VzdHVyZTpcbiAgKi9cblxuICAvLyBjYXB0dXJlIHRoZSBpbml0aWFsIGNvb3JkaW5hdGVzIG9mIGV2IGFuZCBlbFxuICB0aGlzLmFuY2hvci5jZW50ZXIgPSBnZXN0dXJlLmNlbnRlclxuXG4gIC8vIG1hcCBldidzIHBvc2l0aW9uIHRvIHRoZSBhcHByb3ByaWF0ZSAocHJvcGVyKSB0cmFuc2Zvcm0tb3JpZ2luIHZhbHVlICh3aGljaCBpcyBhbHdheXMgaW4gc2NhbGUgb2YgMSlcbiAgLy8gKG1hcCBldidzIHBvc2l0aW9uIG9udG8gdGhlIGVsJ3MgbWF0cml4KVxuICBjb25zdCBuZXdPcmlnaW4gPSB0aGlzLm1hcFRvT3JpZ2luKGdlc3R1cmUuY2VudGVyLCB0cmFuc2Zvcm1zLCByZWN0cylcblxuXG4gIC8vIGFubmlnaWxhdGUgc2hpZnRpbmcgb2YgdGhlIGVsZW1lbnQgb24gb3JpZ2luIGNoYW5nZVxuICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmFubmlnaWxhdGVTaGlmdChuZXdPcmlnaW4sIHRyYW5zZm9ybXMpXG4gIC8vIGNvbnN0IHRyYW5zbGF0ZSA9IHRyYW5zZm9ybXMudHJhbnNsYXRlXG5cbiAgdGhpcy5hbmNob3IudHJhbnNsYXRlID0gdHJhbnNsYXRlXG5cbiAgLy8gY29uc29sZS5sb2coXCJpbml0TW92ZW1lbnQgLSBvcmlnaW4sIHRyYW5zbGF0ZSwgYW5jaG9yXCIsIG9yaWdpbiwgdHJhbnNsYXRlLCB0aGlzLmFuY2hvcilcbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSwgLy8gdHJhbnNmb3Jtcy50cmFuc2xhdGUsXG4gICAgb3JpZ2luOiBuZXdPcmlnaW5cbiAgfVxufVxuXG4vLyBjYWxjdWxhdGUgYSBkaXNjcmV0ZSBwb2ludCBpbiB0aGUgbW92ZVxuU2NhbGVDb3JlLnByb3RvdHlwZS5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50ID0gZnVuY3Rpb24oZ2VzdHVyZSwgdHJhbnNmb3Jtcykge1xuICAvLyBjb25zb2xlLmxvZyhcImNvcmUsIGNhbGN1bGF0ZURpc2NyZXRlUG9pbnQgLSBnZXN0dXJlLCB0cmFuc2Zvcm1zLCBhbmNob3I6XCIsIGdlc3R1cmUsIHRyYW5zZm9ybXMsIHRoaXMuYW5jaG9yKVxuICAvLyBjb25zb2xlLmxvZyhcImNvcmUsIGNhbGN1bGF0ZURpc2NyZXRlUG9pbnQgLSB0cmFuc2xhdGUueCwgfnk6XCIsIHRyYW5zZm9ybXMudHJhbnNsYXRlLngsIHRyYW5zZm9ybXMudHJhbnNsYXRlLnkpXG4gIC8vIGNvbnNvbGUubG9nKFwiY29yZSwgY2FsY3VsYXRlRGlzY3JldGVQb2ludCAtIGFuY2hvci50cmFuc2xhdGUueCwgfnk6XCIsIHRoaXMuYW5jaG9yLnRyYW5zbGF0ZS54LCB0aGlzLmFuY2hvci50cmFuc2xhdGUueSlcbiAgY29uc3Qgc2NhbGUgPSB7fVxuICBjb25zdCB0cmFuc2xhdGUgPSB7fVxuXG4gIC8vIGhhbW1lcidzIHNjYWxlIHN0YXJ0cyB3aXRoIDAsIGVtdWxhdGUtcGluY2ggLSBmcm9tIDFcbiAgc2NhbGUueCA9IHRoaXMuYW5jaG9yLnNjYWxlLnggKiBnZXN0dXJlLnNjYWxlO1xuICBzY2FsZS55ID0gdGhpcy5hbmNob3Iuc2NhbGUueSAqIGdlc3R1cmUuc2NhbGU7XG5cbiAgLy8gdHJhbnNmb3Jtcy5zY2FsZVggPSB0aGlzLmFuY2hvci5zY2FsZVggKiBnZXN0dXJlLnNjYWxlO1xuICAvLyB0cmFuc2Zvcm1zLnNjYWxlWSA9IHRoaXMuYW5jaG9yLnNjYWxlWSAqIGdlc3R1cmUuc2NhbGU7XG5cbiAgdHJhbnNsYXRlLnggPSB0aGlzLmFuY2hvci50cmFuc2xhdGUueCArIChnZXN0dXJlLmNlbnRlci54IC0gdGhpcy5hbmNob3IuY2VudGVyLngpO1xuICB0cmFuc2xhdGUueSA9IHRoaXMuYW5jaG9yLnRyYW5zbGF0ZS55ICsgKGdlc3R1cmUuY2VudGVyLnkgLSB0aGlzLmFuY2hvci5jZW50ZXIueSk7XG5cbiAgLy8gY29uc29sZS5sb2coXCJjb3JlLCBjYWxjdWxhdGVEaXNjcmV0ZVBvaW50IC0gdHJhbnNsYXRlOlwiLCB0cmFuc2xhdGUpXG4gIHJldHVybiB7XG4gICAgc2NhbGU6IHNjYWxlLFxuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlXG4gIH1cbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5maW5pc2hNb3ZlbWVudCA9IGZ1bmN0aW9uKGdlc3R1cmUsIHRyYW5zZm9ybXMpIHtcblxuICBjb25zdCB0cmFuc2Zvcm1zTmV3ID0gdGhpcy5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50KGdlc3R1cmUsIHRyYW5zZm9ybXMpXG5cbiAgLy8gYW5jaG9yIHRoZSBzY2FsZSB2YWx1ZSwgdG8gdXNlIGFzIHBvaW50IG9mIGRlcGFydHVyZSBpbiBuZXh0IG1vdmVtZW50XG4gIHRoaXMuYW5jaG9yLnNjYWxlID0gdHJhbnNmb3Jtc05ldy5zY2FsZVxuXG4gIHJldHVybiB0cmFuc2Zvcm1zTmV3XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUubWFwVG9PcmlnaW4gPSBmdW5jdGlvbihnZXN0dXJlQ2VudGVyLCB0cmFuc2Zvcm1zLCByZWN0cykge1xuICAvLyBkZXRlcm1pbmUgcG9pbnQncyBwb3NpdGlvbiwgcmVsYXRpdmUgdG8gdGhlIHNjYWxhYmxlIGVsZW1lbnRcbiAgY29uc3QgcG9pbnRQb3NXaXRoaW5FbCA9IHtcbiAgICBsZWZ0OiBnZXN0dXJlQ2VudGVyLnggLSByZWN0cy5sZWZ0LFxuICAgIHRvcDogZ2VzdHVyZUNlbnRlci55IC0gcmVjdHMudG9wXG4gIH1cblxuICAvLyBtYXAgcG9pbnQncyBwb3NpdGlvbiB0byB0aGUgYXBwcm9wcmlhdGUgKHByb3BlcikgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZSAod2hpY2ggaXMgYWx3YXlzIGluIHNjYWxlIG9mIDEpXG4gIGNvbnN0IG9yaWdpbiA9IHtcbiAgICB4OiBwb2ludFBvc1dpdGhpbkVsLmxlZnQgLyB0cmFuc2Zvcm1zLnNjYWxlLngsXG4gICAgeTogcG9pbnRQb3NXaXRoaW5FbC50b3AgLyB0cmFuc2Zvcm1zLnNjYWxlLnlcbiAgfVxuXG4gIHJldHVybiBvcmlnaW5cbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5hbm5pZ2lsYXRlU2hpZnQgPSBmdW5jdGlvbihvcmlnaW4sIHRyYW5zZm9ybXMpIHtcblxuICAvLyAxNTAgaXMgKGlmIEkgcmVjYWxsIGl0IHJpZ2h0KSBoYWxmIG9mIHRoZSBlbGVtZW50J3Mgc2l6ZSAobm8gaWRlYSB3aHkgdGhhdFxuICAvLyBuZWVkcyBvciBuZWVkcyBub3QgdG8gYmUgdGhlIGNhc2UpXG5cbiAgLy8gaW4gZmFjdCwgMTUwIGlzIGZ1bGwgc2l6ZSBvZiB0aGUgZWxlbWVudFxuICBjb25zdCB0cmFuc2xhdGUgPSB7XG4gICAgeDogKChvcmlnaW4ueCAtIDUwKSAqIHRyYW5zZm9ybXMuc2NhbGUueCAtIChvcmlnaW4ueCAtIDUwKSksIC8vICArIHRyYW5zZm9ybXMub2Zmc2V0LnhcbiAgICB5OiAoKG9yaWdpbi55IC0gNTApICogdHJhbnNmb3Jtcy5zY2FsZS55IC0gKG9yaWdpbi55IC0gNTApKSAvLyAgKyB0cmFuc2Zvcm1zLm9mZnNldC55XG4gIH1cblxuICByZXR1cm4gdHJhbnNsYXRlXG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuZW5jb3VudGVyQm91bmRzID0gZnVuY3Rpb24odHJhbnNmb3JtcywgcmVjdHMsIHBhcmVudCkge1xuXG4gIHZhciBhcnJheSA9IFtcbiAgICB7XG4gICAgICBsZW5ndGg6IHJlY3RzLndpZHRoLFxuICAgICAgcG9zOiByZWN0cy5sZWZ0LFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zZm9ybXMudHJhbnNsYXRlLngsXG4gICAgICBwYXJlbnQ6IHBhcmVudC53aWR0aCAvLyBwYXJzZUludChnZXRWaWV3cG9ydFdpZHRoKCkpXG4gICAgfSxcbiAgICB7XG4gICAgICBsZW5ndGg6IHJlY3RzLmhlaWdodCxcbiAgICAgIHBvczogcmVjdHMudG9wLFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zZm9ybXMudHJhbnNsYXRlLnksXG4gICAgICBwYXJlbnQ6IHBhcmVudC5oZWlnaHQgLy8gcGFyc2VJbnQoZ2V0Vmlld3BvcnRIZWlnaHQoKSlcbiAgICB9XG4gIF1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRlbXAgPSBwcm9jZXNzKGFycmF5W2ldKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInR3ZWFrSXRcIiwgdGVtcClcbiAgICBhcnJheVtpXS5uZXdQb3MgPSAodHlwZW9mKHRlbXApID09PSAnbnVtYmVyJykgPyB0ZW1wIDogYXJyYXlbaV0udHJhbnNsYXRpb247XG4gIH1cblxuICBjb25zdCB0cmFuc2xhdGUgPSB7XG4gICAgeDogYXJyYXlbMF0ubmV3UG9zLFxuICAgIHk6IGFycmF5WzFdLm5ld1Bvc1xuICB9XG5cbiAgLy8gT2JqZWN0LmFzc2lnbiBpcyBlczYsIGJ1dCB0aGVyZSdzIGEgcG9seWZpbGwsIGluIGNhc2Ugb2YgYW55dGhpbmc6XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAgLy8gT2JqZWN0LmFzc2lnbih0cmFuc2Zvcm1zTmV3LCB0cmFuc2Zvcm1zKVxuXG4gIC8vIHRyYW5zZm9ybXNOZXcudHJhbnNsYXRlWCA9IGFycmF5WzBdLm5ld1BvcztcbiAgLy8gdHJhbnNmb3Jtc05ldy50cmFuc2xhdGVZID0gYXJyYXlbMV0ubmV3UG9zO1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3MoYXhpcykge1xuXG4gICAgaWYgKGF4aXMubGVuZ3RoIDw9IGF4aXMucGFyZW50KSB7XG4gICAgICBpZiAoYXhpcy5wb3MgPiAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiAtIChheGlzLnBvcyAtIChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXhpcy5wb3MgPCAoMCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiArIE1hdGguYWJzKGF4aXMucG9zKSArIDIgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGF4aXMubGVuZ3RoID4gYXhpcy5wYXJlbnQpIHtcbiAgICAgIGlmIChheGlzLnBvcyA+ICgwKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uIC0gYXhpcy5wb3MgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXhpcy5wb3MgPCAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuICggKGF4aXMudHJhbnNsYXRpb24gKyAoIE1hdGguYWJzKGF4aXMucG9zKSAtIE1hdGguYWJzKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpICkpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cmFuc2xhdGVcblxuICAvLyByZXR1cm4gdHJhbnNmb3Jtc05ldztcbiAgLy90aGlzLmVsZW1lbnQuY3NzKCAndHJhbnNmb3JtJywgJ21hdHJpeCgnICsgY29vcmRzLnNjYWxlWCArICcsIDAsIDAsICcgKyBjb29yZHMuc2NhbGVZICsgICcsICcgKyB4Lm5ld1BvcyArICcsICcgKyB5Lm5ld1BvcyArICcpJyApO1xuXG59XG5cbmV4cG9ydCB7U2NhbGVDb3JlfVxuXG4vKlxuY29uc3QgU2NhbGVDb3JlID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTY2FsZUNvcmVDYXBzdWxlKClcbiAgfVxufVxuXG4vLyBleHBvcnQge1NjYWxlQ29yZUNhcHN1bGV9XG4qL1xuXG5mdW5jdGlvbiBTY2FsZURvbUlvKCkge31cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24oZWwpIHtcbiAgY29uc3Qgb3JpZ2luRGF0YSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsndHJhbnNmb3JtLW9yaWdpbiddLnNwbGl0KCcgJylcblxuICBjb25zdCBvcmlnaW4gPSB7XG4gICAgeDogcGFyc2VJbnQob3JpZ2luRGF0YVswXSksXG4gICAgeTogcGFyc2VJbnQob3JpZ2luRGF0YVsxXSlcbiAgfVxuXG4gIHJldHVybiBvcmlnaW5cbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtcyA9IGZ1bmN0aW9uKGVsKSB7XG4gIGNvbnN0IHRyYW5zZm9ybXMgPSB7fVxuICBjb25zdCB0cmFuc2Zvcm1zRGF0YSA9IGVsLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKTtcblxuICB0cmFuc2Zvcm1zLnNjYWxlID0ge1xuICAgIHg6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbMF0pLFxuICAgIHk6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbM10pXG4gIH1cblxuICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZSA9IHtcbiAgICB4OiBwYXJzZUZsb2F0KHRyYW5zZm9ybXNEYXRhWzRdKSxcbiAgICB5OiBwYXJzZUZsb2F0KHRyYW5zZm9ybXNEYXRhWzVdKVxuICB9XG5cbiAgcmV0dXJuIHRyYW5zZm9ybXNcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0UmVjdHMgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0Vmlld3BvcnREaW1zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IGdldFZpZXdwb3J0V2lkdGgoKSxcbiAgICBoZWlnaHQ6IGdldFZpZXdwb3J0SGVpZ2h0KClcbiAgfVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5zZXRNYXRyaXggPSBmdW5jdGlvbihlbCwgdHJhbnNmb3Jtcykge1xuICBjb25zb2xlLmxvZygnc2V0TWF0cml4JywgdHJhbnNmb3JtcylcbiAgY29uc3QgbWF0cml4U3RyID0gJ21hdHJpeCgnICtcbiAgICB0cmFuc2Zvcm1zLnNjYWxlLnggKyAnLCAwLCAwLCAnICtcbiAgICB0cmFuc2Zvcm1zLnNjYWxlLnkgKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS54ICsgJywgJyArXG4gICAgdHJhbnNmb3Jtcy50cmFuc2xhdGUueSArXG4gICAgJyknXG5cbiAgdGhpcy5kb1NldE1hdHJpeChlbCwgbWF0cml4U3RyKVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5kb1NldE1hdHJpeCA9IGZ1bmN0aW9uKGVsLCBtYXRyaXhTdHIpIHtcbiAgY29uc29sZS5sb2coJ3NldE1hdHJpeCcsIG1hdHJpeFN0cilcbiAgZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLm1velRyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5tc1RyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5vVHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLnRyYW5zZm9ybSA9IG1hdHJpeFN0clxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbihlbCwgb3JpZ2luKSB7XG4gIGVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IG9yaWdpbi54KyBcInB4IFwiKyBvcmlnaW4ueSsgXCJweFwiXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmluaXRpYWxpemVFbGVtZW50c01hdHJpeCA9IGZ1bmN0aW9uKGVsKSB7XG4gIC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0cmFuc2Zvcm0gdG8gbWF0cml4O1xuICBjb25zdCBtYXRyaXhTdHIgPSAnbWF0cml4KDEsIDAsIDAsIDEsIDAsIDApJ1xuICB0aGlzLmRvU2V0TWF0cml4KGVsLCBtYXRyaXhTdHIpXG59XG5cbmV4cG9ydCB7U2NhbGVEb21Jb31cblxuLypcbmNvbnN0IFNjYWxlRG9tSW8gPSB7XG4gIGV4cG9zZTogZnVuY3Rpb24oKSB7IC8vIHVudmVpbFxuICAgIHJldHVybiBTY2FsZURvbUlvQ2Fwc3VsZSgpXG4gIH1cbn1cblxuLy8gZXhwb3J0IHtTY2FsZURvbUlvQ2Fwc3VsZX1cblxuKi9cblxuLy8gaW1wb3J0IHtNZWFzdXJlQWx0ZXJ9IGZyb20gXCJkb21cIlxuLy8gaW1wb3J0IHtDYWxjdWxhdG9yfSBmcm9tIFwiY2FsY3VsYXRvclwiXG4vL1xuLy8gY29uc3QgTWVhc3VyZUFsdGVyID0gTWVhc3VyZUFsdGVyLmluaXQoKVxuLy8gY29uc3QgQ2FsY3VsYXRvciA9IENhbGN1bGF0b3IuaW5pdCgpXG5cbi8vIGNvbnN0IFNjYWxlQ29yZSA9IFNjYWxlQ29yZS5leHBvc2UoKVxuLy8gY29uc3QgU2NhbGVEb21JbyA9IFNjYWxlRG9tSW8uZXhwb3NlKClcblxuZnVuY3Rpb24gU2NhbGVDYXBzdWxlKCkge1xufVxuXG5mdW5jdGlvbiBTY2FsZShlbCwgb3B0aW9ucykge1xuICB0aGlzLmVsID0gZWxcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAvLyB0aGlzLnNjYWxlRmFjdG9yID0gb3B0aW9ucy5zY2FsZUZhY3RvcjtcbiAgLy8gdGhpcy50cmFuc2l0aW9uQ2xhc3MgPSBvcHRpb25zLnRyYW5zaXRpb25DbGFzcyB8fCAnc2NhbGFibGUtdHJhbnNpdGlvbidcblxuICB0aGlzLmNvcmUgPSBuZXcgU2NhbGVDb3JlKClcbiAgdGhpcy5kb21JbyA9IG5ldyBTY2FsZURvbUlvKClcblxuICAvLyBzZXQgdGhlIGluaXRpYWwgdmFsdWUgb2YgdHJhbnNmb3JtIHRvIG1hdHJpeCwgaW4gdGhlIGVsZW1lbnRcbiAgdGhpcy5kb21Jby5pbml0aWFsaXplRWxlbWVudHNNYXRyaXgodGhpcy5lbClcblxuICB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmRvbUlvLmdldFRyYW5zZm9ybXModGhpcy5lbClcbiAgdGhpcy5vcmlnaW4gPSB0aGlzLmRvbUlvLmdldE9yaWdpbih0aGlzLmVsKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuXG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVyOiBcIiwgdGhpcylcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlU3RhcnQgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVTdGFydCwgZ2VzdHVyZTogXCIsIGdlc3R1cmUpXG4gIGNvbnN0IGNvb3JkcyA9IHRoaXMuY29yZS5pbml0aWFsaXplTW92ZW1lbnQoZ2VzdHVyZSwgdGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB0aGlzLm9yaWdpbilcbiAgLy8gY29uc29sZS5sb2coXCJzY2FsZVN0YXJ0LCBpbml0TW92ZW1lbnQgcmV0dXJuXCIsIGNvb3JkcylcblxuICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gY29vcmRzLnRyYW5zbGF0ZVxuICB0aGlzLm9yaWdpbiA9IGNvb3Jkcy5vcmlnaW5cblxuICB0aGlzLmRvbUlvLnNldE9yaWdpbih0aGlzLmVsLCB0aGlzLm9yaWdpbilcbiAgdGhpcy5kb21Jby5zZXRNYXRyaXgodGhpcy5lbCwgdGhpcy50cmFuc2Zvcm1zKVxufVxuXG5TY2FsZS5wcm90b3R5cGUuc2NhbGVNb3ZlID0gZnVuY3Rpb24oZ2VzdHVyZSkge1xuICAvLyBjb25zb2xlLmxvZyhcInNjYWxlTW92ZSwgZ2VzdHVyZTogXCIsIGdlc3R1cmUpXG4gIGNvbnN0IGNhbGN1bGF0ZWQgPSB0aGlzLmNvcmUuY2FsY3VsYXRlRGlzY3JldGVQb2ludChnZXN0dXJlLCB0aGlzLnRyYW5zZm9ybXMpXG5cbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlID0gY2FsY3VsYXRlZC5zY2FsZVxuICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gY2FsY3VsYXRlZC50cmFuc2xhdGVcblxuICB0aGlzLmRvbUlvLnNldE1hdHJpeCh0aGlzLmVsLCB0aGlzLnRyYW5zZm9ybXMpXG59XG5cblNjYWxlLnByb3RvdHlwZS5zY2FsZVN0b3AgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVTdG9wLCBnZXN0dXJlOiBcIiwgZ2VzdHVyZSlcbiAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5jb3JlLmZpbmlzaE1vdmVtZW50KGdlc3R1cmUsIHRoaXMudHJhbnNmb3JtcylcblxuICBjb25zdCB2cHJ0RGltcyA9IHRoaXMuZG9tSW8uZ2V0Vmlld3BvcnREaW1zKClcblxuICAvLyBzZWUsIGlmIGVsIGV4Y2VlZHMgcGFyZW50J3MgYXJlYSBpbiBhbiB1Z2x5IHdheVxuICBjb25zdCB0cmFuc2xhdGVCb3VuZCA9IHRoaXMuY29yZS5lbmNvdW50ZXJCb3VuZHModGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB2cHJ0RGltcylcblxuICAvLyB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gdHJhbnNsYXRlQm91bmRcbiAgdGhpcy5kb21Jby5zZXRNYXRyaXgodGhpcy5lbCwgdGhpcy50cmFuc2Zvcm1zKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuXG4gIC8vIGlmIChcbiAgLy8gICB0cmFuc2Zvcm1zQm91bmRlZC50cmFuc2xhdGVYICE9IHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYXG4gIC8vICAgfHwgdHJhbnNmb3Jtc0JvdW5kZWQudHJhbnNsYXRlWSAhPSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWVxuICAvLyApIHtcbiAgLy8gICB0aGlzLnR3ZWVuSW4oKVxuICAvLyB9XG59XG5cblNjYWxlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm1EYXRhID0gZnVuY3Rpb24odHJhbnNmb3Jtcykge1xuICB0aGlzLnRyYW5zZm9ybXMgPSBPYmplY3QuYXNzaWduKHRoaXMudHJhbnNmb3JtcywgdHJhbnNmb3Jtcylcbn1cblxuLypcblxuU2NhbGUucHJvdG90eXBlLnJBZiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmFmSWQgPSAwXG4gIHJhZkNiID0gZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCByYWZJZFByZXYgPSByYWZJZFxuICAgIHJhZklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cbiAgICAgIC8vIHByZXZlbnQgbXVsdGlwbGUgc2ltdWx0YW5ldW9zIHJBZnNcbiAgICAgIGlmIChyYWZJZCA9PSByYWZJZFByZXYpIHJldHVyblxuXG4gICAgICAvLyBkbyBvdXIgYW5pbWF0aW9uXG5cbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMucmFuZ2UuZ2V0TmV4dCgpXG4gICAgICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWCA9IHZhbFxuICAgICAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVkgPSB2YWxcbiAgICAgIHJhZkNiKClcbiAgICB9KVxuICB9XG59XG5cblNjYWxlLnByb3RvdHlwZS50d2VlbkluID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdmFsdWUgPSBuZXcgUmFuZ2UoXG4gICAgICAvLyBsZW5ndGggb2YgdGhlIHJhbmdlXG4gICAgICB0cmFuc2Zvcm1zQm91bmQudHJhbnNsYXRlWCAtIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYLFxuXG4gICAgICAvLyBwb2ludHMgdG8gZ28gZnJvbSBhbmQgdG9cbiAgICAgIHtcbiAgICAgICAgZnJvbTogdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVksXG4gICAgICAgIHRvOiB0cmFuc2Zvcm1zQm91bmQudHJhbnNsYXRlWVxuICAgICAgfSxcblxuICAgICAgLy8gY3VycmVudCBwb3NpdGlvblxuICAgICAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVhcbiAgICApXG59XG4qL1xuXG5cbmV4cG9ydCB7U2NhbGV9XG5cbi8qXG5jb25zdCBTY2FsZSA9IHtcbiAgZXhwb3NlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU2NhbGVDYXBzdWxlKClcbiAgfVxufVxuXG5leHBvcnQge1NjYWxlfVxuXG4qL1xuIiwiaW1wb3J0IHtTY2FsZX0gZnJvbSBcIi4uL2Rpc3Qvc2NhbGUuanNcIlxuaW1wb3J0IHtwaW5jaEVtdWxhdG9yfSBmcm9tIFwiZW11bGF0ZS1waW5jaFwiXG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnNvbGUubG9nKFNjYWxlKVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxhYmxlJylcbiAgY29uc3Qgc2NhbGVyID0gbmV3IFNjYWxlKGVsKVxuXG4gIC8vIGFuIGltcHJvdmlzYXRpb25hbCB0cmFuc2xhdGUgbWV0aG9kLCB0byBjaGVjayB0aGF0IHVwZGF0ZVRyYW5zZm9ybURhdGEgd29ya3MuXG4gIHNjYWxlci50cmFuc2xhdGUgPSBmdW5jdGlvbih0cmFuc2wsIHNjYWxlRmFjdG9yKSB7XG4gICAgLy8gc2NhbGVyLmVsLnN0eWxlLnRyYW5zZm9ybSA9IFwibWF0cml4KFwiKyBzY2FsZUZhY3RvciArXCIsIDAsIDAsIFwiKyBzY2FsZUZhY3RvciArXCIsIFwiKyB0cmFuc2wgK1wiLCBcIisgdHJhbnNsICtcIilcIlxuICAgIC8vIHRyYW5zbGF0ZShzY2FsYWJsZS5lbCwgdHJhbnNsLCBzY2FsZUZhY3RvcilcblxuICAgIHNjYWxlci5kb21Jby5zZXRNYXRyaXgoZWwsIHtcbiAgICAgIHRyYW5zbGF0ZToge1xuICAgICAgICB4OiB0cmFuc2wsXG4gICAgICAgIHk6IHRyYW5zbFxuICAgICAgfSxcbiAgICAgIHNjYWxlOiB7XG4gICAgICAgIHg6IHNjYWxlRmFjdG9yLFxuICAgICAgICB5OiBzY2FsZUZhY3RvclxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gc2NhbGVyLmRvbUlvLmdldFRyYW5zZm9ybXMoKVxuXG4gICAgc2NhbGFibGUudXBkYXRlVHJhbnNmb3JtRGF0YSh0cmFuc2Zvcm1zKVxuICB9XG5cbiAgLy9cbiAgcGluY2hFbXVsYXRvci5vbnN0YXJ0ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9uc3RhcnRcIiwgZXYpXG4gICAgc2NhbGVyLnNjYWxlU3RhcnQoZXYpXG4gIH1cblxuICBwaW5jaEVtdWxhdG9yLm9ubW92ZSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJvbm1vdmVcIiwgZXYpXG4gICAgc2NhbGVyLnNjYWxlTW92ZShldilcbiAgfVxuXG4gIHBpbmNoRW11bGF0b3Iub25lbmQgPSBmdW5jdGlvbihldikge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25lbmRcIiwgZXYpXG4gICAgc2NhbGVyLnNjYWxlU3RvcChldilcbiAgfVxuXG4gIHBpbmNoRW11bGF0b3Iuc3Vic2NyaWJlKClcblxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbWFpbilcbiJdLCJzb3VyY2VSb290IjoiIn0=