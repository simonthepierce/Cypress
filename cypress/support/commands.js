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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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

import LoginPage from "../e2e/pages/LoginPage";
import RegisterPage from "../e2e/pages/RegisterPage";
import users from "../fixtures/UI/users";
Cypress.Commands.add("login", () => {
  LoginPage.loginWithUI(users.validUser.email, users.validUser.password);
});

Cypress.Commands.add("validateFormField", (inputField, message) => {
  return inputField
    .then(($input) => RegisterPage.inputValidationErr($input))
    .should("be.visible")
    .and("have.text", message);
});

Cypress.Commands.add("uiFixture", (fixtureName) => {
  cy.fixture(`UI/${fixtureName}`).then((data) => {
    return data;
  });
});

Cypress.Commands.add("apiFixture", (fixtureName) => {
  cy.fixture(`API/${fixtureName}`).then((data) => {
    return data;
  });
});
