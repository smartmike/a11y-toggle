(function () {
  'use strict';

  var internalId = 0;

  function $ (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function getClosestToggle (element) {
    if (element.closest) {
      return element.closest('[data-a11y-toggle]');
    }

    while (element) {
      if (element.nodeType === 1 && element.hasAttribute('data-a11y-toggle')) {
        return element;
      }

      element = element.parentNode;
    }

    return null;
  }

  var togglesMap = $('[data-a11y-toggle]').reduce(function (acc, toggle) {
    var selector = '#' + toggle.getAttribute('data-a11y-toggle');
    acc[selector] = acc[selector] || [];
    acc[selector].push(toggle);
    return acc;
  }, {});

  var targetsMap = {};

  $(Object.keys(togglesMap)).forEach(function (target) {
    targetsMap[target.id] = target;

    var toggles = togglesMap['#' + target.id];
    var isExpanded = target.hasAttribute('data-a11y-toggle-open');
    var labelledby = [];

    toggles.forEach(function (toggle) {
      toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);
      toggle.setAttribute('aria-controls', target.id);
      toggle.setAttribute('aria-expanded', isExpanded);
      labelledby.push(toggle.id);
    });

    target.setAttribute('aria-hidden', !isExpanded);
    target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', labelledby.join(' '));
  });

  document.addEventListener('click', function (event) {
    var toggle = getClosestToggle(event.target);
    var target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

    if (!target) {
      return false;
    }

    var toggles = togglesMap['#' + target.id];
    var isExpanded = target.getAttribute('aria-hidden') === 'false';

    target.setAttribute('aria-hidden', isExpanded);
    toggles.forEach(function (toggle) {
      toggle.setAttribute('aria-expanded', !isExpanded);
    });
  });
})();
