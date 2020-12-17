# @talend/validation

This packages exposes utils to validate values against specific shapes they should follow (names, emails ...).

## Getting started

Add the library to the dependencies of your project

```javascript
npm i @talend/validation
```

or

```javascript
yarn add @talend/validation
```

Then use the exposed methods/regular expression exposed by the library.

```javascript
import { validEmail, REGEX } from '@talend/validation';

// ...

const isMyValueValidEmail = validEmail(form.email);
const isMyValudValidName = REGEX.NAME.test(form.firstName);
```

## Methods

The library exposes several methods to test values.

- `validFirstName`
- `validLastName`
- `validEmail`
- `validDomain`
- `validPhone`

They all take a single parameter which is the value to test.

To see the extent of accepted/rejected values, please refer to the tests under `./src/methods.test.ts`.
