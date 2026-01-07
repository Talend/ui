# SCSS to CSS Variables Migration Reference

This document maps all Sass variables used in the Talend UI component library to their corresponding CSS variable equivalents.

## Variable Mapping Guide

### Spacing/Padding Variables

| Sass Variable               | CSS Variable                                  | Value |
| --------------------------- | --------------------------------------------- | ----- |
| `$padding-smaller`          | `--talend-bootstrap-padding-smaller`          | 5px   |
| `$padding-small`            | `--talend-bootstrap-padding-small`            | 10px  |
| `$padding-normal`           | `--talend-bootstrap-padding-normal`           | 15px  |
| `$padding-large`            | `--talend-bootstrap-padding-large`            | 20px  |
| `$padding-larger`           | `--talend-bootstrap-padding-larger`           | 30px  |
| `$padding-base-vertical`    | `--talend-bootstrap-padding-base-vertical`    | 6px   |
| `$padding-base-horizontal`  | `--talend-bootstrap-padding-base-horizontal`  | 12px  |
| `$padding-large-vertical`   | `--talend-bootstrap-padding-large-vertical`   | 10px  |
| `$padding-large-horizontal` | `--talend-bootstrap-padding-large-horizontal` | 16px  |
| `$padding-small-vertical`   | `--talend-bootstrap-padding-small-vertical`   | 5px   |
| `$padding-small-horizontal` | `--talend-bootstrap-padding-small-horizontal` | 10px  |
| `$padding-xs-vertical`      | `--talend-bootstrap-padding-xs-vertical`      | 1px   |
| `$padding-xs-horizontal`    | `--talend-bootstrap-padding-xs-horizontal`    | 5px   |

### Typography Variables

| Sass Variable            | CSS Variable                               | Value       |
| ------------------------ | ------------------------------------------ | ----------- |
| `$font-size-base`        | `--talend-bootstrap-font-size-base`        | 14px        |
| `$font-size-large`       | `--talend-bootstrap-font-size-large`       | 18px        |
| `$font-size-small`       | `--talend-bootstrap-font-size-small`       | 12px        |
| `$font-size-h1`          | `--talend-bootstrap-font-size-h1`          | 18px        |
| `$font-size-h2`          | `--talend-bootstrap-font-size-h2`          | 16px        |
| `$font-size-h3`          | `--talend-bootstrap-font-size-h3`          | 14px        |
| `$font-size-h4`          | `--talend-bootstrap-font-size-h4`          | 12px        |
| `$font-size-h5`          | `--talend-bootstrap-font-size-h5`          | 12px        |
| `$font-size-h6`          | `--talend-bootstrap-font-size-h6`          | 12px        |
| `$font-weight-bold`      | `--talend-bootstrap-font-weight-bold`      | 800         |
| `$font-weight-semi-bold` | `--talend-bootstrap-font-weight-semi-bold` | 600         |
| `$font-weight-regular`   | `--talend-bootstrap-font-weight-regular`   | 400         |
| `$line-height-base`      | `--talend-bootstrap-line-height-base`      | 1.428571429 |
| `$line-height-computed`  | `--talend-bootstrap-line-height-computed`  | 20px        |
| `$line-height-large`     | `--talend-bootstrap-line-height-large`     | 1.3333333   |
| `$line-height-small`     | `--talend-bootstrap-line-height-small`     | 1.5         |

### SVG/Icon Sizing

| Sass Variable   | CSS Variable                      | Value   |
| --------------- | --------------------------------- | ------- |
| `$svg-xs-size`  | `--talend-bootstrap-svg-xs-size`  | 0.5rem  |
| `$svg-sm-size`  | `--talend-bootstrap-svg-sm-size`  | 0.75rem |
| `$svg-md-size`  | `--talend-bootstrap-svg-md-size`  | 1rem    |
| `$svg-rg-size`  | `--talend-bootstrap-svg-rg-size`  | 1.25rem |
| `$svg-lg-size`  | `--talend-bootstrap-svg-lg-size`  | 1.5rem  |
| `$svg-xlg-size` | `--talend-bootstrap-svg-xlg-size` | 2rem    |

### Border & Radius

| Sass Variable          | CSS Variable                             | Value |
| ---------------------- | ---------------------------------------- | ----- |
| `$border-radius-base`  | `--talend-bootstrap-border-radius-base`  | 4px   |
| `$border-radius-large` | `--talend-bootstrap-border-radius-large` | 6px   |
| `$border-radius-small` | `--talend-bootstrap-border-radius-small` | 3px   |

### Color Variables

| Sass Variable   | CSS Variable                      | Value   |
| --------------- | --------------------------------- | ------- |
| `$gray-base`    | `--talend-bootstrap-gray-base`    | #000    |
| `$gray-darker`  | `--talend-bootstrap-gray-darker`  | #222    |
| `$gray-dark`    | `--talend-bootstrap-gray-dark`    | #333    |
| `$gray`         | `--talend-bootstrap-gray`         | #555    |
| `$gray-light`   | `--talend-bootstrap-gray-light`   | #777    |
| `$gray-lighter` | `--talend-bootstrap-gray-lighter` | #bfbfbf |
| `$body-bg`      | `--talend-bootstrap-body-bg`      | #fff    |
| `$text-color`   | `--talend-bootstrap-text-color`   | #333    |

