function ScaleCore() {

}

ScaleCore.prototype.calculateTransform = function(target, transforms, rects, parent) {

  // project, what rects of el would look like after it's scaled
  const rectsProjected = this.projectRects(target, rects, transforms)

  // adjust the el's translation to fit it in it's container nicely
  const transformsNew = this.encounterBounds(transforms, rectsProjected, parent)

  // update the data
  transformsNew.scaleX = target
  transformsNew.scaleY = target

  return transformsNew
}

ScaleCore.prototype.projectRects = function(target, rects, transforms) {

  // this.coordinates.rects = this.el.getBoundingClientRect();

  // figure out the dimensions for the element to obtain after scaling:
  var ratio = target / transforms.scaleX;

  // we make projection of the future scaled element...
  const rectsProjected = {
    left: (rects.left + rects.width / 2) - (transforms.originX * target),
    top: (rects.top + rects.height / 2) - (transforms.originY * target),
    width: rects.width * ratio,
    height: rects.height * ratio
  }

  return rectsProjected
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

export {ScaleCore}

/*
const ScaleCore = {
  expose: function() {
    return ScaleCoreCapsule()
  }
}

// export {ScaleCoreCapsule}
*/
