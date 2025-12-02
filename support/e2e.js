// Prevent third-party script errors (e.g., maps) from failing the run
Cypress.on('uncaught:exception', () => false);
