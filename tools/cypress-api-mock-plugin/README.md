# @talend/cypress-api-mock-plugin

This Cypress plugin allows to mock any http request via HAR files.

It has 2 modes:
- record http requests into HAR (HTTP Archive) files
- mock http requests from HAR files

## Installation

```
npm install --save-dev @talend/cypress-api-mock-plugin

// or

yarn add -D @talend/cypress-api-mock-plugin
```

Edit your `cypress/plugins/index.js`

```javascript
const { installApiMock, ensureBrowserFlags } = require('@talend/cypress-api-mock-plugin');

module.exports = async (on, config) => {
    installApiMock(on, config);

	on('before:browser:launch', (browser = {}, launchOptions) => {
		ensureBrowserFlags(browser, launchOptions);
		return launchOptions;
	});
}
```

Edit your `cypress/support/commands.js`

```javascript
import { installApiMockCommands } from '@talend/cypress-api-mock-plugin/commands';

installApiMockCommands();
```

## Usage

In each spec files you want to record/mock the hhtp requests, add a before/after call.

```javascript
describe('my spec', () => {
    before(() => {
		cy.beforeApiMock();
	});

	after(() => {
		cy.afterApiMock();
	});
});
```

## Run

To record the requests, you can pass a `record-api` environment variable.  
Under the hood, the plugin uses `@neuralegion/cypress-har-generator` that needs to run on chrome.

```bash
cypress run --browser chrome --headless --env record-api=true
```

Once you have the api mock har files, to run the tests with the api mock:

```bash
cypress run
```
