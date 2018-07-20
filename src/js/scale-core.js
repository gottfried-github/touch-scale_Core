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
