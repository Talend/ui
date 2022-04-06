# @talend/scripts-publish-local

This package provide a CLI: 'talend-publish-local'.
This CLI give you a way to handle a local instance of [verdaccio](https://verdaccio.org) and configure your environment to point yarn and npm on it. Once you stop it (ctrl+c) it reconfigures npm and yarn as before.
Then it executes a series of commands that you provide using a json configuration file.

```
    talend-publish-local --config=./redux4.json
    // of
    talend-scripts publish:local  --config=./redux4.json
```

Configuration file example:

```json
{
  "repositories": {
    "Talend/ui": {
      "path": "../ui",
      "branch": "jmfrancois/chore/update-redux",
      "commands": [
        "yarn pre-release",
        "yarn changeset version",
        "yarn changeset publish"
      ]
    },
    "Talend/ui-private": {
      "path": "../ui-private",
      "branch": "jmfrancois/chore/update-redux",
      "commands": [
        "yarn install",
        "talend-scripts upgrade:deps",
        "yarn run pre-release",
        "yarn changeset version",
        "yarn changeset publish"
      ]
    },
    "Talend/myproject": {
      "path": "../myproject/webapp",
      "branch": "jmfrancois/chore/update-redux",
      "commands": [
        "yarn install",
        "talend-scripts upgrade:deps"
      ]
    }
  }
}
```
