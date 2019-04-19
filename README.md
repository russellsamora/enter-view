# enter-view

Dependency-free JavaScript library to detect when element enters into view. [See demo](https://russellgoldenberg.github.io/enter-view/). It uses requestAnimationFrame in favor of scroll events for less jank. Less than 1kb minified + gzipped.

## Installation
Old school (exposes the `enterView` global):

```html
<script src="https://unpkg.com/enter-view"></script>
```

New school:

```sh
npm install enter-view --save
```

And then import/require it:

```js
import enterView from 'enter-view'; // or...
const enterView = require('enterView');
```

## Usage

```
enterView({
	selector: '.class-name',
	enter: function(el) {
		el.classList.add('entered');
	}
});
```

```
enterView({
	selector: '.class-name',
	enter: function(el) {
		el.classList.add('entered');
	},
	exit: function(el) {
		el.classList.remove('entered');
	},
	progress: function(el, progress) {
		el.style.opacity = progress;
	},
	offset: 0.5, // enter at middle of viewport
	once: true, // trigger just once
});
```

## Options

#### selector: [string or array of elements] _required_

Takes a class, id, or array of dom elements.

#### enter: [function] _optional_

Callback function that returns the element that was entered.

#### exit: [function] _optional_

Callback function that returns the element that was exited.

#### progress: [function] _optional_

Callback function that returns the element that was progressed through, and a value between 0 and 1 of how far through the element progress has been made.

#### offset: [number] _optional_ (defaults to 0)

A value from 0 to 1 of how far from the bottom of the viewport to offset the trigger by. 0 = top of element crosses bottom of viewport (enters screen from bottom), 1 = top of element crosses top of viewport (exits screen top).

#### once: [boolean] _optional_ (defaults to false)

Whether or not to trigger the callback just once.

## Contributors

- [Russell Goldenberg](https://github.com/russellgoldenberg)
- [Jonathan Soma](https://github.com/jsoma)