### Form & Input Variables

| Sass Variable              | CSS Variable                                 | Value   |
| -------------------------- | -------------------------------------------- | ------- |
| `$input-bg`                | `--talend-bootstrap-input-bg`                | #fff    |
| `$input-bg-disabled`       | `--talend-bootstrap-input-bg-disabled`       | #bfbfbf |
| `$input-color`             | `--talend-bootstrap-input-color`             | #555    |
| `$input-border`            | `--talend-bootstrap-input-border`            | #ccc    |
| `$input-border-focus`      | `--talend-bootstrap-input-border-focus`      | #66afe9 |
| `$input-color-placeholder` | `--talend-bootstrap-input-color-placeholder` | #999    |

### Breakpoint Variables

| Sass Variable    | CSS Variable                       | Value  |
| ---------------- | ---------------------------------- | ------ |
| `$screen-xs`     | `--talend-bootstrap-screen-xs`     | 480px  |
| `$screen-xs-min` | `--talend-bootstrap-screen-xs-min` | 480px  |
| `$screen-xs-max` | `--talend-bootstrap-screen-xs-max` | 767px  |
| `$screen-sm`     | `--talend-bootstrap-screen-sm`     | 768px  |
| `$screen-sm-min` | `--talend-bootstrap-screen-sm-min` | 768px  |
| `$screen-sm-max` | `--talend-bootstrap-screen-sm-max` | 991px  |
| `$screen-md`     | `--talend-bootstrap-screen-md`     | 992px  |
| `$screen-md-min` | `--talend-bootstrap-screen-md-min` | 992px  |
| `$screen-md-max` | `--talend-bootstrap-screen-md-max` | 1199px |
| `$screen-lg`     | `--talend-bootstrap-screen-lg`     | 1200px |
| `$screen-lg-min` | `--talend-bootstrap-screen-lg-min` | 1200px |

### Z-Index Variables

| Sass Variable              | CSS Variable                                 | Value |
| -------------------------- | -------------------------------------------- | ----- |
| `$zindex-navbar`           | `--talend-bootstrap-zindex-navbar`           | 0     |
| `$zindex-dropdown`         | `--talend-bootstrap-zindex-dropdown`         | 8     |
| `$zindex-navbar-fixed`     | `--talend-bootstrap-zindex-navbar-fixed`     | 4     |
| `$zindex-modal-background` | `--talend-bootstrap-zindex-modal-background` | 4     |
| `$zindex-modal`            | `--talend-bootstrap-zindex-modal`            | 4     |
| `$zindex-popover`          | `--talend-bootstrap-zindex-popover`          | 8     |
| `$zindex-tooltip`          | `--talend-bootstrap-zindex-tooltip`          | 16    |

## Migration Examples

### SCSS (Before)

```scss
@use '@talend/bootstrap-theme/src/theme/guidelines' as *;

.tc-tab-bar-item-icon {
	margin-right: $padding-smaller;
	width: $svg-sm-size;
	height: $svg-sm-size;
	font-size: $svg-sm-size;
}

:global(.dropdown) + :global(.tab-content) {
	padding-top: $padding-large;
}
```

### CSS (After)

```css
/* Import CSS variables from theme package */
@import '@talend/bootstrap-theme/src/variables.css';

.tc-tab-bar-item-icon {
	margin-right: var(--talend-bootstrap-padding-smaller);
	width: var(--talend-bootstrap-svg-sm-size);
	height: var(--talend-bootstrap-svg-sm-size);
	font-size: var(--talend-bootstrap-svg-sm-size);
}

:global(.dropdown) + :global(.tab-content) {
	padding-top: var(--talend-bootstrap-padding-large);
}
```

## Usage Notes

1. **Naming Convention**: All CSS variables follow the `--talend-bootstrap-*` prefix to avoid conflicts with design-tokens (`--coral-*`) variables.

2. **File Import**: CSS modules should import the variables.css file from the theme package:

   ```css
   @import '@talend/bootstrap-theme/src/variables.css';
   ```

3. **Variable Access**: Use `var(--talend-bootstrap-variable-name)` to access CSS variables in CSS files.

4. **No Sass Features**: CSS variables cannot use Sass functions like `lighten()`, `darken()`, etc. These values are pre-computed and included as hex colors or calculated pixel values.

5. **Fallback Values**: For better compatibility, consider adding fallback values:
   ```css
   padding: var(--talend-bootstrap-padding-smaller, 5px);
   ```

## Complete Variable List Location

All CSS variables are defined in: `/packages/theme/src/variables.css`

## Conversion Checklist

When converting a .module.scss file to .module.css:

- [ ] Remove `@use` imports from bootstrap-theme/src/theme/guidelines
- [ ] Add `@import` of variables.css at the top
- [ ] Replace all `$variable-name` with `var(--talend-bootstrap-variable-name)`
- [ ] Remove Sass-specific features (nesting with `&`, mixins, functions)
- [ ] Convert SCSS nesting to flat CSS selectors
- [ ] Rename file from `.module.scss` to `.module.css`
- [ ] Test visual rendering to ensure no regressions
- [ ] Update any documentation or imports in component files
