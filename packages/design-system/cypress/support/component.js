//github.com/cypress-io/cypress-component-testing-apps/blob/main/react-webpack5-js/cypress/support/component.js
// import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

https: import { mount } from 'cypress/react';
// Ensure global styles are loaded
// import '../../src/index.css';

Cypress.Commands.add('mount', mount);
