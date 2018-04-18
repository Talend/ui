# CMF Scripts

CMF provides a script to build:
* the settings from a lot of settings,
* i18n the settings

After the install of cmf, the binary cmf-settings is installed on your system

## Configuration

Create on your own project a file "cmf.json"

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
			"namepace-paths": {
				"app-cmf": "src/app/locales/{{namespace}}/{{locale}}.json",
				"package1-cmf": "node_modules/package1/lib/app/locales/{{namespace}}/{{locale}}.json",
				"package2-cmf": "node_modules/package2/lib/app/locales/{{namespace}}/{{locale}}.json"
			},
			"extract-namepaces": ["app-cmf"],
			"from": "src/settings"
		},
		"destination": "src/assets/settings.json"
	}
}
```

| property  | description  | type  |
|---|---|---|
| sources  | defines all path to merge  | array |
| destination  | destination for the merged settings  | string |
| i18n | defined the configuration to i18n the settings  | I18NConfiguration |

I18NConfiguration

| property  | description  | type  |
|---|---|---|
| languages | languages handle by your application  | I18NConfiguration |
| namepace-paths | path of the namespace used to build the i18next ressource  | object |
| extract-namepaces | set the namespace to extract the keys/values  | array |
| extract-from | indicate the folder to extract the keys/values  | string |

The i18n settings are merged to the destination property with the language.
e.g. For the destination "src/assets/settings.json", each translated settings will be created like "src/assets/settings.{{language}}.json"

## Usage

launch the below command
```
cmf-settings
```
