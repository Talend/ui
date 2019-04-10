# Getting started

## How to use

1. Add @talend/scripts as dev dependency.
```bash
yarn add --dev @talend/scripts
```

2. This is the only tool you'll need. You can remove all the devDependencies related to the 3 goals (build/test/lint).

3. Define the npm scripts.
```json
{
  "prepublish": "talend-scripts build:prod",

  "build": "talend-scripts build",
  "build:dev": "talend-scripts build --dev",
  "analyze": "talend-scripts build --env.analyze",

  "start": "talend-scripts start",
  "start:prod": "talend-scripts start --prod",

  "test": "talend-scripts test",
  "test:watch": "talend-scripts test --watch",

  "lint:es": "talend-scripts lint:es"
}
```

4. You're good to go.


## Next

What is the configuration @talend/scripts uses for webpack/eslint/jest ?
It is based on presets. By default it uses the talend preset.

Got to next step: [Presets](./presets.md).
