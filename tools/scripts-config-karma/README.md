# Karma config customisation

To run angular tests via karma, you need to create a `spec.bundle.js` in your project root.
It must include everything that Karma needs to load to run your tests.

Example
```javascript
import '@babel/polyfill';

// load the app files
import './src/app';

import 'angular-mocks';

// load tests files
const context = require.context('./src', true, /\.spec\.js/);
context.keys().forEach(context);
```
