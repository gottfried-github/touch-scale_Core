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

  // weirdly enough, we have to calculate the offset
  // transformsNew.translate.x += (transformsNew.translate.x - translateCalculated.x)
  // transformsNew.translate.y += (transformsNew.translate.y - translateCalculated.y)

  // anchor the scale value, to use as point of departure in next movement
  this.anchor.scale = transformsNew.scale

  const translateCalculated = this.annigilateShift(origin, transforms)

  // this.anchor.offset.x += transformsNew.translate.x - translateCalculated.x
  // this.anchor.offset.y += transformsNew.translate.y - translateCalculated.y

  this.anchor.offset = {
    x: transformsNew.translate.x - translateCalculated.x,
    y: transformsNew.translate.y - translateCalculated.y
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2VtdWxhdGUtcGluY2gvZGlzdC9lbXVsYXRlLXBpbmNoLmpzIiwid2VicGFjazovLy8uL2Rpc3Qvc2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmLFVBQVU7QUFDVjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFUTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGUjtBQUFBLFdBQVcsb0NBQW9DOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIsMEJBQTBCO0FBQ25EOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7O0FBRVI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWDs7QUFFQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR1E7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVE7O0FBRVI7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxZWM7QUFDUTs7QUFFdEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEiLCJmaWxlIjoic2NhbGUtdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC90ZXN0LmpzXCIpO1xuIiwiY29uc3QgcGluY2hFbXVsYXRvciA9IHtcbiAgc3Vic2NyaWJlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuXG4gICAgZnVuY3Rpb24gb25tb3VzZW1vdmUoZXYpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibW91c2Vtb3ZlXCIpXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlbW92ZVwiLCBzZWxmKVxuXG4gICAgICBpZiAodHlwZW9mKHNlbGYub25tb3ZlKSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBzZWxmLm9ubW92ZShzZWxmLm1vdmVQaW5jaChldikpXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1vdmVQaW5jaChldikpXG4gICAgfVxuXG4gICAgY29uc3QgYm9keUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIilcblxuICAgIGJvZHlFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldikgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJtb3VzZWRvd25cIilcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vbnN0YXJ0KSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aGlzLm9uc3RhcnQodGhpcy5pbml0UGluY2goZXYpKVxuXG4gICAgICAvLyBjb25zb2xlLmxvZyhwaW5jaEVtdWxhdG9yLmluaXRQaW5jaChldikpXG4gICAgICBib2R5RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbm1vdXNlbW92ZSlcbiAgICB9KVxuXG4gICAgYm9keUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldikgPT4ge1xuICAgICAgaWYgKHR5cGVvZih0aGlzLm9uZW5kKSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aGlzLm9uZW5kKHRoaXMuZW5kUGluY2goZXYpKVxuXG4gICAgICBib2R5RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbm1vdXNlbW92ZSlcbiAgICB9KVxuICB9LFxuICBwb2ludHNPZmZzZXQ6IDc1LFxuICBpbml0UGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgdGhpcy5pbml0aWFsID0ge1xuICAgICAgY2VudGVyOiB7XG4gICAgICAgIHg6IGV2LnBhZ2VYLFxuICAgICAgICB5OiBldi5wYWdlWVxuICAgICAgfSxcblxuICAgIH1cblxuICAgIHRoaXMuaW5pdGlhbC5wb2ludExlZnQgPSB0aGlzLmluaXRpYWwuY2VudGVyLnggLSB0aGlzLnBvaW50c09mZnNldFxuICAgIHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0ID0gdGhpcy5pbml0aWFsLmNlbnRlci54ICsgdGhpcy5wb2ludHNPZmZzZXRcblxuICAgIHRoaXMuaW5pdGlhbC5kaXN0YW5jZSA9IHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0IC0gdGhpcy5pbml0aWFsLnBvaW50TGVmdFxuXG4gICAgLy8gY29uc29sZS5sb2coXCJpbml0UGluY2hcIiwgdGhpcy5pbml0aWFsKVxuICAgIHRoaXMucG9pbnRMZWZ0ID0gdGhpcy5pbml0aWFsLnBvaW50TGVmdFxuICAgIHRoaXMucG9pbnRSaWdodCA9IHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0XG5cbiAgICB0aGlzLnNjYWxlID0gMVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmluaXRpYWwuY2VudGVyXG4gICAgfVxuICB9LFxuICBtb3ZlUGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgY29uc3QgZHggPSBldi5wYWdlWCAtIHRoaXMuaW5pdGlhbC5jZW50ZXIueCAvLyBNYXRoLmFicygpXG4gICAgLy8gY29uc29sZS5sb2coXCJpbml0Q2VudGVyLCBldi5wYWdlWCwgZHhcIiwgdGhpcy5pbml0aWFsLmNlbnRlci54LCBldi5wYWdlWCwgZHgpXG5cbiAgICB0aGlzLnBvaW50TGVmdCA9IHRoaXMuaW5pdGlhbC5wb2ludExlZnQgLSBkeCAvLyBNYXRoLmFicyhkeClcbiAgICB0aGlzLnBvaW50UmlnaHQgPSB0aGlzLmluaXRpYWwucG9pbnRSaWdodCArIGR4IC8vIE1hdGguYWJzKGR4KVxuXG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLnBvaW50UmlnaHQgLSB0aGlzLnBvaW50TGVmdFxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGlzdGFuY2UsIHBMLCBwUlwiLCBkaXN0YW5jZSwgdGhpcy5wb2ludExlZnQsIHRoaXMucG9pbnRSaWdodClcblxuICAgIHRoaXMuc2NhbGUgPSBkaXN0YW5jZSAvIHRoaXMuaW5pdGlhbC5kaXN0YW5jZVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLFxuXG4gICAgICAvLyBjZW50ZXIueSBpcyBub3QgY2FsY3VsYXRlZCBwcm9wZXJseSwgYnV0IHdlIGhhdmUgdG8gcmV0dXJuIGNlbnRlciBpbiB0aGlzIGZvcm1cbiAgICAgIGNlbnRlcjoge3g6IHRoaXMuaW5pdGlhbC5jZW50ZXIueCwgeTogdGhpcy5pbml0aWFsLmNlbnRlci55fVxuICAgICAgLy8ge3g6IHRoaXMuaW5pdGlhbC5jZW50ZXIueCArIGR4IC8gMiwgeTogdGhpcy5pbml0aWFsLmNlbnRlci55fVxuICAgIH1cbiAgfSxcbiAgZW5kUGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgcmV0dXJuIHRoaXMubW92ZVBpbmNoKGV2KVxuICB9XG59XG5cbmV4cG9ydCB7cGluY2hFbXVsYXRvcn1cbiIsIi8vIGltcG9ydCB7Z2V0Vmlld3BvcnRXaWR0aCwgZ2V0Vmlld3BvcnRIZWlnaHR9IGZyb20gXCJwbHRmcm0tbGliXCJcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjk0Mjc4NS93aW5kb3ctaW5uZXJ3aWR0aC12cy1kb2N1bWVudC1kb2N1bWVudGVsZW1lbnQtY2xpZW50d2lkdGhcbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjM4OCNjMTRcbmZ1bmN0aW9uIGdldFZpZXdwb3J0SGVpZ2h0KCkge1xuICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgP1xuICAgIE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgOlxuICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xpZW50SGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRXaWR0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/XG4gICAgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgOlxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsaWVudFdpZHRoKTtcbn1cblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2FsZUNvcmUoKSB7XG4gIHRoaXMuYW5jaG9yID0ge1xuICAgIHNjYWxlOiB7XG4gICAgICB4OiAxLCB5OiAxXG4gICAgfSxcbiAgICBvZmZzZXQ6IHtcbiAgICAgIHg6IDAsIHk6IDBcbiAgICB9XG4gIH1cbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5pbml0aWFsaXplTW92ZW1lbnQgPSBmdW5jdGlvbihnZXN0dXJlLCB0cmFuc2Zvcm1zLCByZWN0cykge1xuXG4gIC8qXG4gIGluaXRpYWxpemUgdGhlIG9jY3VyaW5nIGdlc3R1cmU6XG4gICovXG5cbiAgLy8gY2FwdHVyZSB0aGUgaW5pdGlhbCBjb29yZGluYXRlcyBvZiBldiBhbmQgZWxcbiAgdGhpcy5hbmNob3IuY2VudGVyID0gZ2VzdHVyZS5jZW50ZXJcblxuICAvLyBtYXAgZXYncyBwb3NpdGlvbiB0byB0aGUgYXBwcm9wcmlhdGUgKHByb3BlcikgdHJhbnNmb3JtLW9yaWdpbiB2YWx1ZSAod2hpY2ggaXMgYWx3YXlzIGluIHNjYWxlIG9mIDEpXG4gIC8vIChtYXAgZXYncyBwb3NpdGlvbiBvbnRvIHRoZSBlbCdzIG1hdHJpeClcbiAgY29uc3Qgb3JpZ2luTmV3ID0gdGhpcy5tYXBUb09yaWdpbihnZXN0dXJlLmNlbnRlciwgdHJhbnNmb3JtcywgcmVjdHMpXG5cbiAgLy8gYW5uaWdpbGF0ZSBzaGlmdGluZyBvZiB0aGUgZWxlbWVudCBvbiBvcmlnaW4gY2hhbmdlXG4gIGNvbnN0IHRyYW5zbGF0ZU5ldyA9IHRoaXMuYW5uaWdpbGF0ZVNoaWZ0KG9yaWdpbk5ldywgdHJhbnNmb3JtcylcblxuICB0cmFuc2xhdGVOZXcueCArPSB0aGlzLmFuY2hvci5vZmZzZXQueCAvLyB0aGlzLmFuY2hvci50cmFuc2xhdGUueCAtIHRyYW5zZm9ybXMudHJhbnNsYXRlLnhcbiAgdHJhbnNsYXRlTmV3LnkgKz0gdGhpcy5hbmNob3Iub2Zmc2V0LnkgLy8gdGhpcy5hbmNob3IudHJhbnNsYXRlLnkgLSB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS55XG5cbiAgLy8gY29uc3QgdHJhbnNsYXRlT2Zmc2V0ID0ge1xuXG4gIC8vIH1cblxuICAvLyBjb25zdCB0cmFuc2xhdGUgPSB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVxuXG4gIHRoaXMuYW5jaG9yLnRyYW5zbGF0ZSA9IHRyYW5zbGF0ZU5ld1xuXG4gIC8vIGNvbnNvbGUubG9nKFwiaW5pdE1vdmVtZW50IC0gb3JpZ2luLCB0cmFuc2xhdGUsIGFuY2hvclwiLCBvcmlnaW4sIHRyYW5zbGF0ZSwgdGhpcy5hbmNob3IpXG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGVOZXcsIC8vIHRyYW5zZm9ybXMudHJhbnNsYXRlLFxuICAgIG9yaWdpbjogb3JpZ2luTmV3XG4gIH1cbn1cblxuLy8gY2FsY3VsYXRlIGEgZGlzY3JldGUgcG9pbnQgaW4gdGhlIG1vdmVcblNjYWxlQ29yZS5wcm90b3R5cGUuY2FsY3VsYXRlRGlzY3JldGVQb2ludCA9IGZ1bmN0aW9uKGdlc3R1cmUsIHRyYW5zZm9ybXMpIHtcbiAgLy8gY29uc29sZS5sb2coXCJjb3JlLCBjYWxjdWxhdGVEaXNjcmV0ZVBvaW50IC0gZ2VzdHVyZSwgdHJhbnNmb3JtcywgYW5jaG9yOlwiLCBnZXN0dXJlLCB0cmFuc2Zvcm1zLCB0aGlzLmFuY2hvcilcbiAgLy8gY29uc29sZS5sb2coXCJjb3JlLCBjYWxjdWxhdGVEaXNjcmV0ZVBvaW50IC0gdHJhbnNsYXRlLngsIH55OlwiLCB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS54LCB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS55KVxuICAvLyBjb25zb2xlLmxvZyhcImNvcmUsIGNhbGN1bGF0ZURpc2NyZXRlUG9pbnQgLSBhbmNob3IudHJhbnNsYXRlLngsIH55OlwiLCB0aGlzLmFuY2hvci50cmFuc2xhdGUueCwgdGhpcy5hbmNob3IudHJhbnNsYXRlLnkpXG4gIGNvbnN0IHNjYWxlID0ge31cbiAgY29uc3QgdHJhbnNsYXRlID0ge31cblxuICAvLyBoYW1tZXIncyBzY2FsZSBzdGFydHMgd2l0aCAwLCBlbXVsYXRlLXBpbmNoIC0gZnJvbSAxXG4gIHNjYWxlLnggPSB0aGlzLmFuY2hvci5zY2FsZS54ICogZ2VzdHVyZS5zY2FsZTtcbiAgc2NhbGUueSA9IHRoaXMuYW5jaG9yLnNjYWxlLnkgKiBnZXN0dXJlLnNjYWxlO1xuXG4gIC8vIHRyYW5zZm9ybXMuc2NhbGVYID0gdGhpcy5hbmNob3Iuc2NhbGVYICogZ2VzdHVyZS5zY2FsZTtcbiAgLy8gdHJhbnNmb3Jtcy5zY2FsZVkgPSB0aGlzLmFuY2hvci5zY2FsZVkgKiBnZXN0dXJlLnNjYWxlO1xuXG4gIHRyYW5zbGF0ZS54ID0gdGhpcy5hbmNob3IudHJhbnNsYXRlLnggKyAoZ2VzdHVyZS5jZW50ZXIueCAtIHRoaXMuYW5jaG9yLmNlbnRlci54KTtcbiAgdHJhbnNsYXRlLnkgPSB0aGlzLmFuY2hvci50cmFuc2xhdGUueSArIChnZXN0dXJlLmNlbnRlci55IC0gdGhpcy5hbmNob3IuY2VudGVyLnkpO1xuXG4gIC8vIGNvbnNvbGUubG9nKFwiY29yZSwgY2FsY3VsYXRlRGlzY3JldGVQb2ludCAtIHRyYW5zbGF0ZTpcIiwgdHJhbnNsYXRlKVxuICByZXR1cm4ge1xuICAgIHNjYWxlOiBzY2FsZSxcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZVxuICB9XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuZmluaXNoTW92ZW1lbnQgPSBmdW5jdGlvbihnZXN0dXJlLCB0cmFuc2Zvcm1zLCBvcmlnaW4pIHtcblxuICBjb25zdCB0cmFuc2Zvcm1zTmV3ID0gdGhpcy5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50KGdlc3R1cmUsIHRyYW5zZm9ybXMpXG5cbiAgLy8gd2VpcmRseSBlbm91Z2gsIHdlIGhhdmUgdG8gY2FsY3VsYXRlIHRoZSBvZmZzZXRcbiAgLy8gdHJhbnNmb3Jtc05ldy50cmFuc2xhdGUueCArPSAodHJhbnNmb3Jtc05ldy50cmFuc2xhdGUueCAtIHRyYW5zbGF0ZUNhbGN1bGF0ZWQueClcbiAgLy8gdHJhbnNmb3Jtc05ldy50cmFuc2xhdGUueSArPSAodHJhbnNmb3Jtc05ldy50cmFuc2xhdGUueSAtIHRyYW5zbGF0ZUNhbGN1bGF0ZWQueSlcblxuICAvLyBhbmNob3IgdGhlIHNjYWxlIHZhbHVlLCB0byB1c2UgYXMgcG9pbnQgb2YgZGVwYXJ0dXJlIGluIG5leHQgbW92ZW1lbnRcbiAgdGhpcy5hbmNob3Iuc2NhbGUgPSB0cmFuc2Zvcm1zTmV3LnNjYWxlXG5cbiAgY29uc3QgdHJhbnNsYXRlQ2FsY3VsYXRlZCA9IHRoaXMuYW5uaWdpbGF0ZVNoaWZ0KG9yaWdpbiwgdHJhbnNmb3JtcylcblxuICAvLyB0aGlzLmFuY2hvci5vZmZzZXQueCArPSB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZS54IC0gdHJhbnNsYXRlQ2FsY3VsYXRlZC54XG4gIC8vIHRoaXMuYW5jaG9yLm9mZnNldC55ICs9IHRyYW5zZm9ybXNOZXcudHJhbnNsYXRlLnkgLSB0cmFuc2xhdGVDYWxjdWxhdGVkLnlcblxuICB0aGlzLmFuY2hvci5vZmZzZXQgPSB7XG4gICAgeDogdHJhbnNmb3Jtc05ldy50cmFuc2xhdGUueCAtIHRyYW5zbGF0ZUNhbGN1bGF0ZWQueCxcbiAgICB5OiB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZS55IC0gdHJhbnNsYXRlQ2FsY3VsYXRlZC55XG4gIH1cblxuICByZXR1cm4gdHJhbnNmb3Jtc05ld1xufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLm1hcFRvT3JpZ2luID0gZnVuY3Rpb24oZ2VzdHVyZUNlbnRlciwgdHJhbnNmb3JtcywgcmVjdHMpIHtcbiAgLy8gZGV0ZXJtaW5lIHBvaW50J3MgcG9zaXRpb24sIHJlbGF0aXZlIHRvIHRoZSBzY2FsYWJsZSBlbGVtZW50XG4gIGNvbnN0IHBvaW50UG9zV2l0aGluRWwgPSB7XG4gICAgbGVmdDogZ2VzdHVyZUNlbnRlci54IC0gcmVjdHMubGVmdCxcbiAgICB0b3A6IGdlc3R1cmVDZW50ZXIueSAtIHJlY3RzLnRvcFxuICB9XG5cbiAgLy8gbWFwIHBvaW50J3MgcG9zaXRpb24gdG8gdGhlIGFwcHJvcHJpYXRlIChwcm9wZXIpIHRyYW5zZm9ybS1vcmlnaW4gdmFsdWUgKHdoaWNoIGlzIGFsd2F5cyBpbiBzY2FsZSBvZiAxKVxuICBjb25zdCBvcmlnaW4gPSB7XG4gICAgeDogcG9pbnRQb3NXaXRoaW5FbC5sZWZ0IC8gdHJhbnNmb3Jtcy5zY2FsZS54LFxuICAgIHk6IHBvaW50UG9zV2l0aGluRWwudG9wIC8gdHJhbnNmb3Jtcy5zY2FsZS55XG4gIH1cblxuICByZXR1cm4gb3JpZ2luXG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuYW5uaWdpbGF0ZVNoaWZ0ID0gZnVuY3Rpb24ob3JpZ2luLCB0cmFuc2Zvcm1zKSB7XG5cbiAgLy8gMTUwIGlzIChpZiBJIHJlY2FsbCBpdCByaWdodCkgaGFsZiBvZiB0aGUgZWxlbWVudCdzIHNpemUgKG5vIGlkZWEgd2h5IHRoYXRcbiAgLy8gbmVlZHMgb3IgbmVlZHMgbm90IHRvIGJlIHRoZSBjYXNlKVxuXG4gIC8vIGluIGZhY3QsIDE1MCBpcyBmdWxsIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAgY29uc3QgdHJhbnNsYXRlID0ge1xuICAgIHg6ICgob3JpZ2luLnggLSA1MCkgKiB0cmFuc2Zvcm1zLnNjYWxlLnggLSAob3JpZ2luLnggLSA1MCkpLCAvLyAgKyB0cmFuc2Zvcm1zLm9mZnNldC54XG4gICAgeTogKChvcmlnaW4ueSAtIDUwKSAqIHRyYW5zZm9ybXMuc2NhbGUueSAtIChvcmlnaW4ueSAtIDUwKSkgLy8gICsgdHJhbnNmb3Jtcy5vZmZzZXQueVxuICB9XG5cbiAgcmV0dXJuIHRyYW5zbGF0ZVxufVxuXG4vKlxuQmVjYXVzZSBvZiB0aGUgc3BlY2lmaWNzIG9mIGhvdyBtYXRyaXggaXMgcHJvamVjdGVkIC0gd2hpY2ggSSBkb24ndCB1bmRlcnN0YW5kLCBidXQgdGhlIGJvdHRvbSBsaW5lIGlzIC1cbnNjYWxlIGZhY3RvciBvZiBlbCBhZmZlY3RzIHRoZSBuZWNlc3NhcnkgdHJhbnNsYXRpb24uXG5cbmkuIGUuIChlLiBnLiksIGVsIHdpdGggdGhlIHNhbWUgb3JpZ2luIGJ1dCBkaWZmZXJlbnQgc2NhbGUgZmFjdG9ycyB3aWxsIG5lZWQgZGlmZmVyZW50IHRyYW5zbGF0aW9uLCB0b1xuc3RheSBhdCB0aGUgc2FtZSBwbGFjZSAoaW4gdGVybXMgb2Ygb3JpZ2luKVxuXG5JIG1lYW4sIHNheSBJIGhhdmUgb3JpZ2luIHh4LCBzY2FsZSBvZiB4eSwgYW5kIHRyYW5zbGF0aW9uIHh6LiBOb3csIEkndmUgY2hhbmdlZCBzY2FsZSB0byB5eC5cblNvIGZhciBzbyBnb29kIC0gdGhlIGVsIGlzIHdoZXJlIGl0J3Mgc3VwcG9zZSB0byBiZSAtIHByb2plY3RlZCBvdXR3YXJkcyBvZiB0aGUgb3JpZ2luLiBCdXQgaWYgSSBub3dcbm1hbnVhbGx5IHNldCB0aGUgdHJhbnNvZm1yLW9yaWdpbiBwcm9wIC0gZXZlbiB0byB0aGUgc2FtZSB2YWx1ZSBpdCB3YXMsIHh4IC0gdGhlIGVsIHdpbGwgY2hhbmdlIGl0J3MgcmVuZGVyZWQgcG9zaXRpb24uLlxuXG5UaGlzIGRvZXNudCBzZWVtIHRvIGJlIHRydWUuLi5cblxuKi9cblNjYWxlQ29yZS5wcm90b3R5cGUuZW5jb3VudGVyT2Zmc2V0ID0gZnVuY3Rpb24ob3JpZ2luLCB0cmFuc2Zvcm1zKSB7XG5cbiAgY29uc3QgdHJhbnNsYXRlQ2FsY3VsYXRlZCA9IHRoaXMuYW5uaWdpbGF0ZVNoaWZ0KG9yaWdpbiwgdHJhbnNmb3JtcylcblxuICBjb25zdCB0cmFuc2xhdGVPZmZzZXQgPSB7XG4gICAgeDogdHJhbnNmb3Jtcy50cmFuc2xhdGUueCAtIHRyYW5zbGF0ZUNhbGN1bGF0ZWQueCxcbiAgICB5OiB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS55IC0gdHJhbnNsYXRlQ2FsY3VsYXRlZC55XG4gIH1cblxuICByZXR1cm4gdHJhbnNsYXRlT2Zmc2V0XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuZW5jb3VudGVyQm91bmRzID0gZnVuY3Rpb24odHJhbnNmb3JtcywgcmVjdHMsIHBhcmVudCkge1xuXG4gIHZhciBhcnJheSA9IFtcbiAgICB7XG4gICAgICBsZW5ndGg6IHJlY3RzLndpZHRoLFxuICAgICAgcG9zOiByZWN0cy5sZWZ0LFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zZm9ybXMudHJhbnNsYXRlLngsXG4gICAgICBwYXJlbnQ6IHBhcmVudC53aWR0aCAvLyBwYXJzZUludChnZXRWaWV3cG9ydFdpZHRoKCkpXG4gICAgfSxcbiAgICB7XG4gICAgICBsZW5ndGg6IHJlY3RzLmhlaWdodCxcbiAgICAgIHBvczogcmVjdHMudG9wLFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zZm9ybXMudHJhbnNsYXRlLnksXG4gICAgICBwYXJlbnQ6IHBhcmVudC5oZWlnaHQgLy8gcGFyc2VJbnQoZ2V0Vmlld3BvcnRIZWlnaHQoKSlcbiAgICB9XG4gIF1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRlbXAgPSBwcm9jZXNzKGFycmF5W2ldKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInR3ZWFrSXRcIiwgdGVtcClcbiAgICBhcnJheVtpXS5uZXdQb3MgPSAodHlwZW9mKHRlbXApID09PSAnbnVtYmVyJykgPyB0ZW1wIDogYXJyYXlbaV0udHJhbnNsYXRpb247XG4gIH1cblxuICBjb25zdCB0cmFuc2xhdGUgPSB7XG4gICAgeDogYXJyYXlbMF0ubmV3UG9zLFxuICAgIHk6IGFycmF5WzFdLm5ld1Bvc1xuICB9XG5cbiAgLy8gT2JqZWN0LmFzc2lnbiBpcyBlczYsIGJ1dCB0aGVyZSdzIGEgcG9seWZpbGwsIGluIGNhc2Ugb2YgYW55dGhpbmc6XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAgLy8gT2JqZWN0LmFzc2lnbih0cmFuc2Zvcm1zTmV3LCB0cmFuc2Zvcm1zKVxuXG4gIC8vIHRyYW5zZm9ybXNOZXcudHJhbnNsYXRlWCA9IGFycmF5WzBdLm5ld1BvcztcbiAgLy8gdHJhbnNmb3Jtc05ldy50cmFuc2xhdGVZID0gYXJyYXlbMV0ubmV3UG9zO1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3MoYXhpcykge1xuXG4gICAgaWYgKGF4aXMubGVuZ3RoIDw9IGF4aXMucGFyZW50KSB7XG4gICAgICBpZiAoYXhpcy5wb3MgPiAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiAtIChheGlzLnBvcyAtIChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXhpcy5wb3MgPCAoMCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiArIE1hdGguYWJzKGF4aXMucG9zKSArIDIgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGF4aXMubGVuZ3RoID4gYXhpcy5wYXJlbnQpIHtcbiAgICAgIGlmIChheGlzLnBvcyA+ICgwKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uIC0gYXhpcy5wb3MgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXhpcy5wb3MgPCAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuICggKGF4aXMudHJhbnNsYXRpb24gKyAoIE1hdGguYWJzKGF4aXMucG9zKSAtIE1hdGguYWJzKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpICkpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cmFuc2xhdGVcblxuICAvLyByZXR1cm4gdHJhbnNmb3Jtc05ldztcbiAgLy90aGlzLmVsZW1lbnQuY3NzKCAndHJhbnNmb3JtJywgJ21hdHJpeCgnICsgY29vcmRzLnNjYWxlWCArICcsIDAsIDAsICcgKyBjb29yZHMuc2NhbGVZICsgICcsICcgKyB4Lm5ld1BvcyArICcsICcgKyB5Lm5ld1BvcyArICcpJyApO1xuXG59XG5cbmV4cG9ydCB7U2NhbGVDb3JlfVxuXG4vKlxuY29uc3QgU2NhbGVDb3JlID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTY2FsZUNvcmVDYXBzdWxlKClcbiAgfVxufVxuXG4vLyBleHBvcnQge1NjYWxlQ29yZUNhcHN1bGV9XG4qL1xuXG5mdW5jdGlvbiBTY2FsZURvbUlvKCkge31cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24oZWwpIHtcbiAgY29uc3Qgb3JpZ2luRGF0YSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsndHJhbnNmb3JtLW9yaWdpbiddLnNwbGl0KCcgJylcblxuICBjb25zdCBvcmlnaW4gPSB7XG4gICAgeDogcGFyc2VJbnQob3JpZ2luRGF0YVswXSksXG4gICAgeTogcGFyc2VJbnQob3JpZ2luRGF0YVsxXSlcbiAgfVxuXG4gIHJldHVybiBvcmlnaW5cbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtcyA9IGZ1bmN0aW9uKGVsKSB7XG4gIGNvbnN0IHRyYW5zZm9ybXMgPSB7fVxuICBjb25zdCB0cmFuc2Zvcm1zRGF0YSA9IGVsLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCcpJylbMF0uc3BsaXQoJywnKTtcblxuICB0cmFuc2Zvcm1zLnNjYWxlID0ge1xuICAgIHg6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbMF0pLFxuICAgIHk6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbM10pXG4gIH1cblxuICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZSA9IHtcbiAgICB4OiBwYXJzZUZsb2F0KHRyYW5zZm9ybXNEYXRhWzRdKSxcbiAgICB5OiBwYXJzZUZsb2F0KHRyYW5zZm9ybXNEYXRhWzVdKVxuICB9XG5cbiAgcmV0dXJuIHRyYW5zZm9ybXNcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0UmVjdHMgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZ2V0Vmlld3BvcnREaW1zID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IGdldFZpZXdwb3J0V2lkdGgoKSxcbiAgICBoZWlnaHQ6IGdldFZpZXdwb3J0SGVpZ2h0KClcbiAgfVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5zZXRNYXRyaXggPSBmdW5jdGlvbihlbCwgdHJhbnNmb3Jtcykge1xuICBjb25zb2xlLmxvZygnc2V0TWF0cml4JywgdHJhbnNmb3JtcylcbiAgY29uc3QgbWF0cml4U3RyID0gJ21hdHJpeCgnICtcbiAgICB0cmFuc2Zvcm1zLnNjYWxlLnggKyAnLCAwLCAwLCAnICtcbiAgICB0cmFuc2Zvcm1zLnNjYWxlLnkgKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZS54ICsgJywgJyArXG4gICAgdHJhbnNmb3Jtcy50cmFuc2xhdGUueSArXG4gICAgJyknXG5cbiAgdGhpcy5kb1NldE1hdHJpeChlbCwgbWF0cml4U3RyKVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5kb1NldE1hdHJpeCA9IGZ1bmN0aW9uKGVsLCBtYXRyaXhTdHIpIHtcbiAgY29uc29sZS5sb2coJ3NldE1hdHJpeCcsIG1hdHJpeFN0cilcbiAgZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLm1velRyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5tc1RyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5vVHJhbnNmb3JtID0gbWF0cml4U3RyXG4gIGVsLnN0eWxlLnRyYW5zZm9ybSA9IG1hdHJpeFN0clxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbihlbCwgb3JpZ2luKSB7XG4gIGVsLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IG9yaWdpbi54KyBcInB4IFwiKyBvcmlnaW4ueSsgXCJweFwiXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmluaXRpYWxpemVFbGVtZW50c01hdHJpeCA9IGZ1bmN0aW9uKGVsKSB7XG4gIC8vIHNldCB0aGUgaW5pdGlhbCB2YWx1ZSBvZiB0cmFuc2Zvcm0gdG8gbWF0cml4O1xuICBjb25zdCBtYXRyaXhTdHIgPSAnbWF0cml4KDEsIDAsIDAsIDEsIDAsIDApJ1xuICB0aGlzLmRvU2V0TWF0cml4KGVsLCBtYXRyaXhTdHIpXG59XG5cbmV4cG9ydCB7U2NhbGVEb21Jb31cblxuLypcbmNvbnN0IFNjYWxlRG9tSW8gPSB7XG4gIGV4cG9zZTogZnVuY3Rpb24oKSB7IC8vIHVudmVpbFxuICAgIHJldHVybiBTY2FsZURvbUlvQ2Fwc3VsZSgpXG4gIH1cbn1cblxuLy8gZXhwb3J0IHtTY2FsZURvbUlvQ2Fwc3VsZX1cblxuKi9cblxuLy8gaW1wb3J0IHtNZWFzdXJlQWx0ZXJ9IGZyb20gXCJkb21cIlxuLy8gaW1wb3J0IHtDYWxjdWxhdG9yfSBmcm9tIFwiY2FsY3VsYXRvclwiXG4vL1xuLy8gY29uc3QgTWVhc3VyZUFsdGVyID0gTWVhc3VyZUFsdGVyLmluaXQoKVxuLy8gY29uc3QgQ2FsY3VsYXRvciA9IENhbGN1bGF0b3IuaW5pdCgpXG5cbi8vIGNvbnN0IFNjYWxlQ29yZSA9IFNjYWxlQ29yZS5leHBvc2UoKVxuLy8gY29uc3QgU2NhbGVEb21JbyA9IFNjYWxlRG9tSW8uZXhwb3NlKClcblxuZnVuY3Rpb24gU2NhbGVDYXBzdWxlKCkge1xufVxuXG5mdW5jdGlvbiBTY2FsZShlbCwgb3B0aW9ucykge1xuICB0aGlzLmVsID0gZWxcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAvLyB0aGlzLnNjYWxlRmFjdG9yID0gb3B0aW9ucy5zY2FsZUZhY3RvcjtcbiAgLy8gdGhpcy50cmFuc2l0aW9uQ2xhc3MgPSBvcHRpb25zLnRyYW5zaXRpb25DbGFzcyB8fCAnc2NhbGFibGUtdHJhbnNpdGlvbidcblxuICB0aGlzLmNvcmUgPSBuZXcgU2NhbGVDb3JlKClcbiAgdGhpcy5kb21JbyA9IG5ldyBTY2FsZURvbUlvKClcblxuICAvLyBzZXQgdGhlIGluaXRpYWwgdmFsdWUgb2YgdHJhbnNmb3JtIHRvIG1hdHJpeCwgaW4gdGhlIGVsZW1lbnRcbiAgdGhpcy5kb21Jby5pbml0aWFsaXplRWxlbWVudHNNYXRyaXgodGhpcy5lbClcblxuICB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmRvbUlvLmdldFRyYW5zZm9ybXModGhpcy5lbClcbiAgdGhpcy5vcmlnaW4gPSB0aGlzLmRvbUlvLmdldE9yaWdpbih0aGlzLmVsKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuXG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVyOiBcIiwgdGhpcylcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlU3RhcnQgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVTdGFydCwgZ2VzdHVyZTogXCIsIGdlc3R1cmUpXG4gIGNvbnN0IGNvb3JkcyA9IHRoaXMuY29yZS5pbml0aWFsaXplTW92ZW1lbnQoZ2VzdHVyZSwgdGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB0aGlzLm9yaWdpbilcbiAgLy8gY29uc29sZS5sb2coXCJzY2FsZVN0YXJ0LCBpbml0TW92ZW1lbnQgcmV0dXJuXCIsIGNvb3JkcylcblxuICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gY29vcmRzLnRyYW5zbGF0ZVxuICB0aGlzLm9yaWdpbiA9IGNvb3Jkcy5vcmlnaW5cblxuICB0aGlzLmRvbUlvLnNldE9yaWdpbih0aGlzLmVsLCB0aGlzLm9yaWdpbilcbiAgdGhpcy5kb21Jby5zZXRNYXRyaXgodGhpcy5lbCwgdGhpcy50cmFuc2Zvcm1zKVxufVxuXG5TY2FsZS5wcm90b3R5cGUuc2NhbGVNb3ZlID0gZnVuY3Rpb24oZ2VzdHVyZSkge1xuICAvLyBjb25zb2xlLmxvZyhcInNjYWxlTW92ZSwgZ2VzdHVyZTogXCIsIGdlc3R1cmUpXG4gIGNvbnN0IGNhbGN1bGF0ZWQgPSB0aGlzLmNvcmUuY2FsY3VsYXRlRGlzY3JldGVQb2ludChnZXN0dXJlLCB0aGlzLnRyYW5zZm9ybXMpXG5cbiAgdGhpcy50cmFuc2Zvcm1zLnNjYWxlID0gY2FsY3VsYXRlZC5zY2FsZVxuICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gY2FsY3VsYXRlZC50cmFuc2xhdGVcblxuICB0aGlzLmRvbUlvLnNldE1hdHJpeCh0aGlzLmVsLCB0aGlzLnRyYW5zZm9ybXMpXG59XG5cblNjYWxlLnByb3RvdHlwZS5zY2FsZVN0b3AgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwic2NhbGVTdG9wLCBnZXN0dXJlOiBcIiwgZ2VzdHVyZSlcbiAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5jb3JlLmZpbmlzaE1vdmVtZW50KGdlc3R1cmUsIHRoaXMudHJhbnNmb3JtcywgdGhpcy5vcmlnaW4pXG5cbiAgY29uc3QgdnBydERpbXMgPSB0aGlzLmRvbUlvLmdldFZpZXdwb3J0RGltcygpXG5cbiAgLy8gc2VlLCBpZiBlbCBleGNlZWRzIHBhcmVudCdzIGFyZWEgaW4gYW4gdWdseSB3YXlcbiAgY29uc3QgdHJhbnNsYXRlQm91bmQgPSB0aGlzLmNvcmUuZW5jb3VudGVyQm91bmRzKHRoaXMudHJhbnNmb3JtcywgdGhpcy5yZWN0cywgdnBydERpbXMpXG5cbiAgLy8gdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZSA9IHRyYW5zbGF0ZUJvdW5kXG4gIHRoaXMuZG9tSW8uc2V0TWF0cml4KHRoaXMuZWwsIHRoaXMudHJhbnNmb3JtcylcbiAgdGhpcy5yZWN0cyA9IHRoaXMuZG9tSW8uZ2V0UmVjdHModGhpcy5lbClcblxuICAvLyBpZiAoXG4gIC8vICAgdHJhbnNmb3Jtc0JvdW5kZWQudHJhbnNsYXRlWCAhPSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWFxuICAvLyAgIHx8IHRyYW5zZm9ybXNCb3VuZGVkLnRyYW5zbGF0ZVkgIT0gdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVlcbiAgLy8gKSB7XG4gIC8vICAgdGhpcy50d2VlbkluKClcbiAgLy8gfVxufVxuXG5TY2FsZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtRGF0YSA9IGZ1bmN0aW9uKHRyYW5zZm9ybXMsIG9yaWdpbikge1xuXG4gIC8vXG4gIHRoaXMudHJhbnNmb3JtcyA9IE9iamVjdC5hc3NpZ24odGhpcy50cmFuc2Zvcm1zLCB0cmFuc2Zvcm1zKVxuICB0aGlzLm9yaWdpbiA9IE9iamVjdC5hc3NpZ24odGhpcy5vcmlnaW4sIG9yaWdpbilcbn1cblxuLypcblxuU2NhbGUucHJvdG90eXBlLnJBZiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmFmSWQgPSAwXG4gIHJhZkNiID0gZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCByYWZJZFByZXYgPSByYWZJZFxuICAgIHJhZklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cbiAgICAgIC8vIHByZXZlbnQgbXVsdGlwbGUgc2ltdWx0YW5ldW9zIHJBZnNcbiAgICAgIGlmIChyYWZJZCA9PSByYWZJZFByZXYpIHJldHVyblxuXG4gICAgICAvLyBkbyBvdXIgYW5pbWF0aW9uXG5cbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMucmFuZ2UuZ2V0TmV4dCgpXG4gICAgICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWCA9IHZhbFxuICAgICAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVkgPSB2YWxcbiAgICAgIHJhZkNiKClcbiAgICB9KVxuICB9XG59XG5cblNjYWxlLnByb3RvdHlwZS50d2VlbkluID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdmFsdWUgPSBuZXcgUmFuZ2UoXG4gICAgICAvLyBsZW5ndGggb2YgdGhlIHJhbmdlXG4gICAgICB0cmFuc2Zvcm1zQm91bmQudHJhbnNsYXRlWCAtIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYLFxuXG4gICAgICAvLyBwb2ludHMgdG8gZ28gZnJvbSBhbmQgdG9cbiAgICAgIHtcbiAgICAgICAgZnJvbTogdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVksXG4gICAgICAgIHRvOiB0cmFuc2Zvcm1zQm91bmQudHJhbnNsYXRlWVxuICAgICAgfSxcblxuICAgICAgLy8gY3VycmVudCBwb3NpdGlvblxuICAgICAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVhcbiAgICApXG59XG4qL1xuXG5cbmV4cG9ydCB7U2NhbGV9XG5cbi8qXG5jb25zdCBTY2FsZSA9IHtcbiAgZXhwb3NlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU2NhbGVDYXBzdWxlKClcbiAgfVxufVxuXG5leHBvcnQge1NjYWxlfVxuXG4qL1xuIiwiaW1wb3J0IHtTY2FsZX0gZnJvbSBcIi4uL2Rpc3Qvc2NhbGUuanNcIlxuaW1wb3J0IHtwaW5jaEVtdWxhdG9yfSBmcm9tIFwiZW11bGF0ZS1waW5jaFwiXG5cbmZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnNvbGUubG9nKFNjYWxlKVxuXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxhYmxlJylcbiAgY29uc3Qgc2NhbGVyID0gbmV3IFNjYWxlKGVsKVxuXG4gIC8vIGFuIGltcHJvdmlzYXRpb25hbCB0cmFuc2xhdGUgbWV0aG9kLCB0byBjaGVjayB0aGF0IHVwZGF0ZVRyYW5zZm9ybURhdGEgd29ya3MuXG4gIHNjYWxlci50cmFuc2xhdGUgPSBmdW5jdGlvbih0cmFuc2wsIHNjYWxlRmFjdG9yKSB7XG4gICAgLy8gc2NhbGVyLmVsLnN0eWxlLnRyYW5zZm9ybSA9IFwibWF0cml4KFwiKyBzY2FsZUZhY3RvciArXCIsIDAsIDAsIFwiKyBzY2FsZUZhY3RvciArXCIsIFwiKyB0cmFuc2wgK1wiLCBcIisgdHJhbnNsICtcIilcIlxuICAgIC8vIHRyYW5zbGF0ZShzY2FsYWJsZS5lbCwgdHJhbnNsLCBzY2FsZUZhY3RvcilcblxuICAgIHNjYWxlci5kb21Jby5zZXRNYXRyaXgoZWwsIHtcbiAgICAgIHRyYW5zbGF0ZToge1xuICAgICAgICB4OiB0cmFuc2wsXG4gICAgICAgIHk6IHRyYW5zbFxuICAgICAgfSxcbiAgICAgIHNjYWxlOiB7XG4gICAgICAgIHg6IHNjYWxlRmFjdG9yLFxuICAgICAgICB5OiBzY2FsZUZhY3RvclxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB0cmFuc2Zvcm1zID0gc2NhbGVyLmRvbUlvLmdldFRyYW5zZm9ybXMoKVxuXG4gICAgc2NhbGFibGUudXBkYXRlVHJhbnNmb3JtRGF0YSh0cmFuc2Zvcm1zKVxuICB9XG5cbiAgLy9cbiAgcGluY2hFbXVsYXRvci5vbnN0YXJ0ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9uc3RhcnRcIiwgZXYpXG4gICAgc2NhbGVyLnNjYWxlU3RhcnQoZXYpXG4gIH1cblxuICBwaW5jaEVtdWxhdG9yLm9ubW92ZSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJvbm1vdmVcIiwgZXYpXG4gICAgc2NhbGVyLnNjYWxlTW92ZShldilcbiAgfVxuXG4gIHBpbmNoRW11bGF0b3Iub25lbmQgPSBmdW5jdGlvbihldikge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25lbmRcIiwgZXYpXG4gICAgc2NhbGVyLnNjYWxlU3RvcChldilcbiAgfVxuXG4gIHBpbmNoRW11bGF0b3Iuc3Vic2NyaWJlKClcblxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbWFpbilcbiJdLCJzb3VyY2VSb290IjoiIn0=