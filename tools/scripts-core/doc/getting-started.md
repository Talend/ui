# Getting started

## How to use

1. Add @talend/scripts-core as dev dependency.

```bash
yarn add --dev @talend/scripts-core
```

This is the only packages you need. You can remove all the devDependencies related to the 3 goals (build/test/lint).

2. Add the preset you need. We offer 3 presets, but you can get one from an external organisation.

```bash
# react webapp
yarn add --dev @talend/scripts-preset-react

# react lib
yarn add --dev @talend/scripts-preset-react-lib

# react/angularJS hybrid webapp
yarn add --dev @talend/scripts-preset-react-ng
```

3. Create a `talend-scripts` configuration file at your project root folder, with the preset you installed.

```json
{
	"preset": "@talend/scripts-preset-react"
}
```

4. Discover talend-scripts CLI

With the cli you have multiple commands:

- **build** build a project using webpack (src/app/index.js)
- **build:lib** build a library using babel
- **build:lib:umd** build a library in UMD format using webpack
- **start** start your project using webpack-dev-server
- **lint:es** execute eslint on your project
- **lint:style** execute stylelint on your project
- **extends** generate configuration files which extend the talend-scripts ones
- **upgrade** upgrade dependencies using [talend-upgrade-deps](https://www.npmjs.com/package/@talend/upgrade-deps)

5. Define the npm scripts you need.

For react webapp

```json
{
	"postinstall": "talend-scripts postinstall",
	"prepare": "talend-scripts build",

	"build": "talend-scripts build",
	"build:dev": "talend-scripts build --dev",
	"analyze": "talend-scripts build --env analyze",

	"start": "talend-scripts start",
	"start:prod": "talend-scripts start --prod",

	"test": "talend-scripts test",
	"test:watch": "talend-scripts test --watch",

	"lint:es": "talend-scripts lint:es",
	"lint:style": "talend-scripts lint:style",
	"extends": "talend-scripts extends",

	"upgrade:deps": "talend-scripts upgrade:deps"
}
```

For angularJs/react hybrid webapp

```json
{
	"postinstall": "talend-scripts postinstall",
	"prepare": "talend-scripts build",

	"build": "talend-scripts build",
	"build:dev": "talend-scripts build --dev",
	"analyze": "talend-scripts build --env analyze",

	"start": "talend-scripts start",
	"start:prod": "talend-scripts start --prod",

	"test": "talend-scripts test:ng && talend-scripts test",
	"test:watch": "talend-scripts test --watch",
	"test:ng:watch": "talend-scripts test:ng --watch",

	"lint:es": "talend-scripts lint:es",
	"lint:style": "talend-scripts lint:style",
	"extends": "talend-scripts extends",

	"upgrade:deps": "talend-scripts upgrade:deps"
}
```

For react lib

```json
{
	"postinstall": "talend-scripts postinstall",
	"prepare": "npm run build:lib && build:lib:umd && build:lib:umd:min",

	"build:lib": "talend-scripts build:lib",
	"build:lib:umd": "talend-scripts build:lib --env umd=MyLibraryName",
	"build:lib:umd:min": "talend-scripts build:lib --env umd=MyLibraryName --prod",
	"test": "talend-scripts test",
	"test:watch": "talend-scripts test --watch",

	"lint:es": "talend-scripts lint:es",
	"lint:style": "talend-scripts lint:style",
	"extends": "talend-scripts extends"
}
```

For react typescript lib

```json
{
	"prepublish": "talend-scripts build:ts:lib",

	"test": "talend-scripts test",
	"test:watch": "talend-scripts test --watch",

	"lint:es": "talend-scripts lint:es",
	"lint:style": "talend-scripts lint:style",
	"extends": "talend-scripts extends",

	"upgrade:deps": "talend-scripts upgrade:deps"
}
```

You need to add a tsconfig at the root of your project, extending `@talend/scripts`' one.

```
{
  "extends": "./node_modules/@talend/scripts-config-typescript/tsconfig.json",
  
  // add your project's config
}

```

6. And you're good to go.

## Next

What is the configuration @talend/scripts uses for webpack/babel/eslint/jest/karma ?
It is based on presets.

Go to next step: [Presets](./presets.md).
