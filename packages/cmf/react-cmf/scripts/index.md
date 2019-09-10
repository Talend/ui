# CMF scripts

## Usage

launch the command below to build your webapp. you can add it into `prepublish` npm script.

```
yarn cmf-settings
```

Note: If you add `node_modules/.bin` into your env _PATH_ you can directly type `cmf-settings`.

## cmf-settings

This script merge a set of settings `sources` into a `destination` file.
Each sources is a path to eiter a folder or a file.
The destination is minified.

It require a `cmf.json` file with this format in your webapp's project root:

After the install of `@talend/react-cmf`, the script `cmf-settings` is installed on your _node_modules/.bin_ folder.

### Options

Options for this script:

* -d to use sources-dev instead of sources
* -q to run the script in quiet mode
* -r to run the json search recursive

### Configuration in cmf.json file

Create in your project folder a file `cmf.json` at the same level as the _package.json_.
Here is an example of configuration

```json
{
	"settings": {
		"sources": [
			"src/settings",
			"node_modules/@talend/dataset/lib/settings",
			"node_modules/@talend/myOtherDep/lib/file.json"
		],
		"sources-dev": [
			"src/settings",
			"../../dataset/webapp/src/settings",
			"../../myOtherDep/lib/file.json"
		],
		"destination": "src/assets/cmf-settings.json"
	}
}
```

| property    | description                              | type   |
| ----------- | ---------------------------------------- | ------ |
| sources     | defines all path to merge                | array  |
| sources-dev | defines all path to merge with -d option | array  |
| destination | destination for the merged settings      | string |

### i18next

The configuration support translations using [i18next](https://www.i18next.com/).
It will extract all object with a i18n attribute

```json
{
	"settings": {
		//...usual +
		"i18n": {
			"languages": ["en", "fr", "ja"],
			"namespace-paths": [
				{ "name": "app-cmf", "path": "src/assets/locales/{{namespace}}/{{locale}}.json" },
				{
					"name": "package1-cmf",
					"path": "node_modules/package1/locales/{{namespace}}/{{locale}}.json"
				},
				{
					"name": "package2-cmf",
					"path": "node_modules/package2/locales/{{namespace}}/{{locale}}.json"
				}
			],
			"extract-namespaces": ["app-cmf"],
			"extract-from": ["src/settings"],
			"extract-sort": true
		},
		"destination": "src/assets/settings.json"
	}
}
```

The i18n settings are merged to the destination property with the language.
e.g. For the destination "src/assets/settings.json", each translated settings will be created like "src/assets/settings.{{language}}.json"

| property  | description  | type  |
|---|---|---|
| languages | languages handle by your application  | array |
| namespace-paths | path of the namespace used to build the i18next ressource  | array<Namespace> |
| extract-namespaces | set the namespace to extract the keys/values  | array |
| extract-from | indicate the folder to extract the keys/values  | array |
| extract-sort | indicate if the keys are sorted (default: true) | boolean |

**Namespace definition**

| property  | description  | type  |
|---|---|---|
| name | name of the namepace  | name |
| path | pattern to find the locale  | string |

### Exemple of settings with translation

```
 {
	label: {
		i18n: {
			key: 'myNamespace:KEY1',
			options: {
				defaultValue: 'foo',
			},
		},
	},
	message: {
		i18n: {
			key: 'otherNamespace:KEY2',
			options: {
				defaultValue: 'bar',
			},
		},
	}
 }
```

Warning : if the namespace is not define in the settings files or if it is not define in the config file the key will not be extracted

### Multiple settings
If you need to use multiple settings in one project you can do so with an environment variable `CMF_ENV`.

`$ cross-env CMF_ENV=withoutMyOtherDep cmf-settings`

```jsonc
{
	// will not be used
	"settings": {
		"sources": [
			"src/settings",
			"node_modules/@talend/dataset/lib/settings",
			"node_modules/@talend/myOtherDep/lib/file.json"
		],
		"sources-dev": [
			"src/settings",
			"../../dataset/webapp/src/settings",
			"../../myOtherDep/lib/file.json"
		],
		"destination": "src/assets/cmf-settings.json"
	},
	"withoutMyOtherDep": {
		// will be used
		"settings": {
			"sources": [
				"src/settings",
				"node_modules/@talend/dataset/lib/settings"
			],
			"sources-dev": [
				"src/settings",
				"../../dataset/webapp/src/settings"
			],
			"destination": "src/assets/cmf-settings.json"
		}
	}
}
```
