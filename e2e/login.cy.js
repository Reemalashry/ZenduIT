const selectors = {
  username: '#asset-tracker-login-username',
  password: '#asset-tracker-login-password',
  signInBtn: 'button.btn-login',
};

const expectSnack = (text) =>
  cy.contains('snack-bar-container', text, { matchCase: false, timeout: 8000 }).should('be.visible');

describe('ZenduOne login', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/login', { failOnStatusCode: false });
  });

  it('requires username and password', () => {
    cy.get(selectors.signInBtn).click();
    expectSnack('Username is empty');
  });

  it('shows generic error for invalid credentials', () => {
    cy.get(selectors.username).type('invalid@example.com');
    cy.get(selectors.password).type('wrong-pass');
    cy.get(selectors.signInBtn).click();
    expectSnack('Authenticate failed.');
  });

  it('logs in with valid credentials and establishes session', () => {
    cy.get(selectors.username).type(Cypress.env('username'));
    cy.get(selectors.password).type(Cypress.env('password'), { log: false });
    cy.get(selectors.signInBtn).click();

    cy.location('pathname', { timeout: 30000 }).should('include', '/main');
    cy.url().should('include', '/main/overview/map');

    cy.getCookie('trax_token', { timeout: 20000 }).should((cookie) => {
      expect(cookie).to.exist;
      expect(cookie.value).to.have.length.greaterThan(10);
    });
  });
});
