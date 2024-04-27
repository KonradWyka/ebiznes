describe('App Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should navigate to Produkty page', () => {
    cy.contains('Produkty').click();
    cy.contains('Produkty').should('be.visible');
  });

  it('should navigate to Płatności page', () => {
    cy.contains('Płatności').click();
    cy.contains('Zatwierdź płatność').should('be.visible');
  });

  it('should navigate to Koszyk page', () => {
    cy.contains('Koszyk').click();
    cy.contains('Koszyk jest pusty').should('be.visible'); 
  });

  it('should navigate back to Produkty page', () => {
    cy.contains('Płatności').click();
    cy.go('back'); 
    cy.contains('Produkty').should('be.visible'); 
  });

  it('should navigate forward to Płatności page', () => {
    cy.contains('Płatności').click();
    cy.go('back');
    cy.go('forward'); 
    cy.contains('Zatwierdź płatność').should('be.visible');
  });

  it('should have correct URL after navigating to Płatności page', () => {
    cy.contains('Płatności').click();
    cy.url().should('include', '/platnosci'); 
  });

  it('should navigate to Produkt page when clicking on Produkty link in navbar', () => {
    cy.get('.navbar').contains('Produkty').click();
    cy.url().should('not.include', '/platnosci'); 
  });

  it('should navigate to Płatności page when clicking on Płatności link in navbar', () => {
    cy.get('.navbar').contains('Płatności').click();
    cy.url().should('include', '/platnosci'); 
  });

  it('should navigate to Koszyk page when clicking on Koszyk link in navbar', () => {
    cy.get('.navbar').contains('Koszyk').click();
    cy.url().should('include', '/koszyk'); 
  });
});
