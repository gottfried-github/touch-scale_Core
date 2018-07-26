A simple, (extensible) module for scaling dom elements.

## Features:
  * Scales the element.
  * Fits the element inside the viewport.

## Usage:

### initialize:
```javascript
  const el = document.querySelector('#scalable')
  const scale = new Scale(el, options)
  scale.scaleUp()
```

### options:
```javascript
const options = {
  beforeScale: function() {console.log("scaling finished")},
  afterScale: function() {console.log("scaling finished")},
  transitionClass: "my-custom-transition-class", // be careful with overriding the default here - you should be aware of specificity.
}
```

### styles:

If you use sass, then, in your file:

```css
@import 'node_modules/touch-scale_core/dist/container';
@import 'node_modules/touch-scale_core/dist/element';

.my-container {
  @include container();

  /* my custom styles*/
}

.my-scalable-element {
  @include element();

  /* my custom styles*/
}
```

If you don't use sass, then add this to your container and element:

```css
.my-container {
  display: flex;
  justify-content: center;
  align-items: center;

  /* my custom styles */  
}

.my-scalable-element {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;

  /* my custom styles */
}
```

Animation (**note** the specificity - the transition class is attached to the element selector):

```css
.my-scalable-element.my-transition-class {
  /*
  your transition code, e.g.:
  transition: transform 700ms ease-in;

  */
}
```
