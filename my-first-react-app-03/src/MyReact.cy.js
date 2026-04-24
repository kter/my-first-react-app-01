/* SAMPLE */
describe('Cypress Sample', () => {
  it('MyReact App Test', () => {
    cy.visit('/');
    cy.get('#name').clear().type('first lastfirst lastfirst lastfirst lastfirst lastfirst lastfirst lastfirst last');
    cy.get('#email').clear().type('test-exmaple.com');
    cy.get('[type="submit"]').click();
    cy.get('div.error').should('contain', 'name must be less than 20 characters');
    cy.get('div.error').should('contain', 'invalid syntax of email');
    cy.get('div.error').should('contain', 'note must not to be empty');
    cy.get('#name').should('have.focus');

    cy.get('#name').clear().type('first last');
    cy.get('#male').check();
    cy.get('#email').clear().type('test@example.com);
    cy.get('#memo').type('test');
    cy.get('[type="submit"]').click();
    cy.get('div.error').should('be.empty');
  });
});

