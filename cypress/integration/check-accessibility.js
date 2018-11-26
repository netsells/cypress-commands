describe('checkAccessibility', () => {
    describe('when accessible', () => {
        beforeEach(() => {
            cy.visit('accessible');

            cy.contains('h1', 'Accessible').should('be.visible');
        });

        it('does not throw any errors', () => {
            cy.checkAccessibility();
        });
    });
});
