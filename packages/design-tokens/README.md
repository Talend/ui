# Design tokens

Design tokens are the single source of truth to name and store a design decision, distributed so teams can use it across design tools and coding languages.
They are exported from Figma using [Supernova](https://www.supernova.io/).

## Install

```bash
$> yarn add -D @talend/design-tokens
```

## Usage

### Light and dark modes

Light and dark modes are available to hydrate the CSS custom properties

```scss
@import '~@talend/design-tokens/dist/TalendDesignTokens.css';
```

DOM must be adapted accordingly

```html
<body data-theme="light"></body>
```

or, with dark mode enabled,

```html
<body data-theme="dark"></body>
```

### Using SASS

```scss
@use '~@talend/design-tokens/lib/_tokens.scss' as tokens;

.element {
  font: tokens.$coral-paragraph-m-bold;
  color: tokens.$coral-color-neutral-text-inverted;
  background-color: tokens.$coral-color-accent-background-strong;
  border: tokens.$coral-color-accent-border;
  padding: tokens.$coral-size-m tokens.$coral-size-s;
  box-shadow: tokens.$coral-elevation-shadow-m;
}
```

### Using Javascript

```ts
import tokens from '@talend/design-tokens';

document.getElementById('myElement').style = 'color: ${tokens.coralColorNeutralText}';
```
