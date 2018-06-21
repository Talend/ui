# @talend/eslint-config

This module is a set of shared eslint configuration.

## How to use

Create an `.eslintrc` file in the folder you need to lint.

```json
{
  "extends": "@talend/eslint-config"
}
```

## Profiles

There are multiple profiles available for now. The idea is to merge then eventually.  
The following table indicated what value to set to refers to each profile. 

| Profile | Extends | Description |
|---------|---------|-------------|
| default | `@talend/eslint-config` | Default Talend configuration |
| default | `@talend/eslint-config/api-app.yaml` | Api team, javascript base configuration |
| default | `@talend/eslint-config/api-app-react.yaml` | Api team, react applications configuration |
| default | `@talend/eslint-config/api-app-angular.yaml` | Api team, Angular applications configuration |
| default | `@talend/eslint-config/api-test.yaml` | Api team, test configuration |
| default | `@talend/eslint-config/api-test-e2e.yaml` | Api team, e2e test configuration |
| default | `@talend/eslint-config/packaging.yaml` | Api team, packaging script configuration |
