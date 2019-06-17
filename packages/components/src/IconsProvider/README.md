# IconsProvider

The IconsProvider is a component used to render an svg document
which is the collection of icons ready to use in the App.

It is not a Provider in the sens of [React context](https://reactjs.org/docs/context.html)

## How to use

You should drop it in your App without any children

```javascript
import React from 'react';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

export function App(props) {
    return (
        <React.Fragment>
            <IconsProvider />
            {props.children}
        </React.Fragment>
    );
}
```

## Props

| name | type | default | description |
| -- | -- | -- | -- |
| defaultIcons | object | all talend icons | the default icons provided |
| icons | object | {} | use to add icons to the default ones |
| getIconHref | function| noop | a function responsible to return a string used as href in svg use attribute |


## getIconHref or How to activate bundles

Bundles are available through a feature flag at compile time.
If you want to tests, add the following plugin to your webpack config:

```javascript
    plugins = [
        ...
		new webpack.DefinePlugin({
			'process.env.ICON_BUNDLE': JSON.stringify(process.env.ICON_BUNDLE),
		}),
    ];
```

So you can build with or without it:

    ICON_BUNDLE=true yarn start

By default UI will switch to bundles so you can see your icons comes fetched by the browser using urls like `core.svg`.

If you want your app to serve extra icons you just need to define a getIconHref function.

```javascript
function getIconHREF(name) {
    if (MY_APP_ICONS.indexOf(name) !== -1) {
        return `my-app-icons.svg#${name}`;
    }
}
function MyApp(props) {
    //...
    <IconsProvider getIconHREF={getIconHREF} />
    //...
}
```

Once it is ok for you you can just drop the variable from the process:

```javascript
    plugins = [
        ...
		new webpack.DefinePlugin({
			'process.env.ICON_BUNDLE': "true",
		}),
    ];
```

## Roadmap

Bundle will become the default behavior.
