# Typescript config customisation

To use the Typescript configuration in your IDE, or to add custom rules

1. Create an `tsconfig.json` at your project root folder
2. Make it extend the one from talend preset

```json
{
  "extends": "./node_modules/@talend/scripts-config-typescript/tsconfig.json",
  "compilerOptions": {
    
  },
  "include": [
    "src"
  ]
}
```

3. Configure your IDE plugin to enable Typescript with your root tsconfig configuration.
