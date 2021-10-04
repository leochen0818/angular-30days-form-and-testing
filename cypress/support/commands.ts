// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
declare namespace Cypress {
  interface Chainable {
    // 這裡面擺放的是自訂 Command 的宣告
    // 例如：
    fillWith(account: string, password: string): Chainable<string>
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('fillWith', (account, password) => {
  cy.get('#account').type(account);
  cy.get('#password').type(password);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
