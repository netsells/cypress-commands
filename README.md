# Cypress Commands

[![Build Status](https://travis-ci.com/netsells/cypress-commands.svg?token=q7xh97fyLyzswVwqzXje&branch=master)](https://travis-ci.com/netsells/cypress-commands)

Useful commands for testing accessibility issues in Cypress

## Installation

```sh
yarn add --dev @netsells/cypress-commands
```

## Setup

```javascript
const { loadAccessibilityCommands } = require('@netsells/cypress-commands');

loadAccessibilityCommands();
```

## Usage

### checkAccessibility

Assert a pages HTML is accessible using the PayPal AATT

```javascript
// visit a page
cy.visit('/page');
// assert the page has finished loading
cy.contains('Page Title').should('be.visible');
// assert its accessibility
cy.checkAccessibility();
```

### field

Get a field by via its `label`

```javascript
cy.field('Password', field => field.type('Password'));
```
