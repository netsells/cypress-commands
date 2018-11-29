"use strict";

/**
 * Create accessibility tests for multiple URLs
 *
 * @param {String} urls
 */
const createAccessiblityTests = (...urls) => {
  describe('accessibility', () => {
    urls.forEach(url => {
      describe(url, () => {
        beforeEach(() => {
          cy.visit(url);
        });
        it('is accessible', () => {
          cy.checkAccessibility();
        });
      });
    });
  });
};

module.exports = createAccessiblityTests;