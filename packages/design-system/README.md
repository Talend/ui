![Coral](https://raw.githubusercontent.com/Talend/design-system/master/.storybook/logo.svg)

# Talend Design System

<hr />

[![cypress](https://github.com/Talend/ui/actions/workflows/design-system-component-testing.yml/badge.svg)](https://github.com/Talend/ui/actions/workflows/design-system-component-testing.yml)
[![chromatic](https://github.com/Talend/ui/actions/workflows/design-system-visual-testing.yml/badge.svg)](https://github.com/Talend/ui/actions/workflows/design-system-visual-testing.yml)
[![netlify](https://github.com/Talend/ui/actions/workflows/design-system-deploy.yml/badge.svg)](https://github.com/Talend/ui/actions/workflows/design-system-deploy.yml)

<hr />

Coral is the design system used to build accessible, consistent, customizable and high quality customer experiences at Talend.

## Getting Started

Clone the repository

```sh
$> git clone git@github.com:Talend/ui.git
```

Install the dependencies

```sh
$> yarn
```

Start Storybook and start editing

```sh
$> yarn start
```

## Contributions

Check our exhaustive [contribution guidelines here](./CONTRIBUTING.md).

Please get to know our [Architecture Decision Records](https://github.com/joelparkerhenderson/architecture-decision-record#what-is-an-architecture-decision-record):

- [Using CSS modules to style our components](./adr/css-modules.md).
- [Use [data-test] attributes for generic automated tests](./adr/css-modules.md).

### Named exports

Please use named exports and link them at the root index to be embedded into the UMD.

### Mobile-first

Style should be designed for mobile and adapted for tablet and desktop.

### Style as separated files

Use CSS modules (`ComponentName.module.scss`) and [BEM](http://getbem.com/introduction/) in your style files.

### Variations

Variations should extend of the basic components in separated files.
Limit changes to styled-components scope.

### End-to-End tests

Visual non-regression testing will be covered by Chromatic.
Use Cypress if you have to perform interaction tests, in real browsers.

To launch non the tests you first need to have cypress installed on your environment. Then you can just execute the corresponding npm scripts:

    yarn workspace @talend/design-system run test:cy

## License

[Apache 2.0](https://github.com/Talend/design-system/blob/master/LICENSE)
