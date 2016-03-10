(function () {
  var toggles = document.querySelectorAll('[data-a11y-toggle][aria-controls]');
  var targetsList = [];

  for (var i = 0; i < toggles.length; i += 1) {
    var toggle = toggles[i];
    targetsList.push('#' + toggle.getAttribute('aria-controls'));
    toggle.hasAttribute('aria-expanded') || toggle.setAttribute('aria-expanded', false);
  }

  var targets = targetsList.length && document.querySelectorAll(targetsList);
  var targetsMap = {};

  for (var j = 0; j < targets.length; j += 1) {
    var target = targets[j];
    targetsMap[target.id] = target;
    target.hasAttribute('aria-hidden') || target.setAttribute('aria-hidden', true);
  }

  document.addEventListener('click', function (event) {
    var toggle = event.target;
    var target = targetsMap[toggle.getAttribute('aria-controls')];
    var isExpanded = JSON.parse(toggle.getAttribute('aria-expanded'));

    target && toggle.setAttribute('aria-expanded', !isExpanded);
    target && target.setAttribute('aria-hidden', isExpanded);
  });
}());
