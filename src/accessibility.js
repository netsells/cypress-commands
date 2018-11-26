/**
 * Load the accessibility commands for Cypress
 *
 * @param {Object} options
 * @param {String} [options.evaluateEndpoint]
 */
const loadAccessibilityCommands = ({
    evaluateEndpoint = 'http://aatt.node.ns-client.xyz/evaluate',
} = {}) => {
    /**
     * Checks the current page HTML against the accessibility evaluation
     * endpoint. Will throw any errors present, failing the test run.
     */
    Cypress.Commands.add('checkAccessibility', () => {
        return cy.getAccessibilityErrors()
            .then(errors => {
                if (errors.length) {
                    throw new Error(errors.map(({ code, msg }) => `
                            '${ code }': ${ msg }
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

        return cy.document()
            .then(doc => {
                const source = doc.documentElement.outerHTML;

                expect(source).to.have.string('');

                return cy.request('POST', evaluateEndpoint, {
                    source,
                    output: 'json',
                })
                    .then(response => {
                        return response.body
                            .filter(({ type }) => type === 'error')
                            .map(({ code, ...error }) => ({
                                ...error,
                                code: htmlDecode(code),
                            }));
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

            callback(cy.get(`#${ id }`));
        });
    });
};

module.exports = loadAccessibilityCommands;
