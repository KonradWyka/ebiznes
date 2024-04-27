describe('Produkty Page', () => {
	beforeEach(() => {
	  cy.intercept('GET', 'http://localhost:8080/products', {
		statusCode: 200,
		body: [
		  { ID: 1, Name: 'Produkt 1', Price: 10 },
		  { ID: 2, Name: 'Produkt 2', Price: 20 },
		],
	  }).as('getProducts');
	});
  
	it('displays list of products', () => {
	  cy.visit('http://localhost:3000');
	  cy.contains('h2', 'Produkty').should('exist');
	  cy.get('.produkt').should('have.length.greaterThan', 0);
	  cy.wait('@getProducts');
	});
  
	it('displays product details correctly', () => {
	  cy.visit('http://localhost:3000');
	  cy.contains('h2', 'Produkty').should('exist');
	  cy.get('.produkt').should('have.length.greaterThan', 0);
	  cy.get('.produkt').each(($produkt, index) => {
		cy.wrap($produkt)
		  .find('.nazwa')
		  .should('have.text', `Produkt ${index + 1}`);
		cy.wrap($produkt)
		  .find('.cena')
		  .should('have.text', `${(index + 1) * 10} zł`);
	  });
	  cy.wait('@getProducts'); 
	});
  
	it('displays error message on failed data fetch', () => {
	  cy.intercept('GET', 'http://localhost:8080/products', {
		statusCode: 500,
		body: { message: 'Internal server error' },
	  }).as('getProductsError');
  
	  cy.visit('http://localhost:3000');
	  cy.contains('h2', 'Produkty').should('exist');
	  cy.wait('@getProductsError'); 
	});
  });