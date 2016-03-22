(function () {
  'use strict';

  var internalId = 0;

  function $ (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function closest (el, selector) {
    if (el.closest) return el.closest(selector);

    var matches = el.webkitMatchesSelector
      ? 'webkitMatchesSelector'
      : (el.msMatchesSelector ? 'msMatchesSelector' : 'matches');

    while (el) {
      if (el.nodeType === 1 && el[matches](selector)) {
        console.log(el);
        return el;
      }

      el = el.parentNode;
    }

    return null;
  }

  var togglesMap = $('[data-a11y-toggle]').reduce(function (acc, toggle) {
    var targetId = toggle.getAttribute('data-a11y-toggle');

    toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);
    toggle.hasAttribute('aria-expanded') || toggle.setAttribute('aria-expanded', true);
    toggle.setAttribute('aria-controls', targetId);

    acc['#' + targetId] = acc['#' + targetId] || [];
    acc['#' + targetId].push(toggle);

    return acc;
  }, {});

  var targetsMap = $(Object.keys(togglesMap)).reduce(function (acc, target) {
    var labelledby = togglesMap['#' + target.id].map(function (toggle) {
      return toggle.id;
    }).join(' ');

    target.hasAttribute('aria-hidden') || target.setAttribute('aria-hidden', false);
    target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', labelledby);

    acc[target.id] = target;

    return acc;
  }, {});

  document.addEventListener('click', function (event) {
    var toggle = closest(event.target, '[data-a11y-toggle]');
    var target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

    if (!target) return false;

    var isExpanded = target.getAttribute('aria-hidden') === 'false';
    var toggles = togglesMap['#' + target.id];

    target.setAttribute('aria-hidden', isExpanded);
    toggles.forEach(function (toggle) {
      return toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
})();
