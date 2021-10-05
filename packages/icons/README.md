# Talend Icons

This is the set of SVG icons used in our apps.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]

[npm-icon]: https://nodei.co/npm/talend-icons.svg?downloads=true
[npm-url]: https://npmjs.org/package/@talend/icons
[travis-ci-image]: https://travis-ci.org/Talend/icons.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/icons
[dependencies-image]: https://david-dm.org/Talend/icons.svg
[dependencies-url]: https://david-dm.org/Talend/icons
[devdependencies-image]: https://david-dm.org/Talend/icons/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/icons#info=devDependencies
[peerdependencies-image]: https://david-dm.org/Talend/icons/peer-status.svg
[peerdependencies-url]: https://david-dm.org/Talend/icons?type=peer
[quality-badge]: http://npm.packagequality.com/shield/talend-icons.svg
[quality-url]: http://packagequality.com/#?package=talend-icons


# How to use

To use this icon set you just have to install it through NPM.

```shell
npm install @talend/icons
```

Next you can get the icon set object through a simple require:

```javascript
const icons = require('@talend/icons').default;
const addIcon = icons.svgs['add'];
```

This icon set is registred within [@talend/react-components](https://github.com/Talend/ui/tree/master/packages/components) Icon. So you can use it through this addon.

```javascript
import React from 'react';
import { Icon } from '@talend/react-components';
function MyComponent() {
	return <Icon name="talend-add" />;
}
```

# How to contribute

Please be sure you have read our guidelines.

Create a Pull Request and be smart.

# How to add an icon

Just add the icon svg file inside the `src/svg` folder.

On the name of the icon we are following same rule as [fontawesome project](http://fontawesome.io/icons/).

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

## Use shape element whenever its possible

polygon, circles, ellipse should be used instead of path.

## No display="none" elements

those are useless as they can't be styled and only add size to icons

# How to test in local

```
yarn docs
cd docs
# use your command-line http server to provide the content
http-server
```

# How to build in local

```
# go the UI root
cd ../..
yarn build-icons
# this builds the new icons and build components with this new icons and launch the unit test
```

# Interaction with backend product

The icons module produces the icons as jars:

* `org.talend.ui:talend-icon:${talend-ui.version}:jar:api`: Talend Component Kit API extension for internal icons.
* `org.talend.ui:talend-icon:${talend-ui.version}:jar:svg`: the SVG icons.
* `org.talend.ui:talend-icon:${talend-ui.version}:jar:png`: the icons as PNG (for the Studio).

You can ensure the jar is ready to be released using the following command - you must have maven installed:

    npm run prepare-jar
