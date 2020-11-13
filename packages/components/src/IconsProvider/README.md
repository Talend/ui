# IconsProvider

The IconsProvider is a component used to render an svg document
which is the collection of icons ready to use in the App.

It is not a Provider in the sens of [React context](https://reactjs.org/docs/context.html)

## How to use

You should drop it in your App as any React provider

```javascript
import React from 'react';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

export function App(props) {
	return (
		<React.Fragment>
			<IconsProvider>{props.children}</IconsProvider>
		</React.Fragment>
	);
}
```

## Props

| name         | type     | default                      | description                                                                 |
| ------------ | -------- | ---------------------------- | --------------------------------------------------------------------------- |
| bundles      | array    | [ '/all.svg' ]               |
| defaultIcons | object   | DEPRECATED: all talend icons | the default icons provided                                                  |
| icons        | object   | DEPRECATED: {}               | use to add icons to the default ones                                        |
| getIconHref  | function | DEPRECATED: noop             | a function responsible to return a string used as href in svg use attribute |

## How to customize bundles

Bundles are available through ui-scripts in your assets.
By default assets are copied in the root of the webapp. This is why the iconsprovider refer to `/all.svg`.

No panic if you have changed it or want to add another bundle you just have to use the bundles props.

```javascript
<IconsProvider bundles={['/my-custom-assets/all.svg', '/api/my-backend-bundle.svg']}>
	<MyApp />
</IconsProvider>
```

By default UI will switch to bundles so you can see your icons comes fetched by the browser using urls like `core.svg`.
