# Getting started

## How to use

1. Add @talend/scripts-core as dev dependency.

```bash
yarn add --dev @talend/scripts-core
```

This is the only packages you need. You can remove all the devDependencies related to the 3 goals (build/test/lint).

2. Add the configuration you need. We offer some optional configuration

```bash
# react webapp
yarn add --dev @talend/scripts-config-react-webpack

# react lib
yarn add --dev @talend/scripts-config-storybook-lib
```

4. Discover talend-scripts CLI

With the cli you have multiple commands:

- **build** build a project using webpack (src/app/index.js)
- **start** start your project using webpack-dev-server or storyook
- **lint** execute eslint and stylelint on your project
- **lint-merge-report** merge eslint and stylelint report (made to be used in GHA to display lint issue with a monorepo)
- **extends** generate configuration files which extend the talend-scripts ones

5. Define the npm scripts you need.

For react webapp

```json
{
	"prepare": "talend-scripts build",
	"build:dev": "talend-scripts build --dev",
	"analyze": "talend-scripts build --env analyze",

	"start": "talend-scripts start",
	"start:prod": "talend-scripts start --prod",

	"test": "talend-scripts test",
	"test:watch": "talend-scripts test --watch",

	"lint": "talend-scripts lint"
}
```

For react lib

```json
{
	"prepare": "talend-scripts build",
	"pre-release": "talend-scripts build --umd --prod",
	"test": "talend-scripts test",
	"test:watch": "talend-scripts test --watch",

	"lint": "talend-scripts lint"
}
```

For react typescript lib

```json
{
	"prepare": "talend-scripts build",
	"pre-release": "talend-scripts build --umd --prod",
	"test": "talend-scripts test",
	"test:watch": "talend-scripts test --watch",

	"lint": "talend-scripts lint"
}
```

You need to add a tsconfig at the root of your project, extending `@talend/scripts-config-typescript`'.

```
{
  "extends": "@talend/scripts-config-typescript",

  // add your project's config
}

```

6. And you're good to go.

## build options

talend-scripts manage options for build as this is a script not only one sub command.

_--watch_: It will not delete the target folder (which the case by default).
This is usefull when you have a watcher already on it.

_--umd_: create a UMD bundle from the library using module-to-cdn and cdn-webpack-plugin.

## lint options

talend-scripts manage options for build as this is a script not only one sub command.

_--fix_: fix the corresponding issues that can be automatically fixed.

## tests options

This command is a pass through jest / karma. So you can pass anything you want.

## lint-merge-report config

To be able to use lint-merge-report, you will have to add config in talend-scripts.json. As example, for tui, we have this:

```
{
  "lintMergeReport": {
    "packageDirs": ["fork", "packages", "tools"]
  }
}
```
