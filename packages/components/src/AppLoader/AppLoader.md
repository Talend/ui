This is a set of tools and component to build your application loader

# How to use

1. In your webpack config import Loader/App and define the icon

```javascript
const Loader = require('@talend/react-components/lib/AppLoader/constant').default;
const ICON = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR......')`;
```

2. Expose through the HtmlWebpackPlugin the following variables:

```javascript
plugins: [
    ...
    new HtmlWebpackPlugin({
        ...
        loader_style: Loader.getLoaderStyle(ICON),
        loader: Loader.APP_LOADER,
    }),
    ...
]
```


3. Update your page template to use them:

```html
<html>
    ...
    </head>
    <body>
        ...
        <div id="app">
            <style>
                <%= htmlWebpackPlugin.options.loader_style %>
            </style>
            <%= htmlWebpackPlugin.options.loader %>
        </div>
        ...
    </body>
</html>
```

4. Update your React App component:

```javascript
function App(props) {
    if (!props.hasData) {
        return <AppLoader />;
    }
    return (
        <div>
            <IconsProvider />
            <Notification autoLeaveError />
            ...
            {this.props.children || null}
        </div>
    );
}
```
