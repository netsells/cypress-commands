"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Load the accessibility commands for Cypress
 *
 * @param {Object} options
 * @param {String} [options.evaluateEndpoint]
 */
const loadAccessibilityCommands = ({
  evaluateEndpoint = 'http://aatt.node.ns-client.xyz/evaluate'
} = {}) => {
  /**
   * Checks the current page HTML against the accessibility evaluation
   * endpoint. Will throw any errors present, failing the test run.
   */
  Cypress.Commands.add('checkAccessibility', () => {
    return cy.getAccessibilityErrors().then(errors => {
      if (errors.length) {
        throw new Error(errors.map(({
          code,
          msg
        }) => `
                            '${code}': ${msg}
                        `.trim()).join('\r\n'));
      }
    });
  });
  /**
   * Checks the current page HTML against the accessibility evaluation
   * endpoint. Will throw any errors present, failing the test run.
   */

  Cypress.Commands.add('getAccessibilityErrors', () => {
    /**
     * Decode HTML entities
     *
     * @param {String} input
     * @returns {String}
     */
    const htmlDecode = input => {
      const e = document.createElement('div');
      e.innerHTML = input;
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    };

    return cy.document().then(doc => {
      const source = doc.documentElement.outerHTML;
      expect(source).to.have.string('');
      return cy.request('POST', evaluateEndpoint, {
        source,
        output: 'json'
      }).then(response => {
        return response.body.filter(({
          type
        }) => type === 'error').map((_ref) => {
          let {
            code
          } = _ref,
              error = _objectWithoutProperties(_ref, ["code"]);

          return _objectSpread({}, error, {
            code: htmlDecode(code)
          });
        });
      });
    });
  });
  /**
   * Find a field by using the contents of a `label`. This helps ensure
   * the form is accessible.
   *
   * @example
   * cy.field('Password', field => field.type('Password'));
   */

  Cypress.Commands.add('field', (name, callback) => {
    cy.contains('label', name).then(label => {
      const id = label.attr('for');
      callback(cy.get(`#${id}`));
    });
  });
};

module.exports = loadAccessibilityCommands;