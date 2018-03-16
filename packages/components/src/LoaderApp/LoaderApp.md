This is a set of tools and component to build your application loader

# How to use

1. In your webpack config import Loader/App and define the icon

```javascript
const Loader = require('@talend/react-components/lib/Loader/App').default;
const ICON = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR......')`;
`;
```

2. Expose through the HtmlWebpackPlugin the following variables:

```javascript
plugins: [
    ...
    new HtmlWebpackPlugin({
        ...
        loader_style: Loader.getLoaderStyle(ICON),
        loader: Loader.LOADER_APP,
    }),
    ...
]
```


3. Update your page template to use them:

```html
<html>
    ...
    <style>${ htmlWebpackPlugin.options.loader_style }</style>
    ...
    </head>
    <body>
        ...
        <div id="app">
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
        return <Loader.App />;
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
