// Login Test by enter page get all elements
// Then click on login button and check if the user is go to google login page

describe('Login Test', () => {
  it('Login Test PC', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('button').contains('Continue with Google').click();
    cy.wait(3000); // wait for 5 seconds to ensure the page loads
    //
    cy.origin('https://accounts.google.com', () => {
      cy.url().should('include', 'accounts.google.com');
    });
    cy.visit('http://localhost:3000/');
    cy.setCookie('ssid', 'd4d749b3-8d05-4758-8033-75ac2fe519fd', {
      expiry: 1762948257402,
    });
  });

  it('Login Test Mobile', () => {
    cy.viewport(375, 667);
    cy.visit('http://localhost:3000/login');
    cy.get('button').contains('Continue with Google').click();
    cy.wait(3000); // wait for 5 seconds to ensure the page loads
    //
    cy.origin('https://accounts.google.com', () => {
      cy.url().should('include', 'accounts.google.com');
    });
    cy.visit('http://localhost:3000/');
    cy.setCookie('ssid', 'd4d749b3-8d05-4758-8033-75ac2fe519fd', {
      expiry: 1762948257402,
    });
  });
});
