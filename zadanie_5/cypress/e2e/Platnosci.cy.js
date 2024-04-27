describe('Platnosci Page', () => {
	it('Submits payment form', () => {
	  cy.visit('http://localhost:3000/platnosci');
	  cy.contains('h2', 'Płatności').should('exist');
	  cy.get('#imie').type('Jan');
	  cy.get('#nazwisko').type('Kowalski');
	  cy.get('#numerKarty').type('1234567890123456');
	  cy.get('button[type="submit"]').click();
	});
  });