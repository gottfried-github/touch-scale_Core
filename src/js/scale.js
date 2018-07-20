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


export {Scale}

/*
const Scale = {
  expose: function() {
    return ScaleCapsule()
  }
}

export {Scale}

*/
