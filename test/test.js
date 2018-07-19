import {Scale} from "../dist/scale.js"
import {pinchEmulator} from "emulate-pinch"

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

  //
  pinchEmulator.onstart = function(ev) {
    // console.log("onstart", ev)
    scaler.scaleStart(ev)
  }

  pinchEmulator.onmove = function(ev) {
    // console.log("onmove", ev)
    scaler.scaleMove(ev)
  }

  pinchEmulator.onend = function(ev) {
    // console.log("onend", ev)
    scaler.scaleStop(ev)
  }

  pinchEmulator.subscribe()

}

window.addEventListener("load", main)
