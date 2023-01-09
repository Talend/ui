# Eslint config customisation

To use the eslint configuration in your IDE, or to add custom rules

1. Create an `.eslintrc` at your project root folder
2. Make it extend the one from talend preset

```json
{
	"extends": "@talend/scripts-config-eslint",
	"rules": {}
}
```

3. Configure your IDE plugin to enable eslint with your root eslintrc configuration.
