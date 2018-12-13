# Talend i18n scripts

<img src="./process.png">

The i18n process has multiple steps

1- Extract and upload

2- Translation within the cloud system

3- Download and versionning to github

4- Download translated files to the bundle


The talend-i18n module targets steps 1 - 2 - 3.

# Installation

```shell
yarn global install @talend/scripts
```

or

```shell
npm install -g @talend/scripts
```

Now the cli `talend-scripts` is available.

# Actions

There are 3 actions you can perform

```shell
talend-scripts i18n-extract
talend-scripts i18n-upload
talend-scripts i18n-download
```

Each action is based on a configuration file, located in the project folder `./talend-i18n.json`.

# Configuration

## Extract

This step will extract the i18n files from the project and create a zip.

There are 3 methods of extraction
- npm : run an npm script
- yarn : same as npm but with yarn
- files : get the files from a list of path

*Npm/Yarn*

```json
{
  "extract": {
    "method": "npm",
    "script": "extract-i18n",
    "target": "./i18n"
  }
}
```

| Configuration | Description |
|---|---|
| method | `npm` or `yarn` |
| script | The npm script name |
| target | The folder where the npm script will gather the translation files. This is used to create the zip file. |


*Files*

```json
{
  "extract": {
    "method": "files",
    "files": ["./src/i18n/translation.json", "./src/app/other.json"],
    "target": "./i18n"
  }
}
```

| Configuration | Description |
|---|---|
| method | `npm` or `yarn` |
| files | The list of files to extract. |
| target | The folder where the script will gather the translation files. This is used to create the zip file. Note that the files folder hierarchy is preserved.  |


## Upload/Download

You need to pass xtm information as environment variables

```shell
> API_URL=https://XXX \
  CLIENT=YYY \
  CUSTOMER_ID=ZZZ \
  USER_ID=AAA \
  PASSWORD=BBB \
  talend-i18n <upload|download>
```

| Variable | Description |
|---|---|
| API_URL | The XTM api url |
| CLIENT | The XTM client name |
| CUSTOMER_ID | The XTM customer ID |
| USER_ID | The XTM user id used to log in |
| PASSWORD | The XTM user password to log in |

### Upload
This step will upload previously created i18n zip to XTM.

```json
{
  "load": {
    "project": "UI"
  }
}
```

| Configuration | Description |
|---|---|
| project | The XTM project name. |


### Download
This step will download, unzip and transform files from XTM.

```json
{
  "load": {
    "project": "UI",
    "target": "./i18n-from-xtm",
    "transform": "flatten"
  }
}
```

| Configuration | Description |
|---|---|
| project | The XTM project name. |
| target | The folder where the files will be download, unzipped, and transformed. |
| transform | Optional. Transformation to apply to file hierarchy. For now only `flatten` is accepted, putting all file directly under the target language folder. |


