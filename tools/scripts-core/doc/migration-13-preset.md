# from 12.x to 13.x

## Preset

Since we have remove preset you can remove it from your `package.json`

```diff
-   "@talend/scripts-preset-react-lib": "^14.0.1",
```

You can also remove it from your `talend-scripts.json` file:

```diff
-   "preset": "@talend/scripts-preset-react-lib"
```

From now default config is added to your project by `@talend/scripts-core` package.

## package.json scripts

in your package.json you have to update all the scripts you are using

```
- "build": "talend-scripts build:lib"
+ "build": "talend-scripts build"
- "pre-release": "talend-scripts build:lib:umd"
+ "pre-release": "talend-scripts build --umd"
- "postinstall": "talend-scripts postinstall"
- "publish:local": "talend-scripts publish:local"
+ "publish:local": "talend-publish-local"
- "lint:es": "talend-scripts lint:es"
- "lint:style": "talend-scripts lint:style"
+ "lint": "talend-scripts lint"
- "test:ng": "talend-scripts test:ng"
+ "test": "talend-scripts test"
```

## config now expose as main

if you were used to extends using the complete path, this is not anymore needed for :

- eslint
- prettier
- stylelint
- babel
- typescript

I let you look at dedicated package which own and document the change
