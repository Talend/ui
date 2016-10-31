# Talend Icons

This is the set of SVG icons used in our apps.

# How to use

To use this icon set you just have to install it through NPM.

```shell
npm install talend-icons
```

Next you can get the icon set object through a simple require:

```javascript
var icons = require('talend-icons').default;
icons.svgs['add'];
<svg ...></svg>
```

This icon set is registred within [react-talend-components](https://github.com/Talend/react-talend-components) Icon. So you can use it through this addon.

```javascript
import React from 'react';
import { Icon } from 'react-talend-components';
function MyComponent() {
	return (<Icon name="talend-add" />);
}
```

# How to contribute

Please be sure you have read our guidelines.

Create a Pull Request and be smart.

# How to add an icon

Just add the icon svg file inside the `src/svg` folder.

# How svg code should look like
## No style embed
Styles are defined outside the svg via CSS

The following code snippet illustrate this error
```
<svg id="cluster" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
	<defs><style>.cls-1{fill:#231f20;}</style></defs><title>cluster</title><path class="cls-1" d="M650,85.5H150L0,435.5v250H800v-250Zm100,550H50v-150H750Z" transform="translate(0 -85.5)"/><rect class="cls-1" x="650" y="450" width="50" height="50"/><rect class="cls-1" x="100" y="450" width="50" height="50"/><rect class="cls-1" x="200" y="450" width="50" height="50"/><rect class="cls-1" x="300" y="450" width="50" height="50"/>
</svg>
```

## All path are closed
Complete icon or parts of icon background color should be defined solely by "fill" css attribute.
To check if a path is closed the "d" attribute of "path" element end with a z
```
<path class="cls-1" d="M650,85.5H150L0,435.5v250H800v-250Zm100,550H50v-150H750Z" transform="translate(0 -85.5)"/>
```

## All class are user defined
All classes set on complete icon or part of icon should be defined by hand and should be meaningfull
```
<g class="screwdriver">
<path class="screwdriver-handle" d="M650,85.5H150L0,435.5v250H800v-250Zm100,550H50v-150H750Z" transform="translate(0 -85.5)"/>
<path class="screwdriver-tip" d="M650,85.5H150L0,435.5v250H800v-250Zm100,550H50v-150H750Z" transform="translate(0 -85.5)"/>
</g>
```
## Use shape elemetn whenever its possible
polygon, circles, ellipse should be used instead of path.

## No display="none" elements
those are useless as they can't be styled and only add size to icons
