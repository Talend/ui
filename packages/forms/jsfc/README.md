# JSON Schema Form Core
[![Gitter](https://img.shields.io/badge/GITTER-JOIN%20CHAT%20%E2%86%92-ff69b4.svg?style=flat-square)](https://gitter.im/json-schema-form/angular-schema-form?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/json-schema-form/json-schema-form-core.svg?branch=development)](https://travis-ci.org/json-schema-form/json-schema-form-core)

Core library for working with JSON-Schema with a UI-Schema (Form) definition that doesn't depend on a framework.

This library, through the use of its merge module, combines the schema and ui-schema
into a canonical schema for use by its services and external libraries.

You **DO NOT** use this file in addition to Angular Schema Form, it is embedded at
build into any frameworks using it.

## Work-In-Progress!
There is [test output](docs/test.md) that forms some super basic documentation
and I intend to expand them much further to the point of almost being
useful before I create a proper API and document that.

## Keeping Track
After changing to Webpack 2, this library now includes a detailed version
header which is passed through into `Angular Schema Form` and also the `Bootstrap` decorator bundle

```javascript
/*!
 * json-schema-form-core
 * @version 1.0.0-alpha.5
 * @date Sat, 14 Jan 2017 08:08:15 GMT
 * @link https://github.com/json-schema-form/json-schema-form-core
 * @license MIT
 * Copyright (c) 2014-2017 JSON Schema Form
 */
```

## Contributing / Plans
The main contributions we need to the core at the moment are related to both the migration
of `Angular Schema Form` features to the core (like templates/builders) and the addition
of an API for use by ASF (Angular) and RSF (React) libraries.

Please contact @Anthropic via our [Gitter](https://gitter.im/json-schema-form/angular-schema-form) if you wish to get involved.

## Testing it

### With Angular Schema Form
There is a branch in angular-schema-form called `feature/webpack-babel` that integrates the core.
To use it roughly follow these steps:

* Clone angular-schema-form to a **sibling** directory and switch to branch `feature/webpack-babel`
* `npm install` to install dependencies
* `npm run build` to build with the core.
* Use dist/angular-schema-form.js, now with the core from this folder. *No need to also load ObjectPath since it is already included*

### With Mocha tests
Tests are written in mocha + chai and run trough `npm test`.

When the command `npm run testdoc` is run instead, the tests will also generate a readable
`markdown` file [test.md](docs/test.md) to document elements of the library.

## Notes
* ObjectPath is bundled with json-schema-form-core
* angular-schema-form bundles json-schema-form-core so the user doesn't have to include it as an dependency.
* The code for not using ObjectPath on Angular 1.2 is removed. Could maybe be fixed but I (davidlgj) strongly believe its time to drop Angular 1.2 support since it complicates validation code as well.
