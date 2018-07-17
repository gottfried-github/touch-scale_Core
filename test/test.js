import {Scale} from "../dist/scale.js"
import {Hammer} from "hammer"

function main() {
  console.log(Scale)

  const el = document.querySelector('.scalable')
  const scaler = new Scale(el)

  // an improvisational translate method, to check that updateTransformData works.
  scaler.translate = function(transl, scaleFactor) {
    // scaler.el.style.transform = "matrix("+ scaleFactor +", 0, 0, "+ scaleFactor +", "+ transl +", "+ transl +")"
    // translate(scalable.el, transl, scaleFactor)

    scaler.domIo.setMatrix(el, {
      translate: {
        x: transl,
        y: transl
      },
      scale: {
        x: scaleFactor,
        y: scaleFactor
      }
    })

    const transforms = scaler.domIo.getTransforms()

    scalable.updateTransformData(transforms)
  }

  el.addEventListener("pinchstart", (ev) => {
    const gesture = {
      center: ev.center,
      scale: ev.scale
    }

    scaler.scaleStart(gesture)
  })

  el.addEventListener("pinchmove", (ev) => {
    const gesture = {
      center: ev.center,
      scale: ev.scale
    }

    scaler.scaleMove(gesture)
  })

  el.addEventListener("pinchend", (ev) => {
    const gesture = {
      center: ev.center,
      scale: ev.scale
    }

    scaler.scaleStop(gesture)
  })

}

window.addEventListener("load", main)
