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

export {ScaleCore}

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

export {ScaleDomIo}

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


export {Scale}

/*
const Scale = {
  expose: function() {
    return ScaleCapsule()
  }
}

export {Scale}

*/
