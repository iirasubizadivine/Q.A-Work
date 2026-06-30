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
// ypress.Commands.add('login', (email, password) => {
//   cy.contains('Signup / Login').click();
//   cy.get('[data-qa="login-email"]').type(email);
//   cy.get('[data-qa="login-password"]').type(password);
//   cy.get('[data-qa="login-button"]').click();
// });

// // cypress/support/commands.js

// Cypress.Commands.add('fillAutomationForm', (name, email, phone, address) => {
//   cy.get('#name').type(name);
//   cy.get('#email').type(email);
//   cy.get('#phone').type(phone);
//   cy.get('#textarea').type(address);
// });

// --- Custom Commands for Part N: Mini Project ---

// Cypress.Commands.add('fillAutomationForm', (name, email, phone, address) => {
//   cy.get('#validationCustom01').clear().type(name);
//   cy.get('#validationCustomUsername').clear().type(email);
//   cy.get('#validationCustom05').clear().type(phone);
//   cy.get('#validationCustom03').clear().type(address);
// });
// // --- Custom Commands for Part N: Mini Project ---

// // --- Custom Commands for Part N: Mini Project ---

// Cypress.Commands.add('fillAutomationForm', (name, phone) => {
//   // Finds the first input field (Contact Name) and types into it
//   cy.get('input').eq(0).clear().type(name);
  
//   // Finds the second input field (Contact Number) and types into it
//   cy.get('input').eq(1).clear().type(phone);
// });

// // --- Custom Commands for Part N: Mini Project ---

// Cypress.Commands.add('fillAutomationForm', (username, password) => {
//   cy.get('#username').clear().type(username);
//   cy.get('#password').clear().type(password);
// });

// // --- Custom Commands for Part N: Mini Project ---
// Cypress.Commands.add('fillAutomationForm', (username, password) => {
//   cy.get('#username').clear().type(username);
//   cy.get('#password').clear().type(password);
// });

// ========================================================
// Custom Commands for Part N: Mini Project
// ========================================================

// Reusable command to handle login inputs securely
Cypress.Commands.add('fillAutomationForm', (username, password) => {
  cy.get('#username').clear().type(username);
  cy.get('#password').clear().type(password);
});
