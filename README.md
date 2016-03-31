# enter-view.js

Dependency-free JavaScript library to detect when element enters into view. [See demo](https://russellgoldenberg.github.io/enter-view/).

## Usage 

```
enterView({
	selector: '.class-name',
	trigger: function(el) {
		el.classList.add('entered');
	}
});
```

## Options

#### selector: [string] *required*
Takes a class or id element selector

#### trigger: [function] *required*
Callback function that returns the element that was triggered

#### offset: [string] *optional* (defaults to 0% = top of element enters bottom of viewport)
Percent (eg. '50%') of how far from the bottom of the viewport to offset the trigger by
