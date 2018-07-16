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

export {Scale}

/*
const Scale = {
  expose: function() {
    return ScaleCapsule()
  }
}

export {Scale}

*/
