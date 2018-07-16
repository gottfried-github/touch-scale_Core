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
