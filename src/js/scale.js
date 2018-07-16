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

export {Scale}

/*
const Scale = {
  expose: function() {
    return ScaleCapsule()
  }
}

export {Scale}

*/
