"use strict";

/**
 * Create accessibility tests for multiple URLs
 *
 * @param {String} urls
 */
var createAccessiblityTests = function createAccessiblityTests() {
  for (var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++) {
    urls[_key] = arguments[_key];
  }

  describe('accessibility', function () {
    urls.forEach(function (url) {
      describe(url, function () {
        beforeEach(function () {
          cy.visit(url);
        });
        it('is accessible', function () {
          cy.checkAccessibility();
        });
      });
    });
  });
};

module.exports = createAccessiblityTests;