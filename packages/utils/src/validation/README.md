# @talend/utils - Validation utlis

## Usage

Those utils are useful to validate values against specific shapes they should follow (names, emails ...).

To use validation those utils, simply import them:

```javascript
import { validation } from '@talend/utils';

// ...

function checkFormValues(form) {
  const isMyValueValidEmail = validation.validEmail(form.email);
  const isMyValueValidName = validation.REGEX.NAME.test(form.firstName);
}
```

## Methods

The library exposes several methods to test values.

- `validFirstName`
- `validLastName`
- `validEmail`
- `validDomain`
- `validPhone`

They all take a single parameter which is the value to test.

To see the extent of accepted/rejected values, please refer to the tests under [`methods.test.ts`](./methods.test.ts).
