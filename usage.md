# Usage:

```javascript
  const scaler = new ScaleCore()

  const el = document.querySelector("#scalable")

  // initialize transform properties on element:
  var translate = {x: 0, y: 0},
  var scale = {x: 1, y: 1},
  var origin = {x: 0, y: 0}

  // some helper methods - we don't actually define them in this demo
  setTranslate(translate, el)
  setScale(scale, el)
  setOrigin(origin, el)

  // huge props to hammer guys!
  zxammertime.on("pinchstart", (ev) => {

    // gather data about element
    const rects = getRects(el)

    // calculate necessary trasforms
    const calculated = scaler.calculateStart(ev, scale, translate, rects)

    // apply calculations to the element
    setOrigin(calculate.origin, el)
    setTranslate(calculate.translate, el)

    // update our stored data
    origin = calculated.origin
    translate = calculated.translate
  })

  zxammertime.on("pinchmove", (ev) => {
    const calculated = scaler.calculateMove(ev)

    setScale(calculated.scale, el)
    setTranslate(calculated.translate, el)

    scale = calculated.scale
    translate = calculated.translate
  })

  zxammertime.on("pinchend", (ev) => {
    const rects = getRects(el)

    const calculated = scaler.calculateStop(ev, origin, scale, translate, rects)

    setScale(calculated.scale, el)
    setTranslate(calculated.translate, el)
  })
```
