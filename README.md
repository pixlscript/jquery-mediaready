# jQuery.mediaReady.js

jQuery plugin for running code dependent on media features (e.g. the current screen-width or touch capability) - think custom media queries for JavaScript

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/pixlscript/jquery-mediaready/master/dist/jquery.mediaready.min.js
[max]: https://raw.github.com/pixlscript/jquery-mediaready/master/dist/jquery.mediaready.js

In your web page:
```html
<script src="jquery.js"></script>
<script src="dist/mediaready.min.js"></script>
<script>
jQuery(function($) {
  $.mediaReady.init();  // initialize plugin (using default options)

  $.mediaReady.on(['md', 'lg'], function() {
    // fires when browser width is > 991px
  });
});
</script>
```

## Documentation
After running `jQuery.mediaReady.init()` you have access to the following methods:

#### `jQuery.mediaReady.ready(requiredMedias, callback);`

> **requiredMedias**:     string or array of media names

> **callback**:           function

Instantly check for one or more media types:
```javascript
jQuery.mediaReady.ready(['xs', 'sm'], function() {
    // run this code if window width matches either xs or sm breakpoint
});
```

#### `jQuery.mediaReady.besides(forbiddenMedias, callback);`

> **forbiddenMedias**:    string or array of media names

> **callback**:           function

Instantly check for one or more media types, that should **not match**:
```javascript
jQuery.mediaReady.besides(['xs', 'sm'], function() {
    // run this code if window width matches neither xs nor sm breakpoint
});
```

#### `jQuery.mediaReady.on(requiredMedias, callback, [initialize]);`

> **requiredMedias**:     string or array of media names

> **callback**:           function

> **initialize**:         initially check requiredMedias (default: true)

Check for one or more media types - check again on resize and fire callback everytime the given medias match:

```javascript
jQuery.mediaReady.on(['xs', 'sm'], function() {
    // run this code if window width matches either xs or sm breakpoint

    // also run this code after resizing the browser and
    // entering one of the required medias again
});
```

#### `jQuery.mediaReady.once(requiredMedias, callback, [initialize]);`

> **requiredMedias**:     string or array of media names

> **callback**:           function

> **initialize**:         initially check requiredMedias (default: true)

Check for one or more media types - check again on resize and fire callback **once** when the given medias match:
```javascript
jQuery.mediaReady.once(['xs', 'sm'], function() {
    // run this code if window width matches either xs or sm breakpoint

    // OR listen to changes on resize and run this code *once*
    // as soon as one of the required medias match
});
```

#### `jQuery.mediaReady.off(requiredMedias, [callback]);`

> **requiredMedias**:     string or array of media names

> **callback**:           function

Remove any listeners for the requiredMedias (if set, only the one with the given callback):

```javascript
// remove any listeners for this media combination
jQuery.mediaReady.off(['xs', 'sm']);
```

## Customization
### breakpoints
Add, modify or remove breakpoints which you can check via `ready`, `besides`, `on`, `once`. Each breakpoint needs to define a `min` and `max` width and a `name` for working with the breakpoint.

```javascript
jQuery.mediaReady.options.breakpoints.push({
    min: 768,
    max: 1200,
    name: 'my-custom-desktop-size'
});
```

By default, jQuery.mediaReady provides the standard bootstrap breakpoints and an additional `xss` breakpoint for devices smaller than 481px.

| name  | min     | max   |
| ----- |:-------:| -----:|
| xss   |  1      | 480   |
| xs    |  481    | 767   |
| sm    |  768    | 991   |
| md    |  992    | 1199  |
| lg    |  1200   | 9999  |

### media
Add, modify or remove media types which you can check via `ready`, `besides`, `on`, `once`. Each media needs to provide a `check` method returning `true` or `false` and a `name` for working with the breakpoint.

When checking for media changes after window resize, these medias are not checked again (since they normally don't change on resize). If you want to perform a media's `check` method on resize, set its `onResize` property to `true`.

```javascript
jQuery.mediaReady.options.medias.push({
    name: 'touch',
    check: function() {
        return ('ontouchstart' in window);
    }
});
```

jQuery.mediaReady.js provides this simple touch detection by default. Feel free to add your own media types!

*Think you found a really useful media type? Go send a pull request!*

## Configuration
In addition to `breakpoints` and `medias` you have access to the following configuration:

```javascript
$.mediaReady.options = {
    // body element which receives classes reflecting current media types
	body: 'body',
	// object for event delegation (pass in your own object for deeper integration)
	mediator: $({}),
	// whether to add classes to $.mediaReady.options.body reflecting active medias
	appendClasses: true,
	// whether to publish events when medias change after initialisation
	events: true,
	 // set to false to prevent listening to resize
	resize: {
		// threshold for resize listening
		debouncedInterval: 300
	}
};
```

You may override any option by passing it through `jQuery.mediaReady.init()`:
```javascript
// don't append classes to jQuery.mediaReady.options.body
// and don't listen to window resizing
jQuery.mediaReady.init({
    appendClasses: false,
    resize: false
});
```

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md)
