# Talend Storybook doc tools

<hr />

This package holds shared elements used in Storybook (themes) and its docs mode (.mdx files).

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
$> yarn workspace @talend/storybook-docs run start
```

## How to integrate the shared theme in your storybook

In your `.storybook` directory you'll need to edit or create three files:

### manager.js

```js
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import { light } from '@talend/storybook-docs/lib/themes';
import '@talend/storybook-docs/dist/managerStyles.min.css';

addons.setConfig({
	theme: create(light),
});
```

### manager-head.html

```html
<link
	href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap"
	rel="stylesheet"
/>
```

### preview.js

```js
import { addons } from '@storybook/addons';
import '@talend/storybook-docs/dist/globalStyles.min.css';
```

## License

[Apache 2.0](https://github.com/Talend/ui/blob/master/packages/storybook-docs/LICENSE)
