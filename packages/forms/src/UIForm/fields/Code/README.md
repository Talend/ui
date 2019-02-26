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
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/**
 * react ace try to fetch resources but name are differents in sources
 * lets create a simple function to transform the name in assets
 */
function transformPath(targetPath) {
	const fn = path.basename(targetPath);
	const type = path.dirname(targetPath).split('/').pop();
	const newPath = [type, fn].join('-');
	return newPath;
}

module.exports = {
	output: {
		chunkFilename: '[name].chunk.js',
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'node_modules/brace/mode/*.js', transformPath }]),
		new CopyWebpackPlugin([{ from: 'node_modules/brace/theme/*.js', transformPath }]),
		new CopyWebpackPlugin([{ from: 'node_modules/brace/snippets', to: 'snippets/' }]),
	],
};
```

To better understand what happens just read the source: https://github.com/thlorenz/brace/blob/master/index.js#L4115
