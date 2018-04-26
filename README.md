# enter-view.js

Dependency-free JavaScript library to detect when element enters into view. [See demo](https://russellgoldenberg.github.io/enter-view/).

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
	offset: 0.5, // enter at middle of viewport
	once: false, // trigger every time
});
```

## Options

#### selector: [string or array of elements] _required_

Takes a class, id, or array of dom elements.

#### enter: [function] _required_

Callback function that returns the element that was entered.

#### exit: [function] _required_

Callback function that returns the element that was exited.

#### offset: [number] _optional_ (defaults to 0)

A value from 0 to 1 of how far from the bottom of the viewport to offset the trigger by. 0 = top of element crosses bottom of viewport (enters screen from bottom), 1 = top of element crosses top of viewport (exits screen top).

#### once: [boolean] _optional_ (defaults to false)

Whether or not to trigger the callback just once.
