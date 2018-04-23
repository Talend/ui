# CMF Scripts

CMF provides a script `cmf-settings` to:
* merge settings from a folder to a single minified file ready to be fetch
* extract and update translations in the settings

After the install of cmf, the script `cmf-settings` is installed on your *node_modules/.bin* folder.

## Configuration

Create in your project folder a file `cmf.json` at the same level as the *package.json*.
Here is an example of configuration

```json
{
	"settings": {
		"sources": [
			"node_modules/package1/settings",
			"node_modules/package2/settings",
			"src/settings"
		],
		"i18n":{
			"languages": ["en", "fr", "ja"],
			"namespace-paths": [
				{"name": "app-cmf", "path": "src/app/locales/{{namespace}}/{{locale}}.json"},
				{"name": "package1-cmf", "path": "node_modules/package1/lib/app/locales/{{namespace}}/{{locale}}.json"},
				{"name": "package2-cmf", "path": "node_modules/package2/lib/app/locales/{{namespace}}/{{locale}}.json"}
			],
			"extract-namespaces": ["app-cmf"],
			"extract-from": "src/settings"
		},
		"destination": "src/assets/settings.json"
	}
}
```

Namespace

| property  | description  | type  |
|---|---|---|
| name | name of the namepace  | name |
| path | pattern to find the locale  | string |

I18NConfiguration

| property  | description  | type  |
|---|---|---|
| languages | languages handle by your application  | array |
| namespace-paths | path of the namespace used to build the i18next ressource  | array<Namespace> |
| extract-namespaces | set the namespace to extract the keys/values  | array |
| extract-from | indicate the folder to extract the keys/values  | string |

| property  | description  | type  |
|---|---|---|
| sources  | defines all path to merge  | array |
| destination  | destination for the merged settings  | string |
| i18n | defined the configuration to i18n the settings  | I18NConfiguration |


The i18n settings are merged to the destination property with the language.
e.g. For the destination "src/assets/settings.json", each translated settings will be created like "src/assets/settings.{{language}}.json"

## Usage

launch the command below to build your webapp. you can add it into `prepublish` npm script.

```
yarn cmf-settings
```

Note: If you add `node_modules/.bin` into your env *PATH* you can directly type `cmf-settings`.
