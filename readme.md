A simple, (extensible) module for scaling dom elements.

# Features:
  * Scales the element.
  * Fits the element inside the viewport.

# Usage:

## initialize:
```javascript
  const el = document.querySelector('#scalable')
  const scale = new Scale(el, options)
  scale.scaleUp()
```

## options:
```javascript
const options = {
  beforeScale: function() {console.log("scaling finished")},
  afterScale: function() {console.log("scaling finished")},
  transitionClass: "my-custom-transition-class", // be careful with overriding the default here - you should be aware of specificity.
}
```

## styles:

  If you use sass, then, in your file:

```css
  @import 'node_modules/scale/dist/container';
  @import 'node_modules/scale/dist/element';

  .my-custom-container-class {
    @include container();

    /* my custom styles*/
  }

  .my-custom-element-class {
    @include element();

    /* my custom styles*/
  }

  .my-custom-element-class.my-custom-transition-class {
    /* your transition code */
  }
```

  * If you want to use your own styles, there's things to keep in mind:
    * the element should be centered via `flexbox` container's `justify-content` and `align-items` - not with `margin: auto`.
    * be aware of specificity, when defining your transition class - better have it attached to the class of the element (i.e. `.scalable.scale-transition`)
