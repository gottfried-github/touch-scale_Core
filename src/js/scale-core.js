function ScaleCore() {

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
