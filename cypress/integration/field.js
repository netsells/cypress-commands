describe('field', () => {
    beforeEach(() => {
        cy.visit('fields');
    });

    it('gets the field by the label contents', () => {
        cy.field('Test Field', field => {
            field.should('have.attr', 'id', 'foo');
        });
    });
});
