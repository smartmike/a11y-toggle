# A11y Toggle

A tiny script (less than 0.3Kb gzipped) to build accessible content toggles.

You can try the [live demo](http://edenspiekermann.github.io/a11y-toggle/).


## Install

```sh
npm install --save a11y-toggle
```

## Usage

Set up the `data-a11y-toggle` attribute on the toggle as well as an `aria-controls` attribute matching an existing `id`. 

```html
<button data-a11y-toggle
        type="button"
        aria-controls="content-container">Toggle content</button>

<div id="content-container">
  Here is some content that can be be toggled visible or invisible.
</div>
```

To make the content expanded by default, set it up like this:

```html
<button data-a11y-toggle
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
