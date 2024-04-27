describe('Koszyk Page', () => {
	it('Displays empty cart message', () => {
	  cy.visit('http://localhost:3000/koszyk');
	  cy.contains('h2', 'Nasz koszyk').should('exist');
	  cy.contains('p', 'Koszyk jest pusty').should('exist');
	});
  });