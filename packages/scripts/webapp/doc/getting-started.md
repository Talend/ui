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
  "start": "talend-scripts start",
  "prepublish": "talend-scripts build",
  "analyze": "talend-scripts build --env.analyze",
  "lint:es": "talend-scripts lint:es",
  "test": "talend-scripts test",
  "test:watch": "talend-scripts test --watch"
}
```

4. You're good to go.


## Next

What is the configuration @talend/scripts uses for webpack/eslint/jest ?
It is based on presets. By default it uses the talend preset.

Got to next step: [Presets](./presets.md).
