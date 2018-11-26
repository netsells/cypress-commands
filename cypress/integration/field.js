describe('field', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fields');
    });

    it('gets the field by the label contents', () => {
        cy.field('Test Field', field => {
            field.should('have.attr', 'id', 'foo');
        });
    });
});
