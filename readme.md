## Touch Scale - **Core**
Module for scaling an element, based on a pinch gesture - of the form `{center: {x, y}, scale: 1.3}`. Touch gesture library agnostic.

**What it doesn't do:**
  * Doesn't interact with the DOM
  * Doesn't implement animation
  * Doesn't convert transformation data to position and dimensions

**What it does do:**
  * Calculates new values for given transform data - including origin -, based on the pinch data. *note:* it calculates translation for a scaled element to stay in it's actual position when it's origin gets changed

## Usage:
  * Just to demonstrate, what it's about, [here's a code demo](https://github.com/spti/scale-core/blob/master/usage.md). It doesn't render anything, though, neither does it use `rAf`.

  * Here is a [working prototype]()

## note on styles:
  In the current setup, the element is centered - specifically, via `flexbox` container's `justify-content` and `align-items`, and not with `margin: auto`. See sass partials in `src/css/`
