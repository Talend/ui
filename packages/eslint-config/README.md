# @talend/eslint-config

This module is a set of shared eslint configuration.

## How to use

Install the module

```bash
npm install -D @talend/eslint-config
```
or with yarn
```bash
yarn add --dev @talend/eslint-config
```

Create an `.eslintrc` file in the folder you need to lint.

```json
{
  "extends": "@talend/eslint-config"
}
```

## Profiles

There are multiple profiles available for now. The idea is to merge them eventually.  
The following table indicated what value to set to refers to each profile. 

| Extends 										| Description 									|
|-----------------------------------------------|-----------------------------------------------|
| `@talend/eslint-config` 						| Default Talend configuration 					|
| `@talend/eslint-config/api-app.yaml` 			| Api team, javascript base configuration 		|
| `@talend/eslint-config/api-app-react.yaml` 	| Api team, react applications configuration 	|
| `@talend/eslint-config/api-app-angular.yaml` 	| Api team, Angular applications configuration 	|
| `@talend/eslint-config/api-test.yaml` 		| Api team, test configuration 					|
| `@talend/eslint-config/api-test-e2e.yaml` 	| Api team, e2e test configuration 				|
| `@talend/eslint-config/api-packaging.yaml` 	| Api team, packaging script configuration 		|
