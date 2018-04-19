# CMF scripts

## cmf-settings

This script merge a set of settings `sources` into a `destination` file.
Each sources is a path to eiter a folder or a file.
The destination is minified.

It require a `cmf.json` file with this format in your webapp's project root:

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

Options for this script :

* -d to use dev-sources instead of sources
* -q to run the script in quiet mode
* -r to run the json search recursive
