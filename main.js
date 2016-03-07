(function () {
  var toggles = document.querySelectorAll('[data-a11y-toggle][aria-controls]');

  function prepareDOM (toggle, target) {
    toggle.hasAttribute('aria-expanded') || toggle.setAttribute('aria-expanded', false);
    target.hasAttribute('aria-hidden') || target.setAttribute('aria-hidden', true);
  }

  function handleClick (toggle, target) {
    var isExpanded = JSON.parse(toggle.getAttribute('aria-expanded'));

    toggle.setAttribute('aria-expanded', !isExpanded);
    target.setAttribute('aria-hidden', !!isExpanded);
  }

  for (var i = 0; i < toggles.length; i += 1) {
    var toggle = toggles[i];
    var target = document.getElementById(toggle.getAttribute('aria-controls'));

    prepareDOM(toggle, target);
    toggle.addEventListener('click', handleClick.bind(null, toggle, target), false);
  }
}());
