describe('Initial setup', function () {
  var toggle, target;
  var actual, expected;

  it('should add `id` attribute to toggle if not set', function () {
    actual = document.querySelector('[data-a11y-toggle="t0"]').id;
    expected = 'a11y-toggle-0';
    expect(actual).to.be.equal(expected);
  });

  it('should not add `id` attribute to toggle if already set', function () {
    actual = document.querySelector('[data-a11y-toggle="t1"]').id;
    expected = 'custom-id-1';
    expect(actual).to.be.equal(expected);
  });

  it('should add `aria-expanded` attribute to toggle if not set', function () {
    actual = document.querySelector('[data-a11y-toggle="t2"]').getAttribute('aria-expanded');
    expected = 'true';
    expect(actual).to.be.equal(expected);
  });

  it('should not add `aria-expanded` attribute to toggle if already set', function () {
    actual = document.querySelector('[data-a11y-toggle="t3"]').getAttribute('aria-expanded');
    expected = 'false';
    expect(actual).to.be.equal(expected);
  });

  it('should transpose `data-a11y-toggle` into `aria-controls` attribute to toggle', function () {
    actual = document.querySelector('[data-a11y-toggle="t4"]').getAttribute('aria-controls');
    expected = document.querySelector('[data-a11y-toggle="t4"]').getAttribute('data-a11y-toggle');
    expect(actual).to.be.equal(expected);
  });

  it('should add `aria-hidden` attribute to target if not set', function () {
    actual = document.querySelector('#t5').getAttribute('aria-hidden');
    expected = 'false';
    expect(actual).to.be.equal(expected);
  });

  it('should not add `aria-hidden` attribute to target if already set', function () {
    actual = document.querySelector('#t6').getAttribute('aria-hidden');
    expected = 'true';
    expect(actual).to.be.equal(expected);
  });

  it('should add `aria-labelledby` attribute to target if not set', function () {
    actual = document.querySelector('#t7').getAttribute('aria-labelledby');
    expected = 'custom-id-2';
    expect(actual).to.be.equal(expected);
  });

  it('should add `aria-labelledby` attribute to target if not set with multiple toggles', function () {
    actual = document.querySelector('#t8').getAttribute('aria-labelledby');
    expected = 'custom-id-3 custom-id-4';
    expect(actual).to.be.equal(expected);
  });

  it('should not add `aria-labelledby` attribute to target if already set', function () {
    actual = document.querySelector('#t9').getAttribute('aria-labelledby');
    expected = 'custom-id-5';
    expect(actual).to.be.equal(expected);
  });
});

describe('Click events', function () {
  var actual, expected;

  it('should toggle `aria-hidden` attribute on target when clicked', function () {
    var toggle = document.querySelector('[data-a11y-toggle="t10"]');
    var target = document.querySelector('#t10');
    toggle.click();

    actual = target.getAttribute('aria-hidden');
    expected = 'true';
    expect(actual).to.be.equal(expected);
  });

  it('should toggle `aria-expanded` attribute on toggled when clicked', function () {
    var toggle = document.querySelector('[data-a11y-toggle="t11"]');
    toggle.click();

    actual = toggle.getAttribute('aria-expanded');
    expected = 'false';
    expect(actual).to.be.equal(expected);
  });

  it('should toggle `aria-expanded` attribute on related toggles when one clicked', function () {
    var toggle = document.querySelector('[data-a11y-toggle="t12"]');
    var toggleB = document.querySelector('#custom-id-6');
    toggle.click();

    actual = toggleB.getAttribute('aria-expanded');
    expected = 'false';
    expect(actual).to.be.equal(expected);
  });

  it('should work correctly with nested DOM in toggle', function () {
    var toggle = document.querySelector('[data-a11y-toggle="t13"]');
    toggle.click();

    actual = toggle.getAttribute('aria-expanded');
    expected = 'false';
    expect(actual).to.be.equal(expected);
  });
});
