# Custom Exporter for Talend


## SCSS

The SCSS Exporter exports a theme into SCSS variables.

It outputs variables prefaced with `$coral` and contains references to CSS custom properties hydrated with CSS files extracted elsewhere.

```scss
$coral-color-neutral-text: var(--coral-color-neutral-text, hsla(0,0%,13%,1));
$coral-color-neutral-text-weak: var(--coral-color-neutral-text-weak, hsla(0,0%,42%,1));
$coral-color-neutral-text-disabled: var(--coral-color-neutral-text-disabled, hsla(0,0%,55%,1));
$coral-color-neutral-text-inverted: var(--coral-color-neutral-text-inverted, hsla(0,0%,100%,1));
$coral-color-neutral-background: var(--coral-color-neutral-background, hsla(0,0%,100%,1));
$coral-color-neutral-background-medium: var(--coral-color-neutral-background-medium, hsla(0,0%,97%,1));
$coral-color-neutral-background-strong: var(--coral-color-neutral-background-strong, hsla(0,0%,91%,1));
$coral-color-neutral-background-disabled: var(--coral-color-neutral-background-disabled, hsla(0,0%,97%,1));
$coral-color-neutral-border: var(--coral-color-neutral-border, hsla(0,0%,42%,1));
$coral-color-neutral-border-weak: var(--coral-color-neutral-border-weak, hsla(0,0%,91%,1));
$coral-color-neutral-border-hover: var(--coral-color-neutral-border-hover, hsla(0,0%,13%,1));
...
```

## CSS

The CSS Exporter allows you to **produce a list of CSS definitions in a SCSS file**.

This extractor has two customizations:

- Colors are extracted as HSLA values
- The extracted CSS stylesheets use the `[data-theme="nameOfTheTheme"]` selector.

```css
[data-theme="dark"] {
    --coral-color-neutral-text: hsla(0,0%,100%,1);
    --coral-color-neutral-text-inverted: hsla(210,7%,79%,1);
    --coral-color-neutral-text-weak: hsla(206,17%,82%,1);
    --coral-color-neutral-text-disabled: hsla(207,11%,64%,1);
    --coral-color-neutral-background: hsla(207,18%,24%,1);
    --coral-color-neutral-background-disabled: hsla(210,17%,16%,1);
    --coral-color-neutral-background-medium: hsla(208,18%,21%,1);
    ...
```

## TS

The TS Exporter outputs two files.

An `index.ts` exporting a single `tokens` object listing all the available tokens and their values:

```ts
const tokens = {
  coralColorNeutralText: `var(--coral-color-neutral-text, hsla(0,0%,13%,1))`,
  coralColorNeutralTextWeak: `var(--coral-color-neutral-text-weak, hsla(0,0%,42%,1))`,
  coralColorNeutralTextDisabled: `var(--coral-color-neutral-text-disabled, hsla(0,0%,55%,1))`,
  coralColorNeutralTextInverted: `var(--coral-color-neutral-text-inverted, hsla(0,0%,100%,1))`,
  coralColorNeutralBackground: `var(--coral-color-neutral-background, hsla(0,0%,100%,1))`,
  coralColorNeutralBackgroundMedium: `var(--coral-color-neutral-background-medium, hsla(0,0%,97%,1))`,
  coralColorNeutralBackgroundStrong: `var(--coral-color-neutral-background-strong, hsla(0,0%,91%,1))`,
  ...
};
```

And a `dictionary.ts` exporting a single `dictionary` array listing a detailed view of all available tokens:

```ts
const dictionary = [
    {
        name: 'coralColorNeutralText',
        type: 'Color',
        description: `Default text color`,
        hsla: 'hsla(0,0%,13%,1)',
        hex: '#202020',
        value: 'hsla(0,0%,13%,1)',
    },
    {
        name: 'coralColorNeutralTextWeak',
        type: 'Color',
        description: ``,
        hsla: 'hsla(0,0%,42%,1)',
        hex: '#6b6b6b',
        value: 'hsla(0,0%,42%,1)',
    },
   ...
];
```
