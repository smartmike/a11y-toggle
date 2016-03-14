(function () {
  // Simple polyfill for Object.keys
  function objectKeys (object) {
    if (Object.keys) return Object.keys(object);

    var keys = [];
    for (var key in object) object.hasOwnProperty(key) && keys.push(key);
    return keys;
  }

  function closest(el, selector) {
    var matches = el.webkitMatchesSelector ? 'webkitMatchesSelector' : (el.msMatchesSelector ? 'msMatchesSelector' : 'matches');

    while (el.parentElement) {
      if (el[matches](selector)) return el;
      el = el.parentElement;
    }

    return null;
  }

  var namespace = 'data-a11y-toggle';
  var toggles = document.querySelectorAll('[' + namespace + ']');
  var togglesMap = {};

  // Loop over the toggles
  for (var i = 0; i < toggles.length; i += 1) {
    var toggle = toggles[i];
    var targetId = toggle.getAttribute(namespace);

    // Set `id`, `aria-expanded` and `aria-controls` if not set yet
    toggle.id || toggle.setAttribute('id', targetId + '-a11y-toggle');
    toggle.hasAttribute('aria-expanded') || toggle.setAttribute('aria-expanded', false);
    toggle.hasAttribute('aria-controls') || toggle.setAttribute('aria-controls', targetId);

    // Map target `id` selector with toggle `id`
    togglesMap['#' + targetId] = toggle.id;
  }

  var targetsList = objectKeys(togglesMap);
  var targets = targetsList.length && document.querySelectorAll(targetsList);
  var targetsMap = {};

  // Loop over targets
  for (var j = 0; j < targets.length; j += 1) {
    var target = targets[j];
    var toggleId = togglesMap['#' + target.id];

    // Set `aria-hidden` and `aria-labelledby` if not set yet
    target.hasAttribute('aria-hidden') || target.setAttribute('aria-hidden', true);
    target.hasAttribute('aria-labelledby') || (toggleId && target.setAttribute('aria-labelledby', toggleId));

    // Map target `id` with target node for quick find on click event
    targetsMap[target.id] = target;
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target.hasAttribute(namespace)
      ? event.target
      : closest(event.target, '[' + namespace + ']');
    var target = targetsMap[toggle.getAttribute(namespace)];
    var isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    if (target) {
      toggle.setAttribute('aria-expanded', !isExpanded);
      target.setAttribute('aria-hidden', isExpanded);
    }
  });
}());
