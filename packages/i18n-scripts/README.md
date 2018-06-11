# @talend/i18n-scripts
Collection of i18n-related scripts

# download-locales
Download-locales will download locales from zip files attached to the Github releases for the current release. This way, if we put the script in `postinstall`, we don't have to wait for locales before publishing ui packages, but we can update them after. Apps that install ui packages using this script will get up-to-date locales when they do yarn install.

Name of zip should be "[package.json name (minus `@talend/`)]-loales.zip"

Add this script in package.json:
```json
"scripts": {
	"postinstall": "download-locales"
}
```
