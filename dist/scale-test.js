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
      center: this.initial.center.x + dx / 2
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

  return {
    translate: transforms.translate,
    origin: origin
  }
}

// calculate a discrete point in the move
ScaleCore.prototype.calculateDiscretePoint = function(gesture, transforms) {

  const scale = {}
  const translate = {}

  scale.x = this.anchor.scale.x * gesture.scale;
  scale.y = this.anchor.scale.y * gesture.scale;

  // transforms.scaleX = this.anchor.scaleX * gesture.scale;
  // transforms.scaleY = this.anchor.scaleY * gesture.scale;

  translate.x = this.anchor.translate.x + (gesture.center.x - this.anchor.center.x);
  translate.y = this.anchor.translate.y + (gesture.center.y - this.anchor.center.y);

  return {
    scale: scale,
    traslate: translate
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

  const translate = {
    x: ((origin.x - 150) * transforms.scaleX - (origin.x - 150)), //  + transforms.offset.x
    y: ((origin.y - 150) * transforms.scaleY - (origin.y - 150)) //  + transforms.offset.y
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
}

Scale.prototype.scaleStart = function(gesture) {

  const coords = this.core.initializeMovement(gesture, this.transforms, this.rects, this.origin)
  this.transforms.translate = coords.translate
  this.origin = coords.origin

  this.domIo.setMatrix(this.el, this.transforms)
  this.domIo.setOrigin(this.el, this.origin)

  // this.transforms = this.core.handleOriginChange()
  // this.anchor = this.core.setAnchor(this.transforms, this.ev.center)
}

Scale.prototype.scaleMove = function(gesture) {
  const calculated = this.core.calculateDiscretePoint(gesture, this.transforms)

  this.transforms.scale = calculated.scale
  this.transforms.translate = calculated.translate

  this.domIo.setMatrix(this.el, this.transforms)
}

Scale.prototype.scaleStop = function(gesture) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2VtdWxhdGUtcGluY2gvZGlzdC9lbXVsYXRlLXBpbmNoLmpzIiwid2VicGFjazovLy8uL2Rpc3Qvc2NhbGUuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RVI7QUFBQSxXQUFXLG9DQUFvQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUEseUJBQXlCLDBCQUEwQjtBQUNuRDs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7O0FBRVI7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWDs7QUFFQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR1E7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVE7O0FBRVI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3WmM7QUFDUTs7QUFFdEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEiLCJmaWxlIjoic2NhbGUtdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vdGVzdC90ZXN0LmpzXCIpO1xuIiwiY29uc3QgcGluY2hFbXVsYXRvciA9IHtcbiAgc3Vic2NyaWJlOiBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuXG4gICAgZnVuY3Rpb24gb25tb3VzZW1vdmUoZXYpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW91c2Vtb3ZlXCIsIHNlbGYpXG5cbiAgICAgIGlmICh0eXBlb2Yoc2VsZi5vbm1vdmUpID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHNlbGYub25tb3ZlKHNlbGYubW92ZVBpbmNoKGV2KSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubW92ZVBpbmNoKGV2KSlcbiAgICB9XG5cbiAgICBjb25zdCBib2R5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKVxuXG4gICAgYm9keUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2KSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm1vdXNlZG93blwiKVxuICAgICAgaWYgKHR5cGVvZih0aGlzLm9uc3RhcnQpID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRoaXMub25zdGFydCh0aGlzLmluaXRQaW5jaChldikpXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKHBpbmNoRW11bGF0b3IuaW5pdFBpbmNoKGV2KSlcbiAgICAgIGJvZHlFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9ubW91c2Vtb3ZlKVxuICAgIH0pXG5cbiAgICBib2R5RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKGV2KSA9PiB7XG4gICAgICBpZiAodHlwZW9mKHRoaXMub25lbmQpID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHRoaXMub25lbmQodGhpcy5lbmRQaW5jaChldikpXG5cbiAgICAgIGJvZHlFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9ubW91c2Vtb3ZlKVxuICAgIH0pXG4gIH0sXG4gIHBvaW50c09mZnNldDogNzUsXG4gIGluaXRQaW5jaDogZnVuY3Rpb24oZXYpIHtcbiAgICB0aGlzLmluaXRpYWwgPSB7XG4gICAgICBjZW50ZXI6IHtcbiAgICAgICAgeDogZXYucGFnZVgsXG4gICAgICAgIHk6IGV2LnBhZ2VZXG4gICAgICB9LFxuXG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsLnBvaW50TGVmdCA9IHRoaXMuaW5pdGlhbC5jZW50ZXIueCAtIHRoaXMucG9pbnRzT2Zmc2V0XG4gICAgdGhpcy5pbml0aWFsLnBvaW50UmlnaHQgPSB0aGlzLmluaXRpYWwuY2VudGVyLnggKyB0aGlzLnBvaW50c09mZnNldFxuXG4gICAgdGhpcy5pbml0aWFsLmRpc3RhbmNlID0gdGhpcy5pbml0aWFsLnBvaW50UmlnaHQgLSB0aGlzLmluaXRpYWwucG9pbnRMZWZ0XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcImluaXRQaW5jaFwiLCB0aGlzLmluaXRpYWwpXG4gICAgdGhpcy5wb2ludExlZnQgPSB0aGlzLmluaXRpYWwucG9pbnRMZWZ0XG4gICAgdGhpcy5wb2ludFJpZ2h0ID0gdGhpcy5pbml0aWFsLnBvaW50UmlnaHRcblxuICAgIHRoaXMuc2NhbGUgPSAxXG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGU6IHRoaXMuc2NhbGUsXG4gICAgICBjZW50ZXI6IHRoaXMuaW5pdGlhbC5jZW50ZXJcbiAgICB9XG4gIH0sXG4gIG1vdmVQaW5jaDogZnVuY3Rpb24oZXYpIHtcbiAgICBjb25zdCBkeCA9IGV2LnBhZ2VYIC0gdGhpcy5pbml0aWFsLmNlbnRlci54IC8vIE1hdGguYWJzKClcbiAgICAvLyBjb25zb2xlLmxvZyhcImluaXRDZW50ZXIsIGV2LnBhZ2VYLCBkeFwiLCB0aGlzLmluaXRpYWwuY2VudGVyLngsIGV2LnBhZ2VYLCBkeClcblxuICAgIHRoaXMucG9pbnRMZWZ0ID0gdGhpcy5pbml0aWFsLnBvaW50TGVmdCAtIE1hdGguYWJzKGR4KVxuICAgIHRoaXMucG9pbnRSaWdodCA9IHRoaXMuaW5pdGlhbC5wb2ludFJpZ2h0ICsgTWF0aC5hYnMoZHgpXG5cbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMucG9pbnRSaWdodCAtIHRoaXMucG9pbnRMZWZ0XG4gICAgLy8gY29uc29sZS5sb2coXCJkaXN0YW5jZSwgcEwsIHBSXCIsIGRpc3RhbmNlLCB0aGlzLnBvaW50TGVmdCwgdGhpcy5wb2ludFJpZ2h0KVxuXG4gICAgdGhpcy5zY2FsZSA9IGRpc3RhbmNlIC8gdGhpcy5pbml0aWFsLmRpc3RhbmNlXG5cbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGU6IHRoaXMuc2NhbGUsXG4gICAgICBjZW50ZXI6IHRoaXMuaW5pdGlhbC5jZW50ZXIueCArIGR4IC8gMlxuICAgIH1cbiAgfSxcbiAgZW5kUGluY2g6IGZ1bmN0aW9uKGV2KSB7XG4gICAgcmV0dXJuIHRoaXMubW92ZVBpbmNoKGV2KVxuICB9XG59XG5cbmV4cG9ydCB7cGluY2hFbXVsYXRvcn1cbiIsIi8vIGltcG9ydCB7Z2V0Vmlld3BvcnRXaWR0aCwgZ2V0Vmlld3BvcnRIZWlnaHR9IGZyb20gXCJwbHRmcm0tbGliXCJcblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjk0Mjc4NS93aW5kb3ctaW5uZXJ3aWR0aC12cy1kb2N1bWVudC1kb2N1bWVudGVsZW1lbnQtY2xpZW50d2lkdGhcbi8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE1NjM4OCNjMTRcbmZ1bmN0aW9uIGdldFZpZXdwb3J0SGVpZ2h0KCkge1xuICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgP1xuICAgIE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgOlxuICAgIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgICB8fCAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xpZW50SGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRXaWR0aCgpIHtcbiAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA/XG4gICAgTWF0aC5taW4od2luZG93LmlubmVyV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkgOlxuICAgIHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgfHwgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsaWVudFdpZHRoKTtcbn1cblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9ICdmdW5jdGlvbicpIHtcbiAgLy8gTXVzdCBiZSB3cml0YWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCBcImFzc2lnblwiLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHZhckFyZ3MpIHsgLy8gLmxlbmd0aCBvZiBmdW5jdGlvbiBpcyAyXG4gICAgICAndXNlIHN0cmljdCc7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHsgLy8gVHlwZUVycm9yIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcblxuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChuZXh0U291cmNlICE9IG51bGwpIHsgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgICAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0U291cmNlKSB7XG4gICAgICAgICAgICAvLyBBdm9pZCBidWdzIHdoZW4gaGFzT3duUHJvcGVydHkgaXMgc2hhZG93ZWRcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobmV4dFNvdXJjZSwgbmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBTY2FsZUNvcmUoKSB7XG4gIHRoaXMuYW5jaG9yID0ge1xuICAgIHNjYWxlOiB7XG4gICAgICB4OiAxLCB5OiAxXG4gICAgfVxuICB9XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vdmVtZW50ID0gZnVuY3Rpb24oZ2VzdHVyZSwgdHJhbnNmb3JtcywgcmVjdHMpIHtcblxuICAvKlxuICBpbml0aWFsaXplIHRoZSBvY2N1cmluZyBnZXN0dXJlOlxuICAqL1xuXG4gIC8vIGNhcHR1cmUgdGhlIGluaXRpYWwgY29vcmRpbmF0ZXMgb2YgZXYgYW5kIGVsXG4gIHRoaXMuYW5jaG9yLmNlbnRlciA9IGdlc3R1cmUuY2VudGVyXG4gIHRoaXMuYW5jaG9yLnRyYW5zbGF0ZSA9IHRyYW5zZm9ybXMudHJhbnNsYXRlXG5cbiAgLy8gbWFwIGV2J3MgcG9zaXRpb24gdG8gdGhlIGFwcHJvcHJpYXRlIChwcm9wZXIpIHRyYW5zZm9ybS1vcmlnaW4gdmFsdWUgKHdoaWNoIGlzIGFsd2F5cyBpbiBzY2FsZSBvZiAxKVxuICAvLyAobWFwIGV2J3MgcG9zaXRpb24gb250byB0aGUgZWwncyBtYXRyaXgpXG4gIGNvbnN0IG9yaWdpbiA9IHRoaXMubWFwVG9PcmlnaW4oZ2VzdHVyZS5jZW50ZXIsIHRyYW5zZm9ybXMsIHJlY3RzKVxuXG4gIC8vIGFubmlnaWxhdGUgc2hpZnRpbmcgb2YgdGhlIGVsZW1lbnQgb24gb3JpZ2luIGNoYW5nZVxuICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmFubmlnaWxhdGVTaGlmdChvcmlnaW4sIHRyYW5zZm9ybXMpXG5cbiAgcmV0dXJuIHtcbiAgICB0cmFuc2xhdGU6IHRyYW5zZm9ybXMudHJhbnNsYXRlLFxuICAgIG9yaWdpbjogb3JpZ2luXG4gIH1cbn1cblxuLy8gY2FsY3VsYXRlIGEgZGlzY3JldGUgcG9pbnQgaW4gdGhlIG1vdmVcblNjYWxlQ29yZS5wcm90b3R5cGUuY2FsY3VsYXRlRGlzY3JldGVQb2ludCA9IGZ1bmN0aW9uKGdlc3R1cmUsIHRyYW5zZm9ybXMpIHtcblxuICBjb25zdCBzY2FsZSA9IHt9XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHt9XG5cbiAgc2NhbGUueCA9IHRoaXMuYW5jaG9yLnNjYWxlLnggKiBnZXN0dXJlLnNjYWxlO1xuICBzY2FsZS55ID0gdGhpcy5hbmNob3Iuc2NhbGUueSAqIGdlc3R1cmUuc2NhbGU7XG5cbiAgLy8gdHJhbnNmb3Jtcy5zY2FsZVggPSB0aGlzLmFuY2hvci5zY2FsZVggKiBnZXN0dXJlLnNjYWxlO1xuICAvLyB0cmFuc2Zvcm1zLnNjYWxlWSA9IHRoaXMuYW5jaG9yLnNjYWxlWSAqIGdlc3R1cmUuc2NhbGU7XG5cbiAgdHJhbnNsYXRlLnggPSB0aGlzLmFuY2hvci50cmFuc2xhdGUueCArIChnZXN0dXJlLmNlbnRlci54IC0gdGhpcy5hbmNob3IuY2VudGVyLngpO1xuICB0cmFuc2xhdGUueSA9IHRoaXMuYW5jaG9yLnRyYW5zbGF0ZS55ICsgKGdlc3R1cmUuY2VudGVyLnkgLSB0aGlzLmFuY2hvci5jZW50ZXIueSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzY2FsZTogc2NhbGUsXG4gICAgdHJhc2xhdGU6IHRyYW5zbGF0ZVxuICB9XG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuZmluaXNoTW92ZW1lbnQgPSBmdW5jdGlvbihnZXN0dXJlLCB0cmFuc2Zvcm1zKSB7XG5cbiAgY29uc3QgdHJhbnNmb3Jtc05ldyA9IHRoaXMuY2FsY3VsYXRlRGlzY3JldGVQb2ludChnZXN0dXJlLCB0cmFuc2Zvcm1zKVxuXG4gIC8vIGFuY2hvciB0aGUgc2NhbGUgdmFsdWUsIHRvIHVzZSBhcyBwb2ludCBvZiBkZXBhcnR1cmUgaW4gbmV4dCBtb3ZlbWVudFxuICB0aGlzLmFuY2hvci5zY2FsZSA9IHRyYW5zZm9ybXNOZXcuc2NhbGVcblxuICByZXR1cm4gdHJhbnNmb3Jtc05ld1xufVxuXG5TY2FsZUNvcmUucHJvdG90eXBlLm1hcFRvT3JpZ2luID0gZnVuY3Rpb24oZ2VzdHVyZUNlbnRlciwgdHJhbnNmb3JtcywgcmVjdHMpIHtcbiAgLy8gZGV0ZXJtaW5lIHBvaW50J3MgcG9zaXRpb24sIHJlbGF0aXZlIHRvIHRoZSBzY2FsYWJsZSBlbGVtZW50XG4gIGNvbnN0IHBvaW50UG9zV2l0aGluRWwgPSB7XG4gICAgbGVmdDogZ2VzdHVyZUNlbnRlci54IC0gcmVjdHMubGVmdCxcbiAgICB0b3A6IGdlc3R1cmVDZW50ZXIueSAtIHJlY3RzLnRvcFxuICB9XG5cbiAgLy8gbWFwIHBvaW50J3MgcG9zaXRpb24gdG8gdGhlIGFwcHJvcHJpYXRlIChwcm9wZXIpIHRyYW5zZm9ybS1vcmlnaW4gdmFsdWUgKHdoaWNoIGlzIGFsd2F5cyBpbiBzY2FsZSBvZiAxKVxuICBjb25zdCBvcmlnaW4gPSB7XG4gICAgeDogcG9pbnRQb3NXaXRoaW5FbC5sZWZ0IC8gdHJhbnNmb3Jtcy5zY2FsZS54LFxuICAgIHk6IHBvaW50UG9zV2l0aGluRWwudG9wIC8gdHJhbnNmb3Jtcy5zY2FsZS55XG4gIH1cblxuICByZXR1cm4gb3JpZ2luXG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuYW5uaWdpbGF0ZVNoaWZ0ID0gZnVuY3Rpb24ob3JpZ2luLCB0cmFuc2Zvcm1zKSB7XG5cbiAgY29uc3QgdHJhbnNsYXRlID0ge1xuICAgIHg6ICgob3JpZ2luLnggLSAxNTApICogdHJhbnNmb3Jtcy5zY2FsZVggLSAob3JpZ2luLnggLSAxNTApKSwgLy8gICsgdHJhbnNmb3Jtcy5vZmZzZXQueFxuICAgIHk6ICgob3JpZ2luLnkgLSAxNTApICogdHJhbnNmb3Jtcy5zY2FsZVkgLSAob3JpZ2luLnkgLSAxNTApKSAvLyAgKyB0cmFuc2Zvcm1zLm9mZnNldC55XG4gIH1cblxuICByZXR1cm4gdHJhbnNsYXRlXG59XG5cblNjYWxlQ29yZS5wcm90b3R5cGUuZW5jb3VudGVyQm91bmRzID0gZnVuY3Rpb24odHJhbnNmb3JtcywgcmVjdHMsIHBhcmVudCkge1xuXG4gIHZhciBhcnJheSA9IFtcbiAgICB7XG4gICAgICBsZW5ndGg6IHJlY3RzLndpZHRoLFxuICAgICAgcG9zOiByZWN0cy5sZWZ0LFxuICAgICAgdHJhbnNsYXRpb246IHRyYW5zZm9ybXMudHJhbnNsYXRlWCxcbiAgICAgIHBhcmVudDogcGFyZW50LndpZHRoIC8vIHBhcnNlSW50KGdldFZpZXdwb3J0V2lkdGgoKSlcbiAgICB9LFxuICAgIHtcbiAgICAgIGxlbmd0aDogcmVjdHMuaGVpZ2h0LFxuICAgICAgcG9zOiByZWN0cy50b3AsXG4gICAgICB0cmFuc2xhdGlvbjogdHJhbnNmb3Jtcy50cmFuc2xhdGVZLFxuICAgICAgcGFyZW50OiBwYXJlbnQuaGVpZ2h0IC8vIHBhcnNlSW50KGdldFZpZXdwb3J0SGVpZ2h0KCkpXG4gICAgfVxuICBdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0ZW1wID0gcHJvY2VzcyhhcnJheVtpXSk7XG4gICAgLy8gY29uc29sZS5sb2coXCJ0d2Vha0l0XCIsIHRlbXApXG4gICAgYXJyYXlbaV0ubmV3UG9zID0gKHR5cGVvZih0ZW1wKSA9PT0gJ251bWJlcicpID8gdGVtcCA6IGFycmF5W2ldLnRyYW5zbGF0aW9uO1xuICB9XG5cbiAgY29uc3QgdHJhbnNmb3Jtc05ldyA9IHt9XG5cbiAgLy8gT2JqZWN0LmFzc2lnbiBpcyBlczYsIGJ1dCB0aGVyZSdzIGEgcG9seWZpbGwsIGluIGNhc2Ugb2YgYW55dGhpbmc6XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAgT2JqZWN0LmFzc2lnbih0cmFuc2Zvcm1zTmV3LCB0cmFuc2Zvcm1zKVxuXG4gIHRyYW5zZm9ybXNOZXcudHJhbnNsYXRlWCA9IGFycmF5WzBdLm5ld1BvcztcbiAgdHJhbnNmb3Jtc05ldy50cmFuc2xhdGVZID0gYXJyYXlbMV0ubmV3UG9zO1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3MoYXhpcykge1xuXG4gICAgaWYgKGF4aXMubGVuZ3RoIDw9IGF4aXMucGFyZW50KSB7XG4gICAgICBpZiAoYXhpcy5wb3MgPiAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiAtIChheGlzLnBvcyAtIChheGlzLnBhcmVudCAtIGF4aXMubGVuZ3RoKSkgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXhpcy5wb3MgPCAoMCkpIHtcbiAgICAgICAgcmV0dXJuICggYXhpcy50cmFuc2xhdGlvbiArIE1hdGguYWJzKGF4aXMucG9zKSArIDIgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGF4aXMubGVuZ3RoID4gYXhpcy5wYXJlbnQpIHtcbiAgICAgIGlmIChheGlzLnBvcyA+ICgwKSkge1xuICAgICAgICByZXR1cm4gKCBheGlzLnRyYW5zbGF0aW9uIC0gYXhpcy5wb3MgKTtcbiAgICAgIH0gZWxzZSBpZiAoYXhpcy5wb3MgPCAoYXhpcy5wYXJlbnQgLSBheGlzLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuICggKGF4aXMudHJhbnNsYXRpb24gKyAoIE1hdGguYWJzKGF4aXMucG9zKSAtIE1hdGguYWJzKGF4aXMucGFyZW50IC0gYXhpcy5sZW5ndGgpICkpICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cmFuc2Zvcm1zTmV3O1xuICAvL3RoaXMuZWxlbWVudC5jc3MoICd0cmFuc2Zvcm0nLCAnbWF0cml4KCcgKyBjb29yZHMuc2NhbGVYICsgJywgMCwgMCwgJyArIGNvb3Jkcy5zY2FsZVkgKyAgJywgJyArIHgubmV3UG9zICsgJywgJyArIHkubmV3UG9zICsgJyknICk7XG5cbn1cblxuZXhwb3J0IHtTY2FsZUNvcmV9XG5cbi8qXG5jb25zdCBTY2FsZUNvcmUgPSB7XG4gIGV4cG9zZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFNjYWxlQ29yZUNhcHN1bGUoKVxuICB9XG59XG5cbi8vIGV4cG9ydCB7U2NhbGVDb3JlQ2Fwc3VsZX1cbiovXG5cbmZ1bmN0aW9uIFNjYWxlRG9tSW8oKSB7fVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbihlbCkge1xuICBjb25zdCBvcmlnaW5EYXRhID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyd0cmFuc2Zvcm0tb3JpZ2luJ10uc3BsaXQoJyAnKVxuXG4gIGNvbnN0IG9yaWdpbiA9IHtcbiAgICB4OiBwYXJzZUludChvcmlnaW5EYXRhWzBdKSxcbiAgICB5OiBwYXJzZUludChvcmlnaW5EYXRhWzFdKVxuICB9XG5cbiAgcmV0dXJuIG9yaWdpblxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm1zID0gZnVuY3Rpb24oZWwpIHtcbiAgY29uc3QgdHJhbnNmb3JtcyA9IHt9XG4gIGNvbnN0IHRyYW5zZm9ybXNEYXRhID0gZWwuc3R5bGUudHJhbnNmb3JtLnNwbGl0KCcoJylbMV0uc3BsaXQoJyknKVswXS5zcGxpdCgnLCcpO1xuXG4gIHRyYW5zZm9ybXMuc2NhbGUgPSB7XG4gICAgeDogcGFyc2VGbG9hdCh0cmFuc2Zvcm1zRGF0YVswXSksXG4gICAgeTogcGFyc2VGbG9hdCh0cmFuc2Zvcm1zRGF0YVszXSlcbiAgfVxuXG4gIHRyYW5zZm9ybXMudHJhbnNsYXRlID0ge1xuICAgIHg6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbNF0pLFxuICAgIHk6IHBhcnNlRmxvYXQodHJhbnNmb3Jtc0RhdGFbNV0pXG4gIH1cblxuICByZXR1cm4gdHJhbnNmb3Jtc1xufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRSZWN0cyA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5nZXRWaWV3cG9ydERpbXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogZ2V0Vmlld3BvcnRXaWR0aCgpLFxuICAgIGhlaWdodDogZ2V0Vmlld3BvcnRIZWlnaHQoKVxuICB9XG59XG5cblNjYWxlRG9tSW8ucHJvdG90eXBlLnNldE1hdHJpeCA9IGZ1bmN0aW9uKGVsLCB0cmFuc2Zvcm1zKSB7XG4gIGNvbnNvbGUubG9nKCdzZXRNYXRyaXgnLCB0cmFuc2Zvcm1zKVxuICBjb25zdCBtYXRyaXhTdHIgPSAnbWF0cml4KCcgK1xuICAgIHRyYW5zZm9ybXMuc2NhbGVYICsgJywgMCwgMCwgJyArXG4gICAgdHJhbnNmb3Jtcy5zY2FsZVkgKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVggKyAnLCAnICtcbiAgICB0cmFuc2Zvcm1zLnRyYW5zbGF0ZVkgK1xuICAgICcpJ1xuXG4gIHRoaXMuZG9TZXRNYXRyaXgoZWwsIG1hdHJpeFN0cilcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuZG9TZXRNYXRyaXggPSBmdW5jdGlvbihlbCwgbWF0cml4U3RyKSB7XG4gIGNvbnNvbGUubG9nKCdzZXRNYXRyaXgnLCBtYXRyaXhTdHIpXG4gIGVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS5tb3pUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUubXNUcmFuc2Zvcm0gPSBtYXRyaXhTdHJcbiAgZWwuc3R5bGUub1RyYW5zZm9ybSA9IG1hdHJpeFN0clxuICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBtYXRyaXhTdHJcbn1cblxuU2NhbGVEb21Jby5wcm90b3R5cGUuc2V0T3JpZ2luID0gZnVuY3Rpb24oZWwsIG9yaWdpbikge1xuICBlbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBvcmlnaW4ueCsgXCJweCBcIisgb3JpZ2luLnkrIFwicHhcIlxufVxuXG5TY2FsZURvbUlvLnByb3RvdHlwZS5pbml0aWFsaXplRWxlbWVudHNNYXRyaXggPSBmdW5jdGlvbihlbCkge1xuICAvLyBzZXQgdGhlIGluaXRpYWwgdmFsdWUgb2YgdHJhbnNmb3JtIHRvIG1hdHJpeDtcbiAgY29uc3QgbWF0cml4U3RyID0gJ21hdHJpeCgxLCAwLCAwLCAxLCAwLCAwKSdcbiAgdGhpcy5kb1NldE1hdHJpeChlbCwgbWF0cml4U3RyKVxufVxuXG5leHBvcnQge1NjYWxlRG9tSW99XG5cbi8qXG5jb25zdCBTY2FsZURvbUlvID0ge1xuICBleHBvc2U6IGZ1bmN0aW9uKCkgeyAvLyB1bnZlaWxcbiAgICByZXR1cm4gU2NhbGVEb21Jb0NhcHN1bGUoKVxuICB9XG59XG5cbi8vIGV4cG9ydCB7U2NhbGVEb21Jb0NhcHN1bGV9XG5cbiovXG5cbi8vIGltcG9ydCB7TWVhc3VyZUFsdGVyfSBmcm9tIFwiZG9tXCJcbi8vIGltcG9ydCB7Q2FsY3VsYXRvcn0gZnJvbSBcImNhbGN1bGF0b3JcIlxuLy9cbi8vIGNvbnN0IE1lYXN1cmVBbHRlciA9IE1lYXN1cmVBbHRlci5pbml0KClcbi8vIGNvbnN0IENhbGN1bGF0b3IgPSBDYWxjdWxhdG9yLmluaXQoKVxuXG4vLyBjb25zdCBTY2FsZUNvcmUgPSBTY2FsZUNvcmUuZXhwb3NlKClcbi8vIGNvbnN0IFNjYWxlRG9tSW8gPSBTY2FsZURvbUlvLmV4cG9zZSgpXG5cbmZ1bmN0aW9uIFNjYWxlQ2Fwc3VsZSgpIHtcbn1cblxuZnVuY3Rpb24gU2NhbGUoZWwsIG9wdGlvbnMpIHtcbiAgdGhpcy5lbCA9IGVsXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgLy8gdGhpcy5zY2FsZUZhY3RvciA9IG9wdGlvbnMuc2NhbGVGYWN0b3I7XG4gIC8vIHRoaXMudHJhbnNpdGlvbkNsYXNzID0gb3B0aW9ucy50cmFuc2l0aW9uQ2xhc3MgfHwgJ3NjYWxhYmxlLXRyYW5zaXRpb24nXG5cbiAgdGhpcy5jb3JlID0gbmV3IFNjYWxlQ29yZSgpXG4gIHRoaXMuZG9tSW8gPSBuZXcgU2NhbGVEb21JbygpXG5cbiAgLy8gc2V0IHRoZSBpbml0aWFsIHZhbHVlIG9mIHRyYW5zZm9ybSB0byBtYXRyaXgsIGluIHRoZSBlbGVtZW50XG4gIHRoaXMuZG9tSW8uaW5pdGlhbGl6ZUVsZW1lbnRzTWF0cml4KHRoaXMuZWwpXG5cbiAgdGhpcy50cmFuc2Zvcm1zID0gdGhpcy5kb21Jby5nZXRUcmFuc2Zvcm1zKHRoaXMuZWwpXG4gIHRoaXMub3JpZ2luID0gdGhpcy5kb21Jby5nZXRPcmlnaW4odGhpcy5lbClcbiAgdGhpcy5yZWN0cyA9IHRoaXMuZG9tSW8uZ2V0UmVjdHModGhpcy5lbClcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlU3RhcnQgPSBmdW5jdGlvbihnZXN0dXJlKSB7XG5cbiAgY29uc3QgY29vcmRzID0gdGhpcy5jb3JlLmluaXRpYWxpemVNb3ZlbWVudChnZXN0dXJlLCB0aGlzLnRyYW5zZm9ybXMsIHRoaXMucmVjdHMsIHRoaXMub3JpZ2luKVxuICB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlID0gY29vcmRzLnRyYW5zbGF0ZVxuICB0aGlzLm9yaWdpbiA9IGNvb3Jkcy5vcmlnaW5cblxuICB0aGlzLmRvbUlvLnNldE1hdHJpeCh0aGlzLmVsLCB0aGlzLnRyYW5zZm9ybXMpXG4gIHRoaXMuZG9tSW8uc2V0T3JpZ2luKHRoaXMuZWwsIHRoaXMub3JpZ2luKVxuXG4gIC8vIHRoaXMudHJhbnNmb3JtcyA9IHRoaXMuY29yZS5oYW5kbGVPcmlnaW5DaGFuZ2UoKVxuICAvLyB0aGlzLmFuY2hvciA9IHRoaXMuY29yZS5zZXRBbmNob3IodGhpcy50cmFuc2Zvcm1zLCB0aGlzLmV2LmNlbnRlcilcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlTW92ZSA9IGZ1bmN0aW9uKGdlc3R1cmUpIHtcbiAgY29uc3QgY2FsY3VsYXRlZCA9IHRoaXMuY29yZS5jYWxjdWxhdGVEaXNjcmV0ZVBvaW50KGdlc3R1cmUsIHRoaXMudHJhbnNmb3JtcylcblxuICB0aGlzLnRyYW5zZm9ybXMuc2NhbGUgPSBjYWxjdWxhdGVkLnNjYWxlXG4gIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGUgPSBjYWxjdWxhdGVkLnRyYW5zbGF0ZVxuXG4gIHRoaXMuZG9tSW8uc2V0TWF0cml4KHRoaXMuZWwsIHRoaXMudHJhbnNmb3Jtcylcbn1cblxuU2NhbGUucHJvdG90eXBlLnNjYWxlU3RvcCA9IGZ1bmN0aW9uKGdlc3R1cmUpIHtcblxuICB0aGlzLnRyYW5zZm9ybXMgPSB0aGlzLmNvcmUuZmluaXNoTW92ZW1lbnQoZ2VzdHVyZSwgdGhpcy50cmFuc2Zvcm1zKVxuICB0aGlzLnJlY3RzID0gdGhpcy5kb21Jby5nZXRSZWN0cyh0aGlzLmVsKVxuXG4gIC8vIHNlZSwgaWYgZWwgZXhjZWVkcyBwYXJlbnQncyBhcmVhIGluIGFuIHVnbHkgd2F5XG4gIGNvbnN0IHRyYW5zZm9ybXNCb3VuZGVkID0gdGhpcy5lbmNvdW50ZXJCb3VuZHModGhpcy50cmFuc2Zvcm1zLCB0aGlzLnJlY3RzLCB2cHJ0RGltcylcblxuICBpZiAoXG4gICAgdHJhbnNmb3Jtc0JvdW5kZWQudHJhbnNsYXRlWCAhPSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWFxuICAgIHx8IHRyYW5zZm9ybXNCb3VuZGVkLnRyYW5zbGF0ZVkgIT0gdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVlcbiAgKSB7XG4gICAgdGhpcy50d2VlbkluKClcbiAgfVxufVxuXG5TY2FsZS5wcm90b3R5cGUudXBkYXRlVHJhbnNmb3JtRGF0YSA9IGZ1bmN0aW9uKHRyYW5zZm9ybXMpIHtcbiAgdGhpcy50cmFuc2Zvcm1zID0gT2JqZWN0LmFzc2lnbih0aGlzLnRyYW5zZm9ybXMsIHRyYW5zZm9ybXMpXG59XG5cbi8qXG5cblNjYWxlLnByb3RvdHlwZS5yQWYgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhZklkID0gMFxuICByYWZDYiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcmFmSWRQcmV2ID0gcmFmSWRcbiAgICByYWZJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXG4gICAgICAvLyBwcmV2ZW50IG11bHRpcGxlIHNpbXVsdGFuZXVvcyByQWZzXG4gICAgICBpZiAocmFmSWQgPT0gcmFmSWRQcmV2KSByZXR1cm5cblxuICAgICAgLy8gZG8gb3VyIGFuaW1hdGlvblxuXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLnJhbmdlLmdldE5leHQoKVxuICAgICAgdGhpcy50cmFuc2Zvcm1zLnRyYW5zbGF0ZVggPSB2YWxcbiAgICAgIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVZID0gdmFsXG4gICAgICByYWZDYigpXG4gICAgfSlcbiAgfVxufVxuXG5TY2FsZS5wcm90b3R5cGUudHdlZW5JbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHZhbHVlID0gbmV3IFJhbmdlKFxuICAgICAgLy8gbGVuZ3RoIG9mIHRoZSByYW5nZVxuICAgICAgdHJhbnNmb3Jtc0JvdW5kLnRyYW5zbGF0ZVggLSB0aGlzLnRyYW5zZm9ybXMudHJhbnNsYXRlWCxcblxuICAgICAgLy8gcG9pbnRzIHRvIGdvIGZyb20gYW5kIHRvXG4gICAgICB7XG4gICAgICAgIGZyb206IHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVZLFxuICAgICAgICB0bzogdHJhbnNmb3Jtc0JvdW5kLnRyYW5zbGF0ZVlcbiAgICAgIH0sXG5cbiAgICAgIC8vIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgIHRoaXMudHJhbnNmb3Jtcy50cmFuc2xhdGVYXG4gICAgKVxufVxuKi9cblxuXG5leHBvcnQge1NjYWxlfVxuXG4vKlxuY29uc3QgU2NhbGUgPSB7XG4gIGV4cG9zZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFNjYWxlQ2Fwc3VsZSgpXG4gIH1cbn1cblxuZXhwb3J0IHtTY2FsZX1cblxuKi9cbiIsImltcG9ydCB7U2NhbGV9IGZyb20gXCIuLi9kaXN0L3NjYWxlLmpzXCJcbmltcG9ydCB7cGluY2hFbXVsYXRvcn0gZnJvbSBcImVtdWxhdGUtcGluY2hcIlxuXG5mdW5jdGlvbiBtYWluKCkge1xuICBjb25zb2xlLmxvZyhTY2FsZSlcblxuICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsYWJsZScpXG4gIGNvbnN0IHNjYWxlciA9IG5ldyBTY2FsZShlbClcblxuICAvLyBhbiBpbXByb3Zpc2F0aW9uYWwgdHJhbnNsYXRlIG1ldGhvZCwgdG8gY2hlY2sgdGhhdCB1cGRhdGVUcmFuc2Zvcm1EYXRhIHdvcmtzLlxuICBzY2FsZXIudHJhbnNsYXRlID0gZnVuY3Rpb24odHJhbnNsLCBzY2FsZUZhY3Rvcikge1xuICAgIC8vIHNjYWxlci5lbC5zdHlsZS50cmFuc2Zvcm0gPSBcIm1hdHJpeChcIisgc2NhbGVGYWN0b3IgK1wiLCAwLCAwLCBcIisgc2NhbGVGYWN0b3IgK1wiLCBcIisgdHJhbnNsICtcIiwgXCIrIHRyYW5zbCArXCIpXCJcbiAgICAvLyB0cmFuc2xhdGUoc2NhbGFibGUuZWwsIHRyYW5zbCwgc2NhbGVGYWN0b3IpXG5cbiAgICBzY2FsZXIuZG9tSW8uc2V0TWF0cml4KGVsLCB7XG4gICAgICB0cmFuc2xhdGU6IHtcbiAgICAgICAgeDogdHJhbnNsLFxuICAgICAgICB5OiB0cmFuc2xcbiAgICAgIH0sXG4gICAgICBzY2FsZToge1xuICAgICAgICB4OiBzY2FsZUZhY3RvcixcbiAgICAgICAgeTogc2NhbGVGYWN0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdHJhbnNmb3JtcyA9IHNjYWxlci5kb21Jby5nZXRUcmFuc2Zvcm1zKClcblxuICAgIHNjYWxhYmxlLnVwZGF0ZVRyYW5zZm9ybURhdGEodHJhbnNmb3JtcylcbiAgfVxuXG4gIC8vXG4gIHBpbmNoRW11bGF0b3Iub25zdGFydCA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgY29uc29sZS5sb2coXCJvbnN0YXJ0XCIsIGV2KVxuICAgIHNjYWxlci5zY2FsZVN0YXJ0KGV2KVxuICB9XG5cbiAgcGluY2hFbXVsYXRvci5vbm1vdmUgPSBmdW5jdGlvbihldikge1xuICAgIGNvbnNvbGUubG9nKFwib25tb3ZlXCIsIGV2KVxuICAgIHNjYWxlci5zY2FsZU1vdmUoZXYpXG4gIH1cblxuICBwaW5jaEVtdWxhdG9yLm9uZW5kID0gZnVuY3Rpb24oZXYpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9uZW5kXCIsIGV2KVxuICAgIHNjYWxlci5zY2FsZVN0b3AoZXYpXG4gIH1cblxuICBwaW5jaEVtdWxhdG9yLnN1YnNjcmliZSgpXG5cbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIG1haW4pXG4iXSwic291cmNlUm9vdCI6IiJ9