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

    this.pointLeft = this.initial.pointLeft - Math.abs(dx)
    this.pointRight = this.initial.pointRight + Math.abs(dx)

    const distance = this.pointRight - this.pointLeft
    // console.log("distance, pL, pR", distance, this.pointLeft, this.pointRight)

    this.scale = distance / this.initial.distance

    return {
      scale: this.scale,
      
      // center.y is not calculated properly, but we have to return center in this form
      center: {x: this.initial.center.x + dx / 2, y: this.initial.center.y}
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
  this.anchor.translate = transforms.translate

  // map ev's position to the appropriate (proper) transform-origin value (which is always in scale of 1)
  // (map ev's position onto the el's matrix)
  const origin = this.mapToOrigin(gesture.center, transforms, rects)


  // annigilate shifting of the element on origin change
  const translate = this.annigilateShift(origin, transforms)

  console.log("initMovement - origin, translate, anchor", origin, translate, this.anchor)
  return {
    translate: translate, // transforms.translate,
    origin: origin
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
  const translate = {
    x: ((origin.x - 150) * transforms.scale.x - (origin.x - 150)), //  + transforms.offset.x
    y: ((origin.y - 150) * transforms.scale.x - (origin.y - 150)) //  + transforms.offset.y
  }

  return translate
}

ScaleCore.prototype.encounterBounds = function(transforms, rects, parent) {

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

  console.log("scaler: ", this)
}

Scale.prototype.scaleStart = function(gesture) {
  console.log("scaleStart, gesture: ", gesture)
  const coords = this.core.initializeMovement(gesture, this.transforms, this.rects, this.origin)
  console.log("scaleStart, initMovement return", coords)

  this.transforms.translate = coords.translate
  this.origin = coords.origin

  this.domIo.setMatrix(this.el, this.transforms)
  this.domIo.setOrigin(this.el, this.origin)

  // this.transforms = this.core.handleOriginChange()
  // this.anchor = this.core.setAnchor(this.transforms, this.ev.center)
}

Scale.prototype.scaleMove = function(gesture) {
  console.log("scaleMove, gesture: ", gesture)
  const calculated = this.core.calculateDiscretePoint(gesture, this.transforms)

  this.transforms.scale = calculated.scale
  this.transforms.translate = calculated.translate

  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.scaleStop = function(gesture) {
  console.log("scaleStop, gesture: ", gesture)
  this.transforms = this.core.finishMovement(gesture, this.transforms)
  this.rects = this.domIo.getRects(this.el)

  // see, if el exceeds parent's area in an ugly way
  const transformsBounded = this.encounterBounds(this.transforms, this.rects, vprtDims)

  if (
    transformsBounded.translateX != this.transforms.translateX
    || transformsBounded.translateY != this.transforms.translateY
  ) {
    this.tweenIn()
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2VtdWxhdGUtcGluY2gvZGlzdC9lbXVsYXRlLXBpbmNoLmpzIiwid2VicGFjazovLy8uL2Rpc3Qvc2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFUTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGUjtBQUFBLFdBQVcsb0NBQW9DOztBQUUvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUIsMEJBQTBCO0FBQ25EOztBQUVBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7O0FBRVI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWDs7QUFFQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFROztBQUVSOzs7Ozs7Ozs7Ozs7Ozs7O0FDMWFjO0FBQ1E7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBIiwiZmlsZSI6InNjYWxlLXRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Rlc3QvdGVzdC5qc1wiKTtcbiIsImNvbnN0IHBpbmNoRW11bGF0b3IgPSB7XG4gIHN1YnNjcmliZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcblxuICAgIGZ1bmN0aW9uIG9ubW91c2Vtb3ZlKGV2KSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlbW92ZVwiLCBzZWxmKVxuXG4gICAgICBpZiAodHlwZW9mKHNlbGYub25tb3ZlKSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBzZWxmLm9ubW92ZShzZWxmLm1vdmVQaW5jaChldikpXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1vdmVQaW5jaChldikpXG4gICAgfVxuXG4gICAgY29uc3QgYm9keUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIilcblxuICAgIGJvZHlFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldikgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJtb3VzZWRvd25cIilcbiAgICAgIGlmICh0eXBlb2YodGhpcy5vbnN0YXJ0KSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aGlzLm9uc3RhcnQodGhpcy5pbml0UGluY2goZXYpKVxuXG4gICAgICAvLyBjb25zb2xlLmxvZyhwaW5jaEVtdWxhdG9yLmluaXRQaW5jaChldikpXG4gICAgICBib2R5RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbm1vdXNlbW92ZSlcbiAgICB9KVxuXG4gICAgYm9keUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldikgPT4ge1xuICAgICAgaWYgKHR5cGVvZih0aGlzLm9uZW5kKSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICB0aGlzLm9uZW5kKHRoaXMuZW5kUGluY2goZXYpKVxuXG4gICAgICBib2R5RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbm1vdXNlbW92ZSlcbiAgICB9KVxuICB9LFxuICBwb2ludHNPZmZzZXQ6IDc1LFxuICBpbml0UGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgdGhpcy5pbml0aWFsID0ge1xuICAgICAgY2VudGVyOiB7XG4gICAgICAgIHg6IGV2LnBhZ2VYLFxuICAgICAgICB5OiBldi5wYWdlWVxuICAgICAgfSxcblxuICAgIH1cblxuICAgIHRoaXMuaW5pdGlhbC5wb2ludExlZnQgPSB0aGlzLmluaXRpYWwuY2VudGVyLnggLSB0aGlzLnBvaW50c09mZnNldFxuICAgIHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0ID0gdGhpcy5pbml0aWFsLmNlbnRlci54ICsgdGhpcy5wb2ludHNPZmZzZXRcblxuICAgIHRoaXMuaW5pdGlhbC5kaXN0YW5jZSA9IHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0IC0gdGhpcy5pbml0aWFsLnBvaW50TGVmdFxuXG4gICAgLy8gY29uc29sZS5sb2coXCJpbml0UGluY2hcIiwgdGhpcy5pbml0aWFsKVxuICAgIHRoaXMucG9pbnRMZWZ0ID0gdGhpcy5pbml0aWFsLnBvaW50TGVmdFxuICAgIHRoaXMucG9pbnRSaWdodCA9IHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0XG5cbiAgICB0aGlzLnNjYWxlID0gMVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLFxuICAgICAgY2VudGVyOiB0aGlzLmluaXRpYWwuY2VudGVyXG4gICAgfVxuICB9LFxuICBtb3ZlUGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgY29uc3QgZHggPSBldi5wYWdlWCAtIHRoaXMuaW5pdGlhbC5jZW50ZXIueCAvLyBNYXRoLmFicygpXG4gICAgLy8gY29uc29sZS5sb2coXCJpbml0Q2VudGVyLCBldi5wYWdlWCwgZHhcIiwgdGhpcy5pbml0aWFsLmNlbnRlci54LCBldi5wYWdlWCwgZHgpXG5cbiAgICB0aGlzLnBvaW50TGVmdCA9IHRoaXMuaW5pdGlhbC5wb2ludExlZnQgLSBNYXRoLmFicyhkeClcbiAgICB0aGlzLnBvaW50UmlnaHQgPSB0aGlzLmluaXRpYWwucG9pbnRSaWdodCArIE1hdGguYWJzKGR4KVxuXG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLnBvaW50UmlnaHQgLSB0aGlzLnBvaW50TGVmdFxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGlzdGFuY2UsIHBMLCBwUlwiLCBkaXN0YW5jZSwgdGhpcy5wb2ludExlZnQsIHRoaXMucG9pbnRSaWdodClcblxuICAgIHRoaXMuc2NhbGUgPSBkaXN0YW5jZSAvIHRoaXMuaW5pdGlhbC5kaXN0YW5jZVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLFxuICAgICAgXG4gICAgICAvLyBjZW50ZXIueSBpcyBub3QgY2FsY3VsYXRlZCBwcm9wZXJseSwgYnV0IHdlIGhhdmUgdG8gcmV0dXJuIGNlbnRlciBpbiB0aGlzIGZvcm1cbiAgICAgIGNlbnRlcjoge3g6IHRoaXMuaW5pdGlhbC5jZW50ZXIueCArIGR4IC8gMiwgeTogdGhpcy5pbml0aWFsLmNlbnRlci55fVxuICAgIH1cbiAgfSxcbiAgZW5kUGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgcmV0dXJuIHRoaXMubW92ZVBpbmNoKGV2KVxuICB9XG59XG5cbmV4cG9ydCB7cGluY2hFbXVsYXRvcn1cbiIsIi8vIGltcG9ydCB7Z2V0Vmlld3BvcnRXaWR0aCwgZ2V0Vmlld3BvcnRIZWlnaHR9IGZyb20gXCJwbHRmcm0tbGliXCJcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjk0Mjc4NS93aW5kb3ctaW5uZXJ3aWR0aC12cy1kb2N1bWVudC1kb2N1bWVudGVsZW1lbnQtY2xpZW50d2lkdGhcbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjM4OCNjMTRcbmZ1bmN0aW9uIGdldFZpZXdwb3J0SGVpZ2h0KCkge1xuICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgP1xuICAgIE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgOlxuICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xpZW50SGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRXaWR0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/XG4gICAgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgOlxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsaWVudFdpZHRoKTtcbn1cblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2FsZUNvcmUoKSB7XG4gIHRoaXMuYW5jaG9yID0ge1xuICAgIHNjYWxlOiB7XG4gICAgICB4OiAxLCB5OiAxXG4gICAgfVxuICB9XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vdmVtZW50ID0gZnVuY3Rpb24oZ2VzdHVyZSwgdHJhbnNmb3JtcywgcmVjdHMpIHtcblxuICAvKlxuICBpbml0aWFsaXplIHRoZSBvY2N1cmluZyBnZXN0dXJlOlxuICAqL1xuXG4gIC8vIGNhcHR1cmUgdGhlIGluaXRpYWwgY29vcmRpbmF0ZXMgb2YgZXYgYW5kIGVsXG4gIHRoaXMuYW5jaG9yLmNlbnRlciA9IGdlc3R1cmUuY2VudGVyXG4gIHRoaXMuYW5jaG9yLnRyYW5zbGF0ZSA9IHRyYW5zZm9ybXMudHJhbnNsYXRlXG5cbiAgLy8gbWFwIGV2J3MgcG9zaXRpb24gdG8gdGhlIGFwcHJvcHJpYXRlIChwcm9wZXIpIHRyYW5zZm9ybS1vcmlnaW4gdmFsdWUgKHdoaWNoIGlzIGFsd2F5cyBpbiBzY2FsZSBvZiAxKVxuICAvLyAobWFwIGV2J3MgcG9zaXRpb24gb250byB0aGUgZWwncyBtYXRyaXgpXG4gIGNvbnN0IG9yaWdpbiA9IHRoaXMubWFwVG9PcmlnaW4oZ2VzdHVyZS5jZW50ZXIsIHRyYW5zZm9ybXMsIHJlY3RzKVxuXG5cbiAgLy8gYW5uaWdpbGF0ZSBzaGlmdGluZyBvZiB0aGUgZWxlbWVudCBvbiBvcmlnaW4gY2hhbmdlXG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMuYW5uaWdpbGF0ZVNoaWZ0KG9yaWdpbiwgdHJhbnNmb3JtcylcblxuICBjb25zb2xlLmxvZyhcImluaXRNb3ZlbWVudCAtIG9yaWdpbiwgdHJhbnNsYXRlLCBhbmNob3JcIiwgb3JpZ2luLCB0cmFuc2xhdGUsIHRoaXMuYW5jaG9yKVxuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlLCAvLyB0cmFuc2Zvcm1zLnRyYW5zbGF0ZSxcbiAgICBvcmlnaW46IG9yaWdpblxuICB9XG59XG5cbi8vIGNhbGN1bGF0ZSBhIGRpc2NyZXRlIHBvaW50IGluIHRoZSBtb3ZlXG5TY2FsZUNvcmUucHJvdG90eXBlLmNhbGN1bGF0ZURpc2NyZXRlUG9pbnQgPSBmdW5jdGlvbihnZXN0dXJlLCB0cmFuc2Zvcm1zKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY29yZSwgY2FsY3VsYXRlRGlzY3JldGVQb2ludCAtIGdlc3R1cmUsIHRyYW5zZm9ybXMsIGFuY2hvcjpcIiwgZ2VzdHVyZSwgdHJhbnNmb3JtcywgdGhpcy5hbmNob3IpXG4gIC8vIGNvbnNvbGUubG9nKFwiY29yZSwgY2FsY3VsYXRlRGlzY3JldGVQb2ludCAtIHRyYW5zbGF0ZS54LCB+eTpcIiwgdHJhbnNmb3Jtcy50cmFuc2xhdGUueCwgdHJhbnNmb3Jtcy50cmFuc2xhdGUueSlcbiAgLy8gY29uc29sZS5sb2coXCJjb3JlLCBjYWxjdWxhdGVEaXNjcmV0ZVBvaW50IC0gYW5jaG9yLnRyYW5zbGF0ZS54LCB+eTpcIiwgdGhpcy5hbmNob3IudHJhbnNsYXRlLngsIHRoaXMuYW5jaG9yLnRyYW5zbGF0ZS55KVxuICBjb25zdCBzY2FsZSA9IHt9XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHt9XG5cbiAgLy8gaGFtbWVyJ3Mgc2NhbGUgc3RhcnRzIHdpdGggMCwgZW11bGF0ZS1waW5jaCAtIGZyb20gMVxuICBzY2FsZS54ID0gdGhpcy5hbmNob3Iuc2NhbGUueCAqIGdlc3R1cmUuc2NhbGU7XG4gIHNjYWxlLnkgPSB0aGlzLmFuY2hvci5zY2FsZS55ICogZ2VzdHVyZS5zY2FsZTtcblxuICAvLyB0cmFuc2Zvcm1zLnNjYWxlWCA9IHRoaXMuYW5jaG9yLnNjYWxlWCAqIGdlc3R1cmUuc2NhbGU7XG4gIC8vIHRyYW5zZm9ybXMuc2NhbGVZID0gdGhpcy5hbmNob3Iuc2NhbGVZICogZ2VzdHVyZS5zY2FsZTtcblxuICB0cmFuc2xhdGUueCA9IHRoaXMuYW5jaG9yLnRyYW5zbGF0ZS54ICsgKGdlc3R1cmUuY2VudGVyLnggLSB0aGlzLmFuY2hvci5jZW50ZXIueCk7XG4gIHRyYW5zbGF0ZS55ID0gdGhpcy5hbmNob3IudHJhbnNsYXRlLnkgKyAoZ2VzdHVyZS5jZW50ZXIueSAtIHRoaXMuYW5jaG9yLmNlbnRlci55KTtcblxuICAvLyBjb25zb2xlLmxvZyhcImNvcmUsIGNhbGN1bGF0ZURpc2NyZXRlUG9pbnQgLSB0cmFuc2xhdGU6XCIsIHRyYW5zbGF0ZSlcbiAgcmV0dXJuIHtcbiAgICBzY2FsZTogc2NhbGUsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGVcbiAgfVxufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLmZpbmlzaE1vdmVtZW50ID0gZnVuY3Rpb24oZ2VzdHVyZSwgdHJhbnNmb3Jtcykge1xuXG4gIGNvbnN0IHRyYW5zZm9ybXNOZXcgPSB0aGlzLmNhbGN1bGF0ZURpc2NyZXRlUG9pbnQoZ2VzdHVyZSwgdHJhbnNmb3JtcylcblxuICAvLyBhbmNob3IgdGhlIHNjYWxlIHZhbHVlLCB0byB1c2UgYXMgcG9pbnQgb2YgZGVwYXJ0dXJlIGluIG5leHQgbW92ZW1lbnRcbiAgdGhpcy5hbmNob3Iuc2NhbGUgPSB0cmFuc2Zvcm1zTmV3LnNjYWxlXG5cbiAgcmV0dXJuIHRyYW5zZm9ybXNOZXdcbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5tYXBUb09yaWdpbiA9IGZ1bmN0aW9uKGdlc3R1cmVDZW50ZXIsIHRyYW5zZm9ybXMsIHJlY3RzKSB7XG4gIC8vIGRldGVybWluZSBwb2ludCdzIHBvc2l0aW9uLCByZWxhdGl2ZSB0byB0aGUgc2NhbGFibGUgZWxlbWVudFxuICBjb25zdCBwb2ludFBvc1dpdGhpbkVsID0ge1xuICAgIGxlZnQ6IGdlc3R1cmVDZW50ZXIueCAtIHJlY3RzLmxlZnQsXG4gICAgdG9wOiBnZXN0dXJlQ2VudGVyLnkgLSByZWN0cy50b3BcbiAgfVxuXG4gIC8vIG1hcCBwb2ludCdzIHBvc2l0aW9uIHRvIHRoZSBhcHByb3ByaWF0ZSAocHJvcGVyKSB0cmFuc2Zvcm0tb3JpZ2luIHZhbHVlICh3aGljaCBpcyBhbHdheXMgaW4gc2NhbGUgb2YgMSlcbiAgY29uc3Qgb3JpZ2luID0ge1xuICAgIHg6IHBvaW50UG9zV2l0aGluRWwubGVmdCAvIHRyYW5zZm9ybXMuc2NhbGUueCxcbiAgICB5OiBwb2ludFBvc1dpdGhpbkVsLnRvcCAvIHRyYW5zZm9ybXMuc2NhbGUueVxuICB9XG5cbiAgcmV0dXJuIG9yaWdpblxufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLmFubmlnaWxhdGVTaGlmdCA9IGZ1bmN0aW9uKG9yaWdpbiwgdHJhbnNmb3Jtcykge1xuXG4gIC8vIDE1MCBpcyAoaWYgSSByZWNhbGwgaXQgcmlnaHQpIGhhbGYgb2YgdGhlIGVsZW1lbnQncyBzaXplIChubyBpZGVhIHdoeSB0aGF0XG4gIC8vIG5lZWRzIG9yIG5lZWRzIG5vdCB0byBiZSB0aGUgY2FzZSlcbiAgY29uc3QgdHJhbnNsYXRlID0ge1xuICAgIHg6ICgob3JpZ2luLnggLSAxNTApICogdHJhbnNmb3Jtcy5zY2FsZS54IC0gKG9yaWdpbi54IC0gMTUwKSksIC8vICArIHRyYW5zZm9ybXMub2Zmc2V0LnhcbiAgICB5OiAoKG9yaWdpbi55IC0gMTUwKSAqIHRyYW5zZm9ybXMuc2NhbGUueCAtIChvcmlnaW4ueSAtIDE1MCkpIC8vICArIHRyYW5zZm9ybXMub2Zmc2V0LnlcbiAgfVxuXG4gIHJldHVybiB0cmFuc2xhdGVcbn1cblxuU2NhbGVDb3JlLnByb3RvdHlwZS5lbmNvdW50ZXJCb3VuZHMgPSBmdW5jdGlvbih0cmFuc2Zvcm1zLCByZWN0cywgcGFyZW50KSB7XG5cbiAgdmFyIGFycmF5ID0gW1xuICAgIHtcbiAgICAgIGxlbmd0aDogcmVjdHMud2lkdGgsXG4gICAgICBwb3M6IHJlY3RzLmxlZnQsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNmb3Jtcy50cmFuc2xhdGVYLFxuICAgICAgcGFyZW50OiBwYXJlbnQud2lkdGggLy8gcGFyc2VJbnQoZ2V0Vmlld3BvcnRXaWR0aCgpKVxuICAgIH0sXG4gICAge1xuICAgICAgbGVuZ3RoOiByZWN0cy5oZWlnaHQsXG4gICAgICBwb3M6IHJlY3RzLnRvcCxcbiAgICAgIHRyYW5zbGF0aW9uOiB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVksXG4gICAgICBwYXJlbnQ6IHBhcmVudC5oZWlnaHQgLy8gcGFyc2VJbnQoZ2V0Vmlld3BvcnRIZWlnaHQoKSlcbiAgICB9XG4gIF1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRlbXAgPSBwcm9jZXNzKGFycmF5W2ldKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcInR3ZWFrSXRcIiwgdGVtcClcbiAgICBhcnJheVtpXS5uZXdQb3MgPSAodHlwZW9mKHRlbXApID09PSAnbnVtYmVyJykgPyB0ZW1wIDogYXJyYXlbaV0udHJhbnNsYXRpb247XG4gIH1cblxuICBjb25zdCB0cmFuc2Zvcm1zTmV3ID0ge31cblxuICAvLyBPYmplY3QuYXNzaWduIGlzIGVzNiwgYnV0IHRoZXJlJ3MgYSBwb2x5ZmlsbCwgaW4gY2FzZSBvZiBhbnl0aGluZzpcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnblxuICBPYmplY3QuYXNzaWduKHRyYW5zZm9ybXNOZXcsIHRyYW5zZm9ybXMpXG5cbiAgdHJhbnNmb3Jtc05ldy50cmFuc2xhdGVYID0gYXJyYXlbMF0ubmV3UG9zO1xuICB0cmFuc2Zvcm1zTmV3LnRyYW5zbGF0ZVkgPSBhcnJheVsxXS5uZXdQb3M7XG5cbiAgZnVuY3Rpb24gcHJvY2VzcyhheGlzKSB7XG5cbiAgICBpZiAoYXhpcy5sZW5ndGggPD0gYXhpcy5wYXJlbnQpIHtcbiAgICAgIGlmIChheGlzLnBvcyA+IChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uIC0gKGF4aXMucG9zIC0gKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpKSApO1xuICAgICAgfSBlbHNlIGlmIChheGlzLnBvcyA8ICgwKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uICsgTWF0aC5hYnMoYXhpcy5wb3MpICsgMiApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoYXhpcy5sZW5ndGggPiBheGlzLnBhcmVudCkge1xuICAgICAgaWYgKGF4aXMucG9zID4gKDApKSB7XG4gICAgICAgIHJldHVybiAoIGF4aXMudHJhbnNsYXRpb24gLSBheGlzLnBvcyApO1xuICAgICAgfSBlbHNlIGlmIChheGlzLnBvcyA8IChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gKCAoYXhpcy50cmFuc2xhdGlvbiArICggTWF0aC5hYnMoYXhpcy5wb3MpIC0gTWF0aC5hYnMoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkgKSkgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRyYW5zZm9ybXNOZXc7XG4gIC8vdGhpcy5lbGVtZW50LmNzcyggJ3RyYW5zZm9ybScsICdtYXRyaXgoJyArIGNvb3Jkcy5zY2FsZVggKyAnLCAwLCAwLCAnICsgY29vcmRzLnNjYWxlWSArICAnLCAnICsgeC5uZXdQb3MgKyAnLCAnICsgeS5uZXdQb3MgKyAnKScgKTtcblxufVxuXG5leHBvcnQge1NjYWxlQ29yZX1cblxuLypcbmNvbnN0IFNjYWxlQ29yZSA9IHtcbiAgZXhwb3NlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU2NhbGVDb3JlQ2Fwc3VsZSgpXG4gIH1cbn1cblxuLy8gZXhwb3J0IHtTY2FsZUNvcmVDYXBzdWxlfVxuKi9cblxuZnVuY3Rpb24gU2NhbGVEb21JbygpIHt9XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uKGVsKSB7XG4gIGNvbnN0IG9yaWdpbkRhdGEgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbClbJ3RyYW5zZm9ybS1vcmlnaW4nXS5zcGxpdCgnICcpXG5cbiAgY29uc3Qgb3JpZ2luID0ge1xuICAgIHg6IHBhcnNlSW50KG9yaWdpbkRhdGFbMF0pLFxuICAgIHk6IHBhcnNlSW50KG9yaWdpbkRhdGFbMV0pXG4gIH1cblxuICByZXR1cm4gb3JpZ2luXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmdldFRyYW5zZm9ybXMgPSBmdW5jdGlvbihlbCkge1xuICBjb25zdCB0cmFuc2Zvcm1zID0ge31cbiAgY29uc3QgdHJhbnNmb3Jtc0RhdGEgPSBlbC5zdHlsZS50cmFuc2Zvcm0uc3BsaXQoJygnKVsxXS5zcGxpdCgnKScpWzBdLnNwbGl0KCcsJyk7XG5cbiAgdHJhbnNmb3Jtcy5zY2FsZSA9IHtcbiAgICB4OiBwYXJzZUZsb2F0KHRyYW5zZm9ybXNEYXRhWzBdKSxcbiAgICB5OiBwYXJzZUZsb2F0KHRyYW5zZm9ybXNEYXRhWzNdKVxuICB9XG5cbiAgdHJhbnNmb3Jtcy50cmFuc2xhdGUgPSB7XG4gICAgeDogcGFyc2VGbG9hdCh0cmFuc2Zvcm1zRGF0YVs0XSksXG4gICAgeTogcGFyc2VGbG9hdCh0cmFuc2Zvcm1zRGF0YVs1XSlcbiAgfVxuXG4gIHJldHVybiB0cmFuc2Zvcm1zXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmdldFJlY3RzID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLmdldFZpZXdwb3J0RGltcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHdpZHRoOiBnZXRWaWV3cG9ydFdpZHRoKCksXG4gICAgaGVpZ2h0OiBnZXRWaWV3cG9ydEhlaWdodCgpXG4gIH1cbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuc2V0TWF0cml4ID0gZnVuY3Rpb24oZWwsIHRyYW5zZm9ybXMpIHtcbiAgY29uc29sZS5sb2coJ3NldE1hdHJpeCcsIHRyYW5zZm9ybXMpXG4gIGNvbnN0IG1hdHJpeFN0ciA9ICdtYXRyaXgoJyArXG4gICAgdHJhbnNmb3Jtcy5zY2FsZS54ICsgJywgMCwgMCwgJyArXG4gICAgdHJhbnNmb3Jtcy5zY2FsZS55ICsgJywgJyArXG4gICAgdHJhbnNmb3Jtcy50cmFuc2xhdGUueCArICcsICcgK1xuICAgIHRyYW5zZm9ybXMudHJhbnNsYXRlLnkgK1xuICAgICcpJ1xuXG4gIHRoaXMuZG9TZXRNYXRyaXgoZWwsIG1hdHJpeFN0cilcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZG9TZXRNYXRyaXggPSBmdW5jdGlvbihlbCwgbWF0cml4U3RyKSB7XG4gIGNvbnNvbGUubG9nKCdzZXRNYXRyaXgnLCBtYXRyaXhTdHIpXG4gIGVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5tb3pUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUubXNUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUub1RyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBtYXRyaXhTdHJcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuc2V0T3JpZ2luID0gZnVuY3Rpb24oZWwsIG9yaWdpbikge1xuICBlbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBvcmlnaW4ueCsgXCJweCBcIisgb3JpZ2luLnkrIFwicHhcIlxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5pbml0aWFsaXplRWxlbWVudHNNYXRyaXggPSBmdW5jdGlvbihlbCkge1xuICAvLyBzZXQgdGhlIGluaXRpYWwgdmFsdWUgb2YgdHJhbnNmb3JtIHRvIG1hdHJpeDtcbiAgY29uc3QgbWF0cml4U3RyID0gJ21hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKSdcbiAgdGhpcy5kb1NldE1hdHJpeChlbCwgbWF0cml4U3RyKVxufVxuXG5leHBvcnQge1NjYWxlRG9tSW99XG5cbi8qXG5jb25zdCBTY2FsZURvbUlvID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkgeyAvLyB1bnZlaWxcbiAgICByZXR1cm4gU2NhbGVEb21Jb0NhcHN1bGUoKVxuICB9XG59XG5cbi8vIGV4cG9ydCB7U2NhbGVEb21Jb0NhcHN1bGV9XG5cbiovXG5cbi8vIGltcG9ydCB7TWVhc3VyZUFsdGVyfSBmcm9tIFwiZG9tXCJcbi8vIGltcG9ydCB7Q2FsY3VsYXRvcn0gZnJvbSBcImNhbGN1bGF0b3JcIlxuLy9cbi8vIGNvbnN0IE1lYXN1cmVBbHRlciA9IE1lYXN1cmVBbHRlci5pbml0KClcbi8vIGNvbnN0IENhbGN1bGF0b3IgPSBDYWxjdWxhdG9yLmluaXQoKVxuXG4vLyBjb25zdCBTY2FsZUNvcmUgPSBTY2FsZUNvcmUuZXhwb3NlKClcbi8vIGNvbnN0IFNjYWxlRG9tSW8gPSBTY2FsZURvbUlvLmV4cG9zZSgpXG5cbmZ1bmN0aW9uIFNjYWxlQ2Fwc3VsZSgpIHtcbn1cblxuZnVuY3Rpb24gU2NhbGUoZWwsIG9wdGlvbnMpIHtcbiAgdGhpcy5lbCA9IGVsXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgLy8gdGhpcy5zY2FsZUZhY3RvciA9IG9wdGlvbnMuc2NhbGVGYWN0b3I7XG4gIC8vIHRoaXMudHJhbnNpdGlvbkNsYXNzID0gb3B0aW9ucy50cmFuc2l0aW9uQ2xhc3MgfHwgJ3NjYWxhYmxlLXRyYW5zaXRpb24nXG5cbiAgdGhpcy5jb3JlID0gbmV3IFNjYWxlQ29yZSgpXG4gIHRoaXMuZG9tSW8gPSBuZXcgU2NhbGVEb21JbygpXG5cbiAgLy8gc2V0IHRoZSBpbml0aWFsIHZhbHVlIG9mIHRyYW5zZm9ybSB0byBtYXRyaXgsIGluIHRoZSBlbGVtZW50XG4gIHRoaXMuZG9tSW8uaW5pdGlhbGl6ZUVsZW1lbnRzTWF0cml4KHRoaXMuZWwpXG5cbiAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5kb21Jby5nZXRUcmFuc2Zvcm1zKHRoaXMuZWwpXG4gIHRoaXMub3JpZ2luID0gdGhpcy5kb21Jby5nZXRPcmlnaW4odGhpcy5lbClcbiAgdGhpcy5yZWN0cyA9IHRoaXMuZG9tSW8uZ2V0UmVjdHModGhpcy5lbClcblxuICBjb25zb2xlLmxvZyhcInNjYWxlcjogXCIsIHRoaXMpXG59XG5cblNjYWxlLnByb3RvdHlwZS5zY2FsZVN0YXJ0ID0gZnVuY3Rpb24oZ2VzdHVyZSkge1xuICBjb25zb2xlLmxvZyhcInNjYWxlU3RhcnQsIGdlc3R1cmU6IFwiLCBnZXN0dXJlKVxuICBjb25zdCBjb29yZHMgPSB0aGlzLmNvcmUuaW5pdGlhbGl6ZU1vdmVtZW50KGdlc3R1cmUsIHRoaXMudHJhbnNmb3JtcywgdGhpcy5yZWN0cywgdGhpcy5vcmlnaW4pXG4gIGNvbnNvbGUubG9nKFwic2NhbGVTdGFydCwgaW5pdE1vdmVtZW50IHJldHVyblwiLCBjb29yZHMpXG5cbiAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZSA9IGNvb3Jkcy50cmFuc2xhdGVcbiAgdGhpcy5vcmlnaW4gPSBjb29yZHMub3JpZ2luXG5cbiAgdGhpcy5kb21Jby5zZXRNYXRyaXgodGhpcy5lbCwgdGhpcy50cmFuc2Zvcm1zKVxuICB0aGlzLmRvbUlvLnNldE9yaWdpbih0aGlzLmVsLCB0aGlzLm9yaWdpbilcblxuICAvLyB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmNvcmUuaGFuZGxlT3JpZ2luQ2hhbmdlKClcbiAgLy8gdGhpcy5hbmNob3IgPSB0aGlzLmNvcmUuc2V0QW5jaG9yKHRoaXMudHJhbnNmb3JtcywgdGhpcy5ldi5jZW50ZXIpXG59XG5cblNjYWxlLnByb3RvdHlwZS5zY2FsZU1vdmUgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG4gIGNvbnNvbGUubG9nKFwic2NhbGVNb3ZlLCBnZXN0dXJlOiBcIiwgZ2VzdHVyZSlcbiAgY29uc3QgY2FsY3VsYXRlZCA9IHRoaXMuY29yZS5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50KGdlc3R1cmUsIHRoaXMudHJhbnNmb3JtcylcblxuICB0aGlzLnRyYW5zZm9ybXMuc2NhbGUgPSBjYWxjdWxhdGVkLnNjYWxlXG4gIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGUgPSBjYWxjdWxhdGVkLnRyYW5zbGF0ZVxuXG4gIHRoaXMuZG9tSW8uc2V0TWF0cml4KHRoaXMuZWwsIHRoaXMudHJhbnNmb3Jtcylcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlU3RvcCA9IGZ1bmN0aW9uKGdlc3R1cmUpIHtcbiAgY29uc29sZS5sb2coXCJzY2FsZVN0b3AsIGdlc3R1cmU6IFwiLCBnZXN0dXJlKVxuICB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmNvcmUuZmluaXNoTW92ZW1lbnQoZ2VzdHVyZSwgdGhpcy50cmFuc2Zvcm1zKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuXG4gIC8vIHNlZSwgaWYgZWwgZXhjZWVkcyBwYXJlbnQncyBhcmVhIGluIGFuIHVnbHkgd2F5XG4gIGNvbnN0IHRyYW5zZm9ybXNCb3VuZGVkID0gdGhpcy5lbmNvdW50ZXJCb3VuZHModGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB2cHJ0RGltcylcblxuICBpZiAoXG4gICAgdHJhbnNmb3Jtc0JvdW5kZWQudHJhbnNsYXRlWCAhPSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWFxuICAgIHx8IHRyYW5zZm9ybXNCb3VuZGVkLnRyYW5zbGF0ZVkgIT0gdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVlcbiAgKSB7XG4gICAgdGhpcy50d2VlbkluKClcbiAgfVxufVxuXG5TY2FsZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtRGF0YSA9IGZ1bmN0aW9uKHRyYW5zZm9ybXMpIHtcbiAgdGhpcy50cmFuc2Zvcm1zID0gT2JqZWN0LmFzc2lnbih0aGlzLnRyYW5zZm9ybXMsIHRyYW5zZm9ybXMpXG59XG5cbi8qXG5cblNjYWxlLnByb3RvdHlwZS5yQWYgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhZklkID0gMFxuICByYWZDYiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcmFmSWRQcmV2ID0gcmFmSWRcbiAgICByYWZJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXG4gICAgICAvLyBwcmV2ZW50IG11bHRpcGxlIHNpbXVsdGFuZXVvcyByQWZzXG4gICAgICBpZiAocmFmSWQgPT0gcmFmSWRQcmV2KSByZXR1cm5cblxuICAgICAgLy8gZG8gb3VyIGFuaW1hdGlvblxuXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLnJhbmdlLmdldE5leHQoKVxuICAgICAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVggPSB2YWxcbiAgICAgIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVZID0gdmFsXG4gICAgICByYWZDYigpXG4gICAgfSlcbiAgfVxufVxuXG5TY2FsZS5wcm90b3R5cGUudHdlZW5JbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHZhbHVlID0gbmV3IFJhbmdlKFxuICAgICAgLy8gbGVuZ3RoIG9mIHRoZSByYW5nZVxuICAgICAgdHJhbnNmb3Jtc0JvdW5kLnRyYW5zbGF0ZVggLSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWCxcblxuICAgICAgLy8gcG9pbnRzIHRvIGdvIGZyb20gYW5kIHRvXG4gICAgICB7XG4gICAgICAgIGZyb206IHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVZLFxuICAgICAgICB0bzogdHJhbnNmb3Jtc0JvdW5kLnRyYW5zbGF0ZVlcbiAgICAgIH0sXG5cbiAgICAgIC8vIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYXG4gICAgKVxufVxuKi9cblxuXG5leHBvcnQge1NjYWxlfVxuXG4vKlxuY29uc3QgU2NhbGUgPSB7XG4gIGV4cG9zZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFNjYWxlQ2Fwc3VsZSgpXG4gIH1cbn1cblxuZXhwb3J0IHtTY2FsZX1cblxuKi9cbiIsImltcG9ydCB7U2NhbGV9IGZyb20gXCIuLi9kaXN0L3NjYWxlLmpzXCJcbmltcG9ydCB7cGluY2hFbXVsYXRvcn0gZnJvbSBcImVtdWxhdGUtcGluY2hcIlxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zb2xlLmxvZyhTY2FsZSlcblxuICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsYWJsZScpXG4gIGNvbnN0IHNjYWxlciA9IG5ldyBTY2FsZShlbClcblxuICAvLyBhbiBpbXByb3Zpc2F0aW9uYWwgdHJhbnNsYXRlIG1ldGhvZCwgdG8gY2hlY2sgdGhhdCB1cGRhdGVUcmFuc2Zvcm1EYXRhIHdvcmtzLlxuICBzY2FsZXIudHJhbnNsYXRlID0gZnVuY3Rpb24odHJhbnNsLCBzY2FsZUZhY3Rvcikge1xuICAgIC8vIHNjYWxlci5lbC5zdHlsZS50cmFuc2Zvcm0gPSBcIm1hdHJpeChcIisgc2NhbGVGYWN0b3IgK1wiLCAwLCAwLCBcIisgc2NhbGVGYWN0b3IgK1wiLCBcIisgdHJhbnNsICtcIiwgXCIrIHRyYW5zbCArXCIpXCJcbiAgICAvLyB0cmFuc2xhdGUoc2NhbGFibGUuZWwsIHRyYW5zbCwgc2NhbGVGYWN0b3IpXG5cbiAgICBzY2FsZXIuZG9tSW8uc2V0TWF0cml4KGVsLCB7XG4gICAgICB0cmFuc2xhdGU6IHtcbiAgICAgICAgeDogdHJhbnNsLFxuICAgICAgICB5OiB0cmFuc2xcbiAgICAgIH0sXG4gICAgICBzY2FsZToge1xuICAgICAgICB4OiBzY2FsZUZhY3RvcixcbiAgICAgICAgeTogc2NhbGVGYWN0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IHNjYWxlci5kb21Jby5nZXRUcmFuc2Zvcm1zKClcblxuICAgIHNjYWxhYmxlLnVwZGF0ZVRyYW5zZm9ybURhdGEodHJhbnNmb3JtcylcbiAgfVxuXG4gIC8vXG4gIHBpbmNoRW11bGF0b3Iub25zdGFydCA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJvbnN0YXJ0XCIsIGV2KVxuICAgIHNjYWxlci5zY2FsZVN0YXJ0KGV2KVxuICB9XG5cbiAgcGluY2hFbXVsYXRvci5vbm1vdmUgPSBmdW5jdGlvbihldikge1xuICAgIC8vIGNvbnNvbGUubG9nKFwib25tb3ZlXCIsIGV2KVxuICAgIHNjYWxlci5zY2FsZU1vdmUoZXYpXG4gIH1cblxuICBwaW5jaEVtdWxhdG9yLm9uZW5kID0gZnVuY3Rpb24oZXYpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9uZW5kXCIsIGV2KVxuICAgIHNjYWxlci5zY2FsZVN0b3AoZXYpXG4gIH1cblxuICBwaW5jaEVtdWxhdG9yLnN1YnNjcmliZSgpXG5cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4pXG4iXSwic291cmNlUm9vdCI6IiJ9