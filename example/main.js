(function () {
  function objectKeys (object) {
    if (Object.keys) return Object.keys(object);

    var keys = [];
    for (var key in object) object.hasOwnProperty(key) && keys.push(key);
    return keys;
  }

  var toggles = document.querySelectorAll('[data-a11y-toggle][aria-controls]');
  var togglesMap = {};

  for (var i = 0; i < toggles.length; i += 1) {
    var toggle = toggles[i];
    togglesMap['#' + toggle.getAttribute('aria-controls')] = toggle.id;
    toggle.hasAttribute('aria-expanded') || toggle.setAttribute('aria-expanded', false);
  }

  var targetsList = objectKeys(togglesMap);
  var targets = targetsList.length && document.querySelectorAll(targetsList);
  var targetsMap = {};

  for (var j = 0; j < targets.length; j += 1) {
    var target = targets[j];
    var toggleId = togglesMap['#' + target.id];
    targetsMap[target.id] = target;
    target.hasAttribute('aria-hidden') || target.setAttribute('aria-hidden', true);
    target.hasAttribute('aria-labelledby') || (toggleId && target.setAttribute('aria-labelledby', toggleId));
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target;
    var target = targetsMap[toggle.getAttribute('aria-controls')];
    var isExpanded = JSON.parse(toggle.getAttribute('aria-expanded'));

    target && toggle.setAttribute('aria-expanded', !isExpanded);
    target && target.setAttribute('aria-hidden', isExpanded);
  });
}());
