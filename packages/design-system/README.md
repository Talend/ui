![Coral](https://raw.githubusercontent.com/Talend/design-system/master/.storybook/logo.svg)

# Talend Design System

<hr />

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6d66424-7754-4257-bb5e-cc6de2f9d9aa/deploy-status)](https://app.netlify.com/sites/gifted-tesla-96fe2e/deploys)

<hr />

Coral is the design system used to build accessible, consistent, customizable and high quality customer experiences at Talend.

## Getting Started

Clone the repository

```sh
$> git clone git@github.com:Talend/design-system.git
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

### Named exports

Please use named exports and link them at the root index to be embedded into the UMD.

### Mobile-first

Style should be designed for mobile and adapted for tablet and desktop.

### Style as separated files

Use styled-components format.

### Variations

Variations should extend of the basic components in separated files.
Limit changes to styled-components scope.

### End-to-End tests

Prior to end-to-end tests if you want to test interactions in real browsers.

## License

[Apache 2.0](https://github.com/Talend/design-system/blob/master/LICENSE)
