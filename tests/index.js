/* global casper */

casper.test.begin('Toggle test suite', 8, function (test) {
  casper.start('http://edenspiekermann.github.io/a11y-toggle/', function () {
    this.page.onConsoleMessage = function (msg, lineNum, sourceId) {
      console.log('CONSOLE: ' + msg);
    };

    this.page.injectJs('../a11y-toggle.js');
    this.emit('page.loaded');
  });

  casper.on('page.loaded', function () {
    var toggleA = '[data-a11y-toggle][aria-controls=\'toggle-1\']';
    var toggleB = '[data-a11y-toggle][aria-controls=\'toggle-2\'][aria-expanded="true"]';
    var targetA = '#toggle-1';
    var targetB = '#toggle-2[aria-hidden="false"]';

    this.then(function () {
      this.echo('\nTest initial setup');
      test.assertExist(toggleA);
      test.assertExist(toggleB);
      test.assertExist(targetA);
      test.assertExist(targetB);
    });

    this.then(function () {
      this.echo('\nTest expanding content');
      this.click(toggleA);
      test.assertExist(toggleA + '[aria-expanded="true"]');
      test.assertExist(targetA + '[aria-hidden="false"]');
    });

    this.then(function () {
      this.echo('\nTest collapsing content');
      this.click(toggleB);
      test.assertExist(toggleB.replace('true', 'false'));
      test.assertExist(targetB.replace('false', 'true'));
    });
  });

  casper.run(function () {
    this.test.done();
    this.exit();
  });

});
