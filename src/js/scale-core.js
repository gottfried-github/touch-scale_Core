function ScaleCore() {
  this.anchor = {
    scale: {
      x: 1, y: 1
    },
    offset: {
      x: 0, y: 0
    }
  }
}

ScaleCore.prototype.calculateStart = function(pinch, scale, translate, rects) {

  // (map ev's position onto the el's matrix)
  const originNew = this.mapToOrigin(pinch.center, scale, rects)

  // annigilate shifting of the element on origin change
  const translateNew = this.annigilateShift(originNew, scale, rects)

  // take into account the amount by which the translation was shifted during annigilation, at the end of previous move
  translateNew.x += this.anchor.offset.x
  translateNew.y += this.anchor.offset.y

  // snapshot coordinates for use in calculateMove
  this.anchor.center = pinch.center
  this.anchor.translate = translateNew

  // let users render the data
  return {
    origin: originNew,
    translate: translateNew
  }
}

ScaleCore.prototype.calculateMove = function(pinch) {
  const scaleNew = {}
  const translateNew = {}

  scaleNew.x = this.anchor.scale.x * pinch.scale
  scaleNew.y = this.anchor.scale.y * pinch.scale

  translateNew.x = this.anchor.translate.x + (pinch.center.x - this.anchor.center.x);
  translateNew.y = this.anchor.translate.y + (pinch.center.y - this.anchor.center.y);

  return {
    scale: scaleNew,
    translate: translateNew
  }
}

ScaleCore.prototype.calculateStop = function(pinch, origin, scale, translate, rects) {
  const calculated = this.calculateMove(pinch)

  const translateAnnigilated = this.annigilateShift(origin, scale, rects)

  // anchor the scale value, to use as point of departure in next movement
  this.anchor.scale = scale
  this.anchor.offset.x = calculated.translate.x - translateAnnigilated.x
  this.anchor.offset.y = calculated.translate.y - translateAnnigilated.y

  return calculated
}

ScaleCore.prototype.setTransformData = function(translate, scale, origin) {
  if (translate) this.crds.translate = translate
  if (scale) this.crds.scale = scale
  if (origin) this.crds.origin = origin
}

ScaleCore.prototype.mapToOrigin = function(gestureCenter, scale, rects) {
  // determine point's position, relative to the scalable element
  const pointPosWithinEl = {
    left: gestureCenter.x - rects.left,
    top: gestureCenter.y - rects.top
  }

  // map point's position to the appropriate (proper) transform-origin value (which is always in scale of 1)
  const origin = {
    x: pointPosWithinEl.left / scale.x,
    y: pointPosWithinEl.top / scale.y
  }

  return origin
}

ScaleCore.prototype.annigilateShift = function(origin, scale, rects) {

  const quarterX = rects.width / 4
  const quarterY = rects.height / 4

  const translate = {
    x: ((origin.x - quarterX) * scale.x - (origin.x - quarterX)), //  + transforms.offset.x
    y: ((origin.y - quarterY) * scale.y - (origin.y - quarterY)) //  + transforms.offset.y
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
}

export {ScaleCore}
