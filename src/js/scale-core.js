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
