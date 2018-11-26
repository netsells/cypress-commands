describe('getAccessibilityErrors', () => {
    describe('when accessible', () => {
        beforeEach(() => {
            cy.visit('accessible');

            cy.contains('h1', 'Accessible').should('be.visible');
        });

        it('returns an empty array', () => {
            cy.getAccessibilityErrors().should('deep.equal', []);
        });
    });

    describe('when inaccessible', () => {
        beforeEach(() => {
            cy.visit('inaccessible');

            cy.contains('h1', 'Inaccessible').should('be.visible');
        });

        it('returns the errors', () => {
            cy.getAccessibilityErrors().should('have.length.above', 0);
        });
    });
});
