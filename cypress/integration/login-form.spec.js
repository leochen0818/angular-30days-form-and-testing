// login-form.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('Login Form', () => {

  beforeEach(() => {
    cy.visit('');
  });

  it('have title "Template Driven Forms 實作 ─ 登入"', () => {
    // Arrange
    const title = 'Template Driven Forms 實作 ─ 登入';
    // Assert
    cy.get('h1').should('have.text', title);
  });

  context('When typing the correct account and password', () => {
    it('should can login', () => {
      // Arrange
      const account = 'abc@email.com';
      const password = '12345678';
      // Act
      cy.fillWith(account, password);
      // Assert
      cy.get('button').should('be.enabled');
    });
  });

  context('When typing the incorrect account and the correct password', () => {
    it('should can not login', () => {
      // Arrange
      const account = 'abcdef';
      const password = '12345678';
      // Act
      cy.fillWith(account, password);
      // Assert
      cy.get('button').should('be.disabled');
    });
  });

  context('When typing the correct account and the incorrect password', () => {
    it('should can not login', () => {
      // Arrange
      const account = 'abc@email.com';
      const password = '12345';
      // Act
      cy.fillWith(account, password);
      // Assert
      cy.get('button').should('be.disabled');
    });
  });
});
