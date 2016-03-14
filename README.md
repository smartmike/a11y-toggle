# A11y Toggle

A tiny script (less than 0.5Kb gzipped) to build accessible content toggles.

You can try the [live demo](http://edenspiekermann.github.io/a11y-toggle/).


## Install

```sh
npm install --save a11y-toggle
```


## Usage

The bare minimum is to set up a `data-a11y-toggle` attribute on the toggle matching the `id` of the collapsible section like so:

```html
<button data-a11y-toggle="content-container" type="button">
  Here should be a descriptive label for the collapsed content.
</button>

<div id="content-container">
  Here is some content that can be be toggled visible or invisible.
</div>
```

To make the content expanded by default, set `aria-expanded="true"` to the toggle and `aria-hidden="false"` to the collapsible container like this:

```html
<button data-a11y-toggle="content-container" aria-expanded="true" type="button">
  Here should be a descriptive label for the collapsed content.
</button>

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

* Initial ARIA-specific attributes such as `aria-expanded`, `aria-hidden` and `aria-labelledby`, as well as `id` on the toggle element are being added automatically if not already set.
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
