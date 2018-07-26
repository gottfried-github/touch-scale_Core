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
      // center: {x: this.initial.center.x, y: this.initial.center.y}
      center: {x: this.initial.center.x + dx, y: this.initial.center.y}
      //
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
    },
    offset: {
      x: 0, y: 0
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
  const originNew = this.mapToOrigin(gesture.center, transforms, rects)

  // annigilate shifting of the element on origin change
  const translateNew = this.annigilateShift(originNew, transforms)

  translateNew.x += this.anchor.offset.x // this.anchor.translate.x - transforms.translate.x
  translateNew.y += this.anchor.offset.y // this.anchor.translate.y - transforms.translate.y

  // const translateOffset = {

  // }

  // const translate = transforms.translate

  this.anchor.translate = translateNew

  // console.log("initMovement - origin, translate, anchor", origin, translate, this.anchor)
  return {
    translate: translateNew, // transforms.translate,
    origin: originNew
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

ScaleCore.prototype.finishMovement = function(gesture, transforms, origin) {

  const transformsNew = this.calculateDiscretePoint(gesture, transforms)

  // anchor the scale value, to use as point of departure in next movement
  this.anchor.scale = transformsNew.scale

  const translateCalculated = this.annigilateShift(origin, transforms)

  this.anchor.offset.x = transformsNew.translate.x - translateCalculated.x
  this.anchor.offset.y = transformsNew.translate.y - translateCalculated.y

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

/*
Because of the specifics of how matrix is projected - which I don't understand, but the bottom line is -
scale factor of el affects the necessary translation.

i. e. (e. g.), el with the same origin but different scale factors will need different translation, to
stay at the same place (in terms of origin)

I mean, say I have origin xx, scale of xy, and translation xz. Now, I've changed scale to yx.
So far so good - the el is where it's suppose to be - projected outwards of the origin. But if I now
manually set the transofmr-origin prop - even to the same value it was, xx - the el will change it's rendered position..

This doesnt seem to be true...

*/
ScaleCore.prototype.encounterOffset = function(origin, transforms) {

  const translateCalculated = this.annigilateShift(origin, transforms)

  const translateOffset = {
    x: transforms.translate.x - translateCalculated.x,
    y: transforms.translate.y - translateCalculated.y
  }

  return translateOffset
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
  this.transforms = this.core.finishMovement(gesture, this.transforms, this.origin)

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

Scale.prototype.updateTransformData = function(transforms, origin) {

  //
  this.transforms = Object.assign(this.transforms, transforms)
  this.origin = Object.assign(this.origin, origin)
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
    console.log("onstart", ev)
    scaler.scaleStart(ev)
  }

  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].onmove = function(ev) {
    console.log("onmove", ev)
    scaler.scaleMove(ev)
  }

  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].onend = function(ev) {
    console.log("onend", ev)
    scaler.scaleStop(ev)
  }

  emulate_pinch__WEBPACK_IMPORTED_MODULE_1__["pinchEmulator"].subscribe()

}

window.addEventListener("load", main)


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2VtdWxhdGUtcGluY2gvZGlzdC9lbXVsYXRlLXBpbmNoLmpzIiwid2VicGFjazovLy8uL2Rpc3Qvc2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCO0FBQ2xCLGVBQWU7QUFDZjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVROzs7Ozs7Ozs7Ozs7Ozs7O0FDbkZSO0FBQUEsV0FBVyxvQ0FBb0M7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDJCQUEyQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBLHlCQUF5QiwwQkFBMEI7QUFDbkQ7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVROztBQUVSO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVg7O0FBRUEsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsV0FBVztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFROztBQUVSOzs7Ozs7Ozs7Ozs7Ozs7O0FDamVjO0FBQ1E7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBIiwiZmlsZSI6InNjYWxlLXRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3QvdGVzdC5qc1wiKTtcbiIsImNvbnN0IHBpbmNoRW11bGF0b3IgPSB7XG4gIHN1YnNjcmliZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAgIGZ1bmN0aW9uIG9ubW91c2Vtb3ZlKGV2KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm1vdXNlbW92ZVwiKVxuICAgICAgLy8gY29uc29sZS5sb2coXCJtb3VzZW1vdmVcIiwgc2VsZilcblxuICAgICAgaWYgKHR5cGVvZihzZWxmLm9ubW92ZSkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgc2VsZi5vbm1vdmUoc2VsZi5tb3ZlUGluY2goZXYpKVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tb3ZlUGluY2goZXYpKVxuICAgIH1cblxuICAgIGNvbnN0IGJvZHlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpXG5cbiAgICBib2R5RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXYpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW91c2Vkb3duXCIpXG4gICAgICBpZiAodHlwZW9mKHRoaXMub25zdGFydCkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhpcy5vbnN0YXJ0KHRoaXMuaW5pdFBpbmNoKGV2KSlcblxuICAgICAgLy8gY29uc29sZS5sb2cocGluY2hFbXVsYXRvci5pbml0UGluY2goZXYpKVxuICAgICAgYm9keUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25tb3VzZW1vdmUpXG4gICAgfSlcblxuICAgIGJvZHlFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoZXYpID0+IHtcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vbmVuZCkgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgdGhpcy5vbmVuZCh0aGlzLmVuZFBpbmNoKGV2KSlcblxuICAgICAgYm9keUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25tb3VzZW1vdmUpXG4gICAgfSlcbiAgfSxcbiAgcG9pbnRzT2Zmc2V0OiA3NSxcbiAgaW5pdFBpbmNoOiBmdW5jdGlvbihldikge1xuICAgIHRoaXMuaW5pdGlhbCA9IHtcbiAgICAgIGNlbnRlcjoge1xuICAgICAgICB4OiBldi5wYWdlWCxcbiAgICAgICAgeTogZXYucGFnZVlcbiAgICAgIH0sXG5cbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYWwucG9pbnRMZWZ0ID0gdGhpcy5pbml0aWFsLmNlbnRlci54IC0gdGhpcy5wb2ludHNPZmZzZXRcbiAgICB0aGlzLmluaXRpYWwucG9pbnRSaWdodCA9IHRoaXMuaW5pdGlhbC5jZW50ZXIueCArIHRoaXMucG9pbnRzT2Zmc2V0XG5cbiAgICB0aGlzLmluaXRpYWwuZGlzdGFuY2UgPSB0aGlzLmluaXRpYWwucG9pbnRSaWdodCAtIHRoaXMuaW5pdGlhbC5wb2ludExlZnRcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiaW5pdFBpbmNoXCIsIHRoaXMuaW5pdGlhbClcbiAgICB0aGlzLnBvaW50TGVmdCA9IHRoaXMuaW5pdGlhbC5wb2ludExlZnRcbiAgICB0aGlzLnBvaW50UmlnaHQgPSB0aGlzLmluaXRpYWwucG9pbnRSaWdodFxuXG4gICAgdGhpcy5zY2FsZSA9IDFcblxuICAgIHJldHVybiB7XG4gICAgICBzY2FsZTogdGhpcy5zY2FsZSxcbiAgICAgIGNlbnRlcjogdGhpcy5pbml0aWFsLmNlbnRlclxuICAgIH1cbiAgfSxcbiAgbW92ZVBpbmNoOiBmdW5jdGlvbihldikge1xuICAgIGNvbnN0IGR4ID0gZXYucGFnZVggLSB0aGlzLmluaXRpYWwuY2VudGVyLnggLy8gTWF0aC5hYnMoKVxuICAgIC8vIGNvbnNvbGUubG9nKFwiaW5pdENlbnRlciwgZXYucGFnZVgsIGR4XCIsIHRoaXMuaW5pdGlhbC5jZW50ZXIueCwgZXYucGFnZVgsIGR4KVxuXG4gICAgdGhpcy5wb2ludExlZnQgPSB0aGlzLmluaXRpYWwucG9pbnRMZWZ0IC0gZHggLy8gTWF0aC5hYnMoZHgpXG4gICAgdGhpcy5wb2ludFJpZ2h0ID0gdGhpcy5pbml0aWFsLnBvaW50UmlnaHQgKyBkeCAvLyBNYXRoLmFicyhkeClcblxuICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpcy5wb2ludFJpZ2h0IC0gdGhpcy5wb2ludExlZnRcbiAgICAvLyBjb25zb2xlLmxvZyhcImRpc3RhbmNlLCBwTCwgcFJcIiwgZGlzdGFuY2UsIHRoaXMucG9pbnRMZWZ0LCB0aGlzLnBvaW50UmlnaHQpXG5cbiAgICB0aGlzLnNjYWxlID0gZGlzdGFuY2UgLyB0aGlzLmluaXRpYWwuZGlzdGFuY2VcblxuICAgIHJldHVybiB7XG4gICAgICBzY2FsZTogdGhpcy5zY2FsZSxcblxuICAgICAgLy8gY2VudGVyLnkgaXMgbm90IGNhbGN1bGF0ZWQgcHJvcGVybHksIGJ1dCB3ZSBoYXZlIHRvIHJldHVybiBjZW50ZXIgaW4gdGhpcyBmb3JtXG4gICAgICAvLyBjZW50ZXI6IHt4OiB0aGlzLmluaXRpYWwuY2VudGVyLngsIHk6IHRoaXMuaW5pdGlhbC5jZW50ZXIueX1cbiAgICAgIGNlbnRlcjoge3g6IHRoaXMuaW5pdGlhbC5jZW50ZXIueCArIGR4LCB5OiB0aGlzLmluaXRpYWwuY2VudGVyLnl9XG4gICAgICAvL1xuICAgIH1cbiAgfSxcbiAgZW5kUGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgcmV0dXJuIHRoaXMubW92ZVBpbmNoKGV2KVxuICB9XG59XG5cbmV4cG9ydCB7cGluY2hFbXVsYXRvcn1cbiIsIi8vIGltcG9ydCB7Z2V0Vmlld3BvcnRXaWR0aCwgZ2V0Vmlld3BvcnRIZWlnaHR9IGZyb20gXCJwbHRmcm0tbGliXCJcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjk0Mjc4NS93aW5kb3ctaW5uZXJ3aWR0aC12cy1kb2N1bWVudC1kb2N1bWVudGVsZW1lbnQtY2xpZW50d2lkdGhcbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjM4OCNjMTRcbmZ1bmN0aW9uIGdldFZpZXdwb3J0SGVpZ2h0KCkge1xuICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgP1xuICAgIE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgOlxuICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xpZW50SGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRXaWR0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/XG4gICAgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgOlxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsaWVudFdpZHRoKTtcbn1cblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2FsZUNvcmUoKSB7XG4gIHRoaXMuYW5jaG9yID0ge1xuICAgIHNjYWxlOiB7XG4gICAgICB4OiAxLCB5OiAxXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHg6IDAsIHk6IDBcbiAgICB9XG4gIH1cbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5pbml0aWFsaXplTW92ZW1lbnQgPSBmdW5jdGlvbihnZXN0dXJlLCB0cmFuc2Zvcm1zLCByZWN0cykge1xuXG4gIC8qXG4gIGluaXRpYWxpemUgdGhlIG9jY3VyaW5nIGdlc3R1cmU6XG4gICovXG5cbiAgLy8gY2FwdHVyZSB0aGUgaW5pdGlhbCBjb29yZGluYXRlcyBvZiBldiBhbmQgZWxcbiAgdGhpcy5hbmNob3IuY2VudGVyID0gZ2VzdHVyZS5jZW50ZXJcblxuICAvLyBtYXAgZXYncyBwb3NpdGlvbiB0byB0aGUgYXBwcm9wcmlhdGUgKHByb3BlcikgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZSAod2hpY2ggaXMgYWx3YXlzIGluIHNjYWxlIG9mIDEpXG4gIC8vIChtYXAgZXYncyBwb3NpdGlvbiBvbnRvIHRoZSBlbCdzIG1hdHJpeClcbiAgY29uc3Qgb3JpZ2luTmV3ID0gdGhpcy5tYXBUb09yaWdpbihnZXN0dXJlLmNlbnRlciwgdHJhbnNmb3JtcywgcmVjdHMpXG5cbiAgLy8gYW5uaWdpbGF0ZSBzaGlmdGluZyBvZiB0aGUgZWxlbWVudCBvbiBvcmlnaW4gY2hhbmdlXG4gIGNvbnN0IHRyYW5zbGF0ZU5ldyA9IHRoaXMuYW5uaWdpbGF0ZVNoaWZ0KG9yaWdpbk5ldywgdHJhbnNmb3JtcylcblxuICB0cmFuc2xhdGVOZXcueCArPSB0aGlzLmFuY2hvci5vZmZzZXQueCAvLyB0aGlzLmFuY2hvci50cmFuc2xhdGUueCAtIHRyYW5zZm9ybXMudHJhbnNsYXRlLnhcbiAgdHJhbnNsYXRlTmV3LnkgKz0gdGhpcy5hbmNob3Iub2Zmc2V0LnkgLy8gdGhpcy5hbmNob3IudHJhbnNsYXRlLnkgLSB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS55XG5cbiAgLy8gY29uc3QgdHJhbnNsYXRlT2Zmc2V0ID0ge1xuXG4gIC8vIH1cblxuICAvLyBjb25zdCB0cmFuc2xhdGUgPSB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVxuXG4gIHRoaXMuYW5jaG9yLnRyYW5zbGF0ZSA9IHRyYW5zbGF0ZU5ld1xuXG4gIC8vIGNvbnNvbGUubG9nKFwiaW5pdE1vdmVtZW50IC0gb3JpZ2luLCB0cmFuc2xhdGUsIGFuY2hvclwiLCBvcmlnaW4sIHRyYW5zbGF0ZSwgdGhpcy5hbmNob3IpXG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGVOZXcsIC8vIHRyYW5zZm9ybXMudHJhbnNsYXRlLFxuICAgIG9yaWdpbjogb3JpZ2luTmV3XG4gIH1cbn1cblxuLy8gY2FsY3VsYXRlIGEgZGlzY3JldGUgcG9pbnQgaW4gdGhlIG1vdmVcblNjYWxlQ29yZS5wcm90b3R5cGUuY2FsY3VsYXRlRGlzY3JldGVQb2ludCA9IGZ1bmN0aW9uKGdlc3R1cmUsIHRyYW5zZm9ybXMpIHtcbiAgLy8gY29uc29sZS5sb2coXCJjb3JlLCBjYWxjdWxhdGVEaXNjcmV0ZVBvaW50IC0gZ2VzdHVyZSwgdHJhbnNmb3JtcywgYW5jaG9yOlwiLCBnZXN0dXJlLCB0cmFuc2Zvcm1zLCB0aGlzLmFuY2hvcilcbiAgLy8gY29uc29sZS5sb2coXCJjb3JlLCBjYWxjdWxhdGVEaXNjcmV0ZVBvaW50IC0gdHJhbnNsYXRlLngsIH55OlwiLCB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS54LCB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS55KVxuICAvLyBjb25zb2xlLmxvZyhcImNvcmUsIGNhbGN1bGF0ZURpc2NyZXRlUG9pbnQgLSBhbmNob3IudHJhbnNsYXRlLngsIH55OlwiLCB0aGlzLmFuY2hvci50cmFuc2xhdGUueCwgdGhpcy5hbmNob3IudHJhbnNsYXRlLnkpXG4gIGNvbnN0IHNjYWxlID0ge31cbiAgY29uc3QgdHJhbnNsYXRlID0ge31cblxuICAvLyBoYW1tZXIncyBzY2FsZSBzdGFydHMgd2l0aCAwLCBlbXVsYXRlLXBpbmNoIC0gZnJvbSAxXG4gIHNjYWxlLnggPSB0aGlzLmFuY2hvci5zY2FsZS54ICogZ2VzdHVyZS5zY2FsZTtcbiAgc2NhbGUueSA9IHRoaXMuYW5jaG9yLnNjYWxlLnkgKiBnZXN0dXJlLnNjYWxlO1xuXG4gIC8vIHRyYW5zZm9ybXMuc2NhbGVYID0gdGhpcy5hbmNob3Iuc2NhbGVYICogZ2VzdHVyZS5zY2FsZTtcbiAgLy8gdHJhbnNmb3Jtcy5zY2FsZVkgPSB0aGlzLmFuY2hvci5zY2FsZVkgKiBnZXN0dXJlLnNjYWxlO1xuXG4gIHRyYW5zbGF0ZS54ID0gdGhpcy5hbmNob3IudHJhbnNsYXRlLnggKyAoZ2VzdHVyZS5jZW50ZXIueCAtIHRoaXMuYW5jaG9yLmNlbnRlci54KTtcbiAgdHJhbnNsYXRlLnkgPSB0aGlzLmFuY2hvci50cmFuc2xhdGUueSArIChnZXN0dXJlLmNlbnRlci55IC0gdGhpcy5hbmNob3IuY2VudGVyLnkpO1xuXG4gIC8vIGNvbnNvbGUubG9nKFwiY29yZSwgY2FsY3VsYXRlRGlzY3JldGVQb2ludCAtIHRyYW5zbGF0ZTpcIiwgdHJhbnNsYXRlKVxuICByZXR1cm4ge1xuICAgIHNjYWxlOiBzY2FsZSxcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZVxuICB9XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuZmluaXNoTW92ZW1lbnQgPSBmdW5jdGlvbihnZXN0dXJlLCB0cmFuc2Zvcm1zLCBvcmlnaW4pIHtcblxuICBjb25zdCB0cmFuc2Zvcm1zTmV3ID0gdGhpcy5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50KGdlc3R1cmUsIHRyYW5zZm9ybXMpXG5cbiAgLy8gYW5jaG9yIHRoZSBzY2FsZSB2YWx1ZSwgdG8gdXNlIGFzIHBvaW50IG9mIGRlcGFydHVyZSBpbiBuZXh0IG1vdmVtZW50XG4gIHRoaXMuYW5jaG9yLnNjYWxlID0gdHJhbnNmb3Jtc05ldy5zY2FsZVxuXG4gIGNvbnN0IHRyYW5zbGF0ZUNhbGN1bGF0ZWQgPSB0aGlzLmFubmlnaWxhdGVTaGlmdChvcmlnaW4sIHRyYW5zZm9ybXMpXG5cbiAgdGhpcy5hbmNob3Iub2Zmc2V0LnggPSB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZS54IC0gdHJhbnNsYXRlQ2FsY3VsYXRlZC54XG4gIHRoaXMuYW5jaG9yLm9mZnNldC55ID0gdHJhbnNmb3Jtc05ldy50cmFuc2xhdGUueSAtIHRyYW5zbGF0ZUNhbGN1bGF0ZWQueVxuXG4gIHJldHVybiB0cmFuc2Zvcm1zTmV3XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUubWFwVG9PcmlnaW4gPSBmdW5jdGlvbihnZXN0dXJlQ2VudGVyLCB0cmFuc2Zvcm1zLCByZWN0cykge1xuICAvLyBkZXRlcm1pbmUgcG9pbnQncyBwb3NpdGlvbiwgcmVsYXRpdmUgdG8gdGhlIHNjYWxhYmxlIGVsZW1lbnRcbiAgY29uc3QgcG9pbnRQb3NXaXRoaW5FbCA9IHtcbiAgICBsZWZ0OiBnZXN0dXJlQ2VudGVyLnggLSByZWN0cy5sZWZ0LFxuICAgIHRvcDogZ2VzdHVyZUNlbnRlci55IC0gcmVjdHMudG9wXG4gIH1cblxuICAvLyBtYXAgcG9pbnQncyBwb3NpdGlvbiB0byB0aGUgYXBwcm9wcmlhdGUgKHByb3BlcikgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZSAod2hpY2ggaXMgYWx3YXlzIGluIHNjYWxlIG9mIDEpXG4gIGNvbnN0IG9yaWdpbiA9IHtcbiAgICB4OiBwb2ludFBvc1dpdGhpbkVsLmxlZnQgLyB0cmFuc2Zvcm1zLnNjYWxlLngsXG4gICAgeTogcG9pbnRQb3NXaXRoaW5FbC50b3AgLyB0cmFuc2Zvcm1zLnNjYWxlLnlcbiAgfVxuXG4gIHJldHVybiBvcmlnaW5cbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5hbm5pZ2lsYXRlU2hpZnQgPSBmdW5jdGlvbihvcmlnaW4sIHRyYW5zZm9ybXMpIHtcblxuICAvLyAxNTAgaXMgKGlmIEkgcmVjYWxsIGl0IHJpZ2h0KSBoYWxmIG9mIHRoZSBlbGVtZW50J3Mgc2l6ZSAobm8gaWRlYSB3aHkgdGhhdFxuICAvLyBuZWVkcyBvciBuZWVkcyBub3QgdG8gYmUgdGhlIGNhc2UpXG5cbiAgLy8gaW4gZmFjdCwgMTUwIGlzIGZ1bGwgc2l6ZSBvZiB0aGUgZWxlbWVudFxuICBjb25zdCB0cmFuc2xhdGUgPSB7XG4gICAgeDogKChvcmlnaW4ueCAtIDUwKSAqIHRyYW5zZm9ybXMuc2NhbGUueCAtIChvcmlnaW4ueCAtIDUwKSksIC8vICArIHRyYW5zZm9ybXMub2Zmc2V0LnhcbiAgICB5OiAoKG9yaWdpbi55IC0gNTApICogdHJhbnNmb3Jtcy5zY2FsZS55IC0gKG9yaWdpbi55IC0gNTApKSAvLyAgKyB0cmFuc2Zvcm1zLm9mZnNldC55XG4gIH1cblxuICByZXR1cm4gdHJhbnNsYXRlXG59XG5cbi8qXG5CZWNhdXNlIG9mIHRoZSBzcGVjaWZpY3Mgb2YgaG93IG1hdHJpeCBpcyBwcm9qZWN0ZWQgLSB3aGljaCBJIGRvbid0IHVuZGVyc3RhbmQsIGJ1dCB0aGUgYm90dG9tIGxpbmUgaXMgLVxuc2NhbGUgZmFjdG9yIG9mIGVsIGFmZmVjdHMgdGhlIG5lY2Vzc2FyeSB0cmFuc2xhdGlvbi5cblxuaS4gZS4gKGUuIGcuKSwgZWwgd2l0aCB0aGUgc2FtZSBvcmlnaW4gYnV0IGRpZmZlcmVudCBzY2FsZSBmYWN0b3JzIHdpbGwgbmVlZCBkaWZmZXJlbnQgdHJhbnNsYXRpb24sIHRvXG5zdGF5IGF0IHRoZSBzYW1lIHBsYWNlIChpbiB0ZXJtcyBvZiBvcmlnaW4pXG5cbkkgbWVhbiwgc2F5IEkgaGF2ZSBvcmlnaW4geHgsIHNjYWxlIG9mIHh5LCBhbmQgdHJhbnNsYXRpb24geHouIE5vdywgSSd2ZSBjaGFuZ2VkIHNjYWxlIHRvIHl4LlxuU28gZmFyIHNvIGdvb2QgLSB0aGUgZWwgaXMgd2hlcmUgaXQncyBzdXBwb3NlIHRvIGJlIC0gcHJvamVjdGVkIG91dHdhcmRzIG9mIHRoZSBvcmlnaW4uIEJ1dCBpZiBJIG5vd1xubWFudWFsbHkgc2V0IHRoZSB0cmFuc29mbXItb3JpZ2luIHByb3AgLSBldmVuIHRvIHRoZSBzYW1lIHZhbHVlIGl0IHdhcywgeHggLSB0aGUgZWwgd2lsbCBjaGFuZ2UgaXQncyByZW5kZXJlZCBwb3NpdGlvbi4uXG5cblRoaXMgZG9lc250IHNlZW0gdG8gYmUgdHJ1ZS4uLlxuXG4qL1xuU2NhbGVDb3JlLnByb3RvdHlwZS5lbmNvdW50ZXJPZmZzZXQgPSBmdW5jdGlvbihvcmlnaW4sIHRyYW5zZm9ybXMpIHtcblxuICBjb25zdCB0cmFuc2xhdGVDYWxjdWxhdGVkID0gdGhpcy5hbm5pZ2lsYXRlU2hpZnQob3JpZ2luLCB0cmFuc2Zvcm1zKVxuXG4gIGNvbnN0IHRyYW5zbGF0ZU9mZnNldCA9IHtcbiAgICB4OiB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS54IC0gdHJhbnNsYXRlQ2FsY3VsYXRlZC54LFxuICAgIHk6IHRyYW5zZm9ybXMudHJhbnNsYXRlLnkgLSB0cmFuc2xhdGVDYWxjdWxhdGVkLnlcbiAgfVxuXG4gIHJldHVybiB0cmFuc2xhdGVPZmZzZXRcbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5lbmNvdW50ZXJCb3VuZHMgPSBmdW5jdGlvbih0cmFuc2Zvcm1zLCByZWN0cywgcGFyZW50KSB7XG5cbiAgdmFyIGFycmF5ID0gW1xuICAgIHtcbiAgICAgIGxlbmd0aDogcmVjdHMud2lkdGgsXG4gICAgICBwb3M6IHJlY3RzLmxlZnQsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNmb3Jtcy50cmFuc2xhdGUueCxcbiAgICAgIHBhcmVudDogcGFyZW50LndpZHRoIC8vIHBhcnNlSW50KGdldFZpZXdwb3J0V2lkdGgoKSlcbiAgICB9LFxuICAgIHtcbiAgICAgIGxlbmd0aDogcmVjdHMuaGVpZ2h0LFxuICAgICAgcG9zOiByZWN0cy50b3AsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNmb3Jtcy50cmFuc2xhdGUueSxcbiAgICAgIHBhcmVudDogcGFyZW50LmhlaWdodCAvLyBwYXJzZUludChnZXRWaWV3cG9ydEhlaWdodCgpKVxuICAgIH1cbiAgXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVtcCA9IHByb2Nlc3MoYXJyYXlbaV0pO1xuICAgIC8vIGNvbnNvbGUubG9nKFwidHdlYWtJdFwiLCB0ZW1wKVxuICAgIGFycmF5W2ldLm5ld1BvcyA9ICh0eXBlb2YodGVtcCkgPT09ICdudW1iZXInKSA/IHRlbXAgOiBhcnJheVtpXS50cmFuc2xhdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHtcbiAgICB4OiBhcnJheVswXS5uZXdQb3MsXG4gICAgeTogYXJyYXlbMV0ubmV3UG9zXG4gIH1cblxuICAvLyBPYmplY3QuYXNzaWduIGlzIGVzNiwgYnV0IHRoZXJlJ3MgYSBwb2x5ZmlsbCwgaW4gY2FzZSBvZiBhbnl0aGluZzpcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuICAvLyBPYmplY3QuYXNzaWduKHRyYW5zZm9ybXNOZXcsIHRyYW5zZm9ybXMpXG5cbiAgLy8gdHJhbnNmb3Jtc05ldy50cmFuc2xhdGVYID0gYXJyYXlbMF0ubmV3UG9zO1xuICAvLyB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZVkgPSBhcnJheVsxXS5uZXdQb3M7XG5cbiAgZnVuY3Rpb24gcHJvY2VzcyhheGlzKSB7XG5cbiAgICBpZiAoYXhpcy5sZW5ndGggPD0gYXhpcy5wYXJlbnQpIHtcbiAgICAgIGlmIChheGlzLnBvcyA+IChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uIC0gKGF4aXMucG9zIC0gKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpKSApO1xuICAgICAgfSBlbHNlIGlmIChheGlzLnBvcyA8ICgwKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uICsgTWF0aC5hYnMoYXhpcy5wb3MpICsgMiApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYXhpcy5sZW5ndGggPiBheGlzLnBhcmVudCkge1xuICAgICAgaWYgKGF4aXMucG9zID4gKDApKSB7XG4gICAgICAgIHJldHVybiAoIGF4aXMudHJhbnNsYXRpb24gLSBheGlzLnBvcyApO1xuICAgICAgfSBlbHNlIGlmIChheGlzLnBvcyA8IChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gKCAoYXhpcy50cmFuc2xhdGlvbiArICggTWF0aC5hYnMoYXhpcy5wb3MpIC0gTWF0aC5hYnMoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkgKSkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRyYW5zbGF0ZVxuXG4gIC8vIHJldHVybiB0cmFuc2Zvcm1zTmV3O1xuICAvL3RoaXMuZWxlbWVudC5jc3MoICd0cmFuc2Zvcm0nLCAnbWF0cml4KCcgKyBjb29yZHMuc2NhbGVYICsgJywgMCwgMCwgJyArIGNvb3Jkcy5zY2FsZVkgKyAgJywgJyArIHgubmV3UG9zICsgJywgJyArIHkubmV3UG9zICsgJyknICk7XG5cbn1cblxuZXhwb3J0IHtTY2FsZUNvcmV9XG5cbi8qXG5jb25zdCBTY2FsZUNvcmUgPSB7XG4gIGV4cG9zZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFNjYWxlQ29yZUNhcHN1bGUoKVxuICB9XG59XG5cbi8vIGV4cG9ydCB7U2NhbGVDb3JlQ2Fwc3VsZX1cbiovXG5cbmZ1bmN0aW9uIFNjYWxlRG9tSW8oKSB7fVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbihlbCkge1xuICBjb25zdCBvcmlnaW5EYXRhID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyd0cmFuc2Zvcm0tb3JpZ2luJ10uc3BsaXQoJyAnKVxuXG4gIGNvbnN0IG9yaWdpbiA9IHtcbiAgICB4OiBwYXJzZUludChvcmlnaW5EYXRhWzBdKSxcbiAgICB5OiBwYXJzZUludChvcmlnaW5EYXRhWzFdKVxuICB9XG5cbiAgcmV0dXJuIG9yaWdpblxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm1zID0gZnVuY3Rpb24oZWwpIHtcbiAgY29uc3QgdHJhbnNmb3JtcyA9IHt9XG4gIGNvbnN0IHRyYW5zZm9ybXNEYXRhID0gZWwuc3R5bGUudHJhbnNmb3JtLnNwbGl0KCcoJylbMV0uc3BsaXQoJyknKVswXS5zcGxpdCgnLCcpO1xuXG4gIHRyYW5zZm9ybXMuc2NhbGUgPSB7XG4gICAgeDogcGFyc2VGbG9hdCh0cmFuc2Zvcm1zRGF0YVswXSksXG4gICAgeTogcGFyc2VGbG9hdCh0cmFuc2Zvcm1zRGF0YVszXSlcbiAgfVxuXG4gIHRyYW5zZm9ybXMudHJhbnNsYXRlID0ge1xuICAgIHg6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbNF0pLFxuICAgIHk6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbNV0pXG4gIH1cblxuICByZXR1cm4gdHJhbnNmb3Jtc1xufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRSZWN0cyA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRWaWV3cG9ydERpbXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogZ2V0Vmlld3BvcnRXaWR0aCgpLFxuICAgIGhlaWdodDogZ2V0Vmlld3BvcnRIZWlnaHQoKVxuICB9XG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLnNldE1hdHJpeCA9IGZ1bmN0aW9uKGVsLCB0cmFuc2Zvcm1zKSB7XG4gIGNvbnNvbGUubG9nKCdzZXRNYXRyaXgnLCB0cmFuc2Zvcm1zKVxuICBjb25zdCBtYXRyaXhTdHIgPSAnbWF0cml4KCcgK1xuICAgIHRyYW5zZm9ybXMuc2NhbGUueCArICcsIDAsIDAsICcgK1xuICAgIHRyYW5zZm9ybXMuc2NhbGUueSArICcsICcgK1xuICAgIHRyYW5zZm9ybXMudHJhbnNsYXRlLnggKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS55ICtcbiAgICAnKSdcblxuICB0aGlzLmRvU2V0TWF0cml4KGVsLCBtYXRyaXhTdHIpXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmRvU2V0TWF0cml4ID0gZnVuY3Rpb24oZWwsIG1hdHJpeFN0cikge1xuICBjb25zb2xlLmxvZygnc2V0TWF0cml4JywgbWF0cml4U3RyKVxuICBlbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUubW96VHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLm1zVHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLm9UcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUudHJhbnNmb3JtID0gbWF0cml4U3RyXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uKGVsLCBvcmlnaW4pIHtcbiAgZWwuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gb3JpZ2luLngrIFwicHggXCIrIG9yaWdpbi55KyBcInB4XCJcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuaW5pdGlhbGl6ZUVsZW1lbnRzTWF0cml4ID0gZnVuY3Rpb24oZWwpIHtcbiAgLy8gc2V0IHRoZSBpbml0aWFsIHZhbHVlIG9mIHRyYW5zZm9ybSB0byBtYXRyaXg7XG4gIGNvbnN0IG1hdHJpeFN0ciA9ICdtYXRyaXgoMSwgMCwgMCwgMSwgMCwgMCknXG4gIHRoaXMuZG9TZXRNYXRyaXgoZWwsIG1hdHJpeFN0cilcbn1cblxuZXhwb3J0IHtTY2FsZURvbUlvfVxuXG4vKlxuY29uc3QgU2NhbGVEb21JbyA9IHtcbiAgZXhwb3NlOiBmdW5jdGlvbigpIHsgLy8gdW52ZWlsXG4gICAgcmV0dXJuIFNjYWxlRG9tSW9DYXBzdWxlKClcbiAgfVxufVxuXG4vLyBleHBvcnQge1NjYWxlRG9tSW9DYXBzdWxlfVxuXG4qL1xuXG4vLyBpbXBvcnQge01lYXN1cmVBbHRlcn0gZnJvbSBcImRvbVwiXG4vLyBpbXBvcnQge0NhbGN1bGF0b3J9IGZyb20gXCJjYWxjdWxhdG9yXCJcbi8vXG4vLyBjb25zdCBNZWFzdXJlQWx0ZXIgPSBNZWFzdXJlQWx0ZXIuaW5pdCgpXG4vLyBjb25zdCBDYWxjdWxhdG9yID0gQ2FsY3VsYXRvci5pbml0KClcblxuLy8gY29uc3QgU2NhbGVDb3JlID0gU2NhbGVDb3JlLmV4cG9zZSgpXG4vLyBjb25zdCBTY2FsZURvbUlvID0gU2NhbGVEb21Jby5leHBvc2UoKVxuXG5mdW5jdGlvbiBTY2FsZUNhcHN1bGUoKSB7XG59XG5cbmZ1bmN0aW9uIFNjYWxlKGVsLCBvcHRpb25zKSB7XG4gIHRoaXMuZWwgPSBlbFxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIC8vIHRoaXMuc2NhbGVGYWN0b3IgPSBvcHRpb25zLnNjYWxlRmFjdG9yO1xuICAvLyB0aGlzLnRyYW5zaXRpb25DbGFzcyA9IG9wdGlvbnMudHJhbnNpdGlvbkNsYXNzIHx8ICdzY2FsYWJsZS10cmFuc2l0aW9uJ1xuXG4gIHRoaXMuY29yZSA9IG5ldyBTY2FsZUNvcmUoKVxuICB0aGlzLmRvbUlvID0gbmV3IFNjYWxlRG9tSW8oKVxuXG4gIC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0cmFuc2Zvcm0gdG8gbWF0cml4LCBpbiB0aGUgZWxlbWVudFxuICB0aGlzLmRvbUlvLmluaXRpYWxpemVFbGVtZW50c01hdHJpeCh0aGlzLmVsKVxuXG4gIHRoaXMudHJhbnNmb3JtcyA9IHRoaXMuZG9tSW8uZ2V0VHJhbnNmb3Jtcyh0aGlzLmVsKVxuICB0aGlzLm9yaWdpbiA9IHRoaXMuZG9tSW8uZ2V0T3JpZ2luKHRoaXMuZWwpXG4gIHRoaXMucmVjdHMgPSB0aGlzLmRvbUlvLmdldFJlY3RzKHRoaXMuZWwpXG5cbiAgLy8gY29uc29sZS5sb2coXCJzY2FsZXI6IFwiLCB0aGlzKVxufVxuXG5TY2FsZS5wcm90b3R5cGUuc2NhbGVTdGFydCA9IGZ1bmN0aW9uKGdlc3R1cmUpIHtcbiAgLy8gY29uc29sZS5sb2coXCJzY2FsZVN0YXJ0LCBnZXN0dXJlOiBcIiwgZ2VzdHVyZSlcbiAgY29uc3QgY29vcmRzID0gdGhpcy5jb3JlLmluaXRpYWxpemVNb3ZlbWVudChnZXN0dXJlLCB0aGlzLnRyYW5zZm9ybXMsIHRoaXMucmVjdHMsIHRoaXMub3JpZ2luKVxuICAvLyBjb25zb2xlLmxvZyhcInNjYWxlU3RhcnQsIGluaXRNb3ZlbWVudCByZXR1cm5cIiwgY29vcmRzKVxuXG4gIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGUgPSBjb29yZHMudHJhbnNsYXRlXG4gIHRoaXMub3JpZ2luID0gY29vcmRzLm9yaWdpblxuXG4gIHRoaXMuZG9tSW8uc2V0T3JpZ2luKHRoaXMuZWwsIHRoaXMub3JpZ2luKVxuICB0aGlzLmRvbUlvLnNldE1hdHJpeCh0aGlzLmVsLCB0aGlzLnRyYW5zZm9ybXMpXG59XG5cblNjYWxlLnByb3RvdHlwZS5zY2FsZU1vdmUgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVNb3ZlLCBnZXN0dXJlOiBcIiwgZ2VzdHVyZSlcbiAgY29uc3QgY2FsY3VsYXRlZCA9IHRoaXMuY29yZS5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50KGdlc3R1cmUsIHRoaXMudHJhbnNmb3JtcylcblxuICB0aGlzLnRyYW5zZm9ybXMuc2NhbGUgPSBjYWxjdWxhdGVkLnNjYWxlXG4gIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGUgPSBjYWxjdWxhdGVkLnRyYW5zbGF0ZVxuXG4gIHRoaXMuZG9tSW8uc2V0TWF0cml4KHRoaXMuZWwsIHRoaXMudHJhbnNmb3Jtcylcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlU3RvcCA9IGZ1bmN0aW9uKGdlc3R1cmUpIHtcbiAgLy8gY29uc29sZS5sb2coXCJzY2FsZVN0b3AsIGdlc3R1cmU6IFwiLCBnZXN0dXJlKVxuICB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmNvcmUuZmluaXNoTW92ZW1lbnQoZ2VzdHVyZSwgdGhpcy50cmFuc2Zvcm1zLCB0aGlzLm9yaWdpbilcblxuICBjb25zdCB2cHJ0RGltcyA9IHRoaXMuZG9tSW8uZ2V0Vmlld3BvcnREaW1zKClcblxuICAvLyBzZWUsIGlmIGVsIGV4Y2VlZHMgcGFyZW50J3MgYXJlYSBpbiBhbiB1Z2x5IHdheVxuICBjb25zdCB0cmFuc2xhdGVCb3VuZCA9IHRoaXMuY29yZS5lbmNvdW50ZXJCb3VuZHModGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB2cHJ0RGltcylcblxuICAvLyB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gdHJhbnNsYXRlQm91bmRcbiAgdGhpcy5kb21Jby5zZXRNYXRyaXgodGhpcy5lbCwgdGhpcy50cmFuc2Zvcm1zKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuXG4gIC8vIGlmIChcbiAgLy8gICB0cmFuc2Zvcm1zQm91bmRlZC50cmFuc2xhdGVYICE9IHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYXG4gIC8vICAgfHwgdHJhbnNmb3Jtc0JvdW5kZWQudHJhbnNsYXRlWSAhPSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWVxuICAvLyApIHtcbiAgLy8gICB0aGlzLnR3ZWVuSW4oKVxuICAvLyB9XG59XG5cblNjYWxlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm1EYXRhID0gZnVuY3Rpb24odHJhbnNmb3Jtcywgb3JpZ2luKSB7XG5cbiAgLy9cbiAgdGhpcy50cmFuc2Zvcm1zID0gT2JqZWN0LmFzc2lnbih0aGlzLnRyYW5zZm9ybXMsIHRyYW5zZm9ybXMpXG4gIHRoaXMub3JpZ2luID0gT2JqZWN0LmFzc2lnbih0aGlzLm9yaWdpbiwgb3JpZ2luKVxufVxuXG4vKlxuXG5TY2FsZS5wcm90b3R5cGUuckFmID0gZnVuY3Rpb24oKSB7XG4gIHZhciByYWZJZCA9IDBcbiAgcmFmQ2IgPSBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHJhZklkUHJldiA9IHJhZklkXG4gICAgcmFmSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblxuICAgICAgLy8gcHJldmVudCBtdWx0aXBsZSBzaW11bHRhbmV1b3MgckFmc1xuICAgICAgaWYgKHJhZklkID09IHJhZklkUHJldikgcmV0dXJuXG5cbiAgICAgIC8vIGRvIG91ciBhbmltYXRpb25cblxuICAgICAgY29uc3QgdmFsID0gdGhpcy5yYW5nZS5nZXROZXh0KClcbiAgICAgIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYID0gdmFsXG4gICAgICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWSA9IHZhbFxuICAgICAgcmFmQ2IoKVxuICAgIH0pXG4gIH1cbn1cblxuU2NhbGUucHJvdG90eXBlLnR3ZWVuSW4gPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciB2YWx1ZSA9IG5ldyBSYW5nZShcbiAgICAgIC8vIGxlbmd0aCBvZiB0aGUgcmFuZ2VcbiAgICAgIHRyYW5zZm9ybXNCb3VuZC50cmFuc2xhdGVYIC0gdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVgsXG5cbiAgICAgIC8vIHBvaW50cyB0byBnbyBmcm9tIGFuZCB0b1xuICAgICAge1xuICAgICAgICBmcm9tOiB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWSxcbiAgICAgICAgdG86IHRyYW5zZm9ybXNCb3VuZC50cmFuc2xhdGVZXG4gICAgICB9LFxuXG4gICAgICAvLyBjdXJyZW50IHBvc2l0aW9uXG4gICAgICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWFxuICAgIClcbn1cbiovXG5cblxuZXhwb3J0IHtTY2FsZX1cblxuLypcbmNvbnN0IFNjYWxlID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTY2FsZUNhcHN1bGUoKVxuICB9XG59XG5cbmV4cG9ydCB7U2NhbGV9XG5cbiovXG4iLCJpbXBvcnQge1NjYWxlfSBmcm9tIFwiLi4vZGlzdC9zY2FsZS5qc1wiXG5pbXBvcnQge3BpbmNoRW11bGF0b3J9IGZyb20gXCJlbXVsYXRlLXBpbmNoXCJcblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc29sZS5sb2coU2NhbGUpXG5cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGFibGUnKVxuICBjb25zdCBzY2FsZXIgPSBuZXcgU2NhbGUoZWwpXG5cbiAgLy8gYW4gaW1wcm92aXNhdGlvbmFsIHRyYW5zbGF0ZSBtZXRob2QsIHRvIGNoZWNrIHRoYXQgdXBkYXRlVHJhbnNmb3JtRGF0YSB3b3Jrcy5cbiAgc2NhbGVyLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uKHRyYW5zbCwgc2NhbGVGYWN0b3IpIHtcbiAgICAvLyBzY2FsZXIuZWwuc3R5bGUudHJhbnNmb3JtID0gXCJtYXRyaXgoXCIrIHNjYWxlRmFjdG9yICtcIiwgMCwgMCwgXCIrIHNjYWxlRmFjdG9yICtcIiwgXCIrIHRyYW5zbCArXCIsIFwiKyB0cmFuc2wgK1wiKVwiXG4gICAgLy8gdHJhbnNsYXRlKHNjYWxhYmxlLmVsLCB0cmFuc2wsIHNjYWxlRmFjdG9yKVxuXG4gICAgc2NhbGVyLmRvbUlvLnNldE1hdHJpeChlbCwge1xuICAgICAgdHJhbnNsYXRlOiB7XG4gICAgICAgIHg6IHRyYW5zbCxcbiAgICAgICAgeTogdHJhbnNsXG4gICAgICB9LFxuICAgICAgc2NhbGU6IHtcbiAgICAgICAgeDogc2NhbGVGYWN0b3IsXG4gICAgICAgIHk6IHNjYWxlRmFjdG9yXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHRyYW5zZm9ybXMgPSBzY2FsZXIuZG9tSW8uZ2V0VHJhbnNmb3JtcygpXG5cbiAgICBzY2FsYWJsZS51cGRhdGVUcmFuc2Zvcm1EYXRhKHRyYW5zZm9ybXMpXG4gIH1cblxuICAvL1xuICBwaW5jaEVtdWxhdG9yLm9uc3RhcnQgPSBmdW5jdGlvbihldikge1xuICAgIGNvbnNvbGUubG9nKFwib25zdGFydFwiLCBldilcbiAgICBzY2FsZXIuc2NhbGVTdGFydChldilcbiAgfVxuXG4gIHBpbmNoRW11bGF0b3Iub25tb3ZlID0gZnVuY3Rpb24oZXYpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9ubW92ZVwiLCBldilcbiAgICBzY2FsZXIuc2NhbGVNb3ZlKGV2KVxuICB9XG5cbiAgcGluY2hFbXVsYXRvci5vbmVuZCA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgY29uc29sZS5sb2coXCJvbmVuZFwiLCBldilcbiAgICBzY2FsZXIuc2NhbGVTdG9wKGV2KVxuICB9XG5cbiAgcGluY2hFbXVsYXRvci5zdWJzY3JpYmUoKVxuXG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBtYWluKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==