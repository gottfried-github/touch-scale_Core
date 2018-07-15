import {Scale} from "../dist/scale.js"

function main() {
  console.log(Scale)

  const scalableEl = document.querySelector('.scalable')
  const scalable = new Scale(
    scalableEl,
    {
      scaleFactor: 3,
      beforeScale: function(coordinates) {
        console.log('beforeScale')
      },
      afterScale: function(el) {
        console.log('afterScale')
      },
      accountForTranslation: false,
      // getSize: function(el) {
      //   return el.getBoundingClientRect()
      // }
      transitionClass: "scalable-transition"
    }
  )

  // an improvisational translate method, to check that updateTransformData works.
  scalable.translate = function(transl, scaleFactor) {
    scalable.el.style.transform = "matrix("+ scaleFactor +", 0, 0, "+ scaleFactor +", "+ transl +", "+ transl +")"
    // translate(scalable.el, transl, scaleFactor)

    const translateActual = scalable.el.style.transform.split('(')[1].split(')')[0].split(',');
    for (let i = 0; i < translateActual.length; i++) {
      translateActual[i] = parseFloat(translateActual[i]);
    }

    scalable.updateTransformData({
      translateX: translateActual[4],
      translateY: translateActual[5],
    })
  }

  console.log(scalable)
}

window.addEventListener("load", main)
