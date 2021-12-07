#  CSS Modules

[^1]: tl;dr.

## Context

[Styled Components](https://styled-components.com/) are great for managing a design system with several themes or modes.  
They have been chosen because we needed multi-themes support and including IE11 support. So CSS custom properties were not an option.  
We've since dropped the support of IE11. We can challenge that choice.

## Problems

They intertwine styles and components in a way that muddles the component's typings.  
Its `as` property is too permissive for a design system, enabling users to break the intended patterns using any HTML element or React component.  
There is no guarantee about the tokens you use (or not) in your styles.  
You cannot quickly identify which DOM node will be generated because of the exported Styled Components.  
You must precise the `displayName` for each component and their variations

### What do we need

* A styling solution that does not pollute the components' typing  
* A styling solution that handles theming (white-labeling as much as a possible dark theme)  
* A styling solution that easily exploits tokens and variables  
* We must be able consume variables that represent tokens

### What would we like

* Exportable themes-as-variables: our customers (the front-end engineers) mostly use CSS modules with Sass variables in their projects. When the design system doesn't provide everything they need, we should still give them variables accessing the theme.
* Global stylesheets
* Something simple and familiar to use
* No need for displayName

## Solutions

By introducing [expertly crafted web design tokens](#3528), represented by CSS custom properties, we are now able to align the Design System with the rest of the Talend/UI packages.  
By alignment, we are talking about [CSS Modules](https://github.com/css-modules/css-modules).  
We will replace all current Styled Components usages, tracked by JIRA.  
But, starting now[^1], any style update in the Design System package will use CSS modules.  
