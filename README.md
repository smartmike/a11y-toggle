# A11y Toggle

A tiny script (less than 0.4Kb gzipped) to build accessible content toggles.

You can try the [live demo](http://edenspiekermann.github.io/a11y-toggle/).


## Install

```sh
npm install --save a11y-toggle
```

## Usage

Set up the `data-a11y-toggle` attribute on the toggle as well as an `aria-controls` attribute matching an existing `id`. For further accessibility reasons, it is also highly recommended to define an `id` attribute for the button itself so it can be mapped to a `aria-labelledby` attribute on the target.

```html
<button data-a11y-toggle
        id="my-toggle-button"
        type="button"
        aria-controls="content-container">Toggle content</button>

<div id="content-container">
  Here is some content that can be be toggled visible or invisible.
</div>
```

To make the content expanded by default, set it up like this:

```html
<button data-a11y-toggle
        id="my-toggle-button"
        type="button"
        aria-controls="content-container"
        aria-expanded="true">Toggle content</button>

<div id="content-container" aria-hidden="false">
  Here is some content that can be be toggled visible or invisible.
</div>
```

Then add this in your stylesheet (feel free to scope or restrict it):

```css
[aria-hidden="true"] {
  display: none;
}
```

## Notes

* Initial ARIA-specific attributes such as `aria-expanded`, `aria-hidden` and `aria-labelledby` are being added automatically.
* The collapsible content does not have to live right next to the toggle, hence the `aria-controls` attribute in order to provide a shortcut for assistive technologies.
* The toggle can be something else than a `<button>` however a button is preferred as it the best suited element for such an interactive task.


## Tests

[CasperJS](http://casperjs.org) is being used to run browser tests. CasperJS has some [dependencies](http://docs.casperjs.org/en/latest/installation.html#prerequisites) that have to be installed manually. Be sure to satisfy them before running the tests.

```
npm test
```

## Deploy example

The [example page](http://edenspiekermann.github.io/a11y-toggle/) is deployed through [GitHub Pages](https://pages.github.com/). 

```
npm run deploy
```
