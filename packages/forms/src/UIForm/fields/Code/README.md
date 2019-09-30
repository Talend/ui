# Code

This widget allows you to render an ace-editor within a form.

**Json Schema**

| Property | Description |
|---|---|
| type | `string` |

```json
{
  "type": "object",
  "title": "Code form",
  "properties": {
    "myPythonCode": {
      "type": "string"
    }
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| autoFocus | Focus on input on render | `false` |
| disabled | Disable the input | `false` |
| options | Object that is spread as [react-ace props](https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md). |  |
| readOnly | Set the input as non modifiable | `false` |
| title | The title to display above editor |  |
| widget | `code` | `code` |

```json
[
  {
    "key": "myPythonCode",
    "widget": "code",
    "title": "Last name",
    "autoFocus": false,
    "disabled": false,
    "readOnly": false,
    "options": {
      "language": "python",
      "height": "200px"
    }
  }
]
```

**Result**

![Code](screenshot.gif)

## Webpack

To integrate it properly you should do the following into your webpack configuration.

```javascript
const form = require('@talend/react-forms/webpack');

module.exports = {
	// ... your current config
	plugins: [].concat(
    // ... your plugins
    form.plugins,
  ),
};
```

We need that to let ace fetch its own plugin.
To better understand why what happens you can read the source: https://github.com/thlorenz/brace/blob/master/index.js#L4115
