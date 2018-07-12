# @talend/eslint-config

This module is a set of shared eslint configuration.

<!-- TOC START min:2 max:3 link:true update:true -->
- [How to use](#how-to-use)
- [How to contribute](#how-to-contribute)
- [Changelog](#changelog)
- [Profiles](#profiles)

<!-- TOC END -->

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

## How to contribute

* Make sure that you update the version in the package.json according to the semver-level of your update
* Make sure this document (especially the [Profiles](#profiles) part) is up-to-date with your contribution
* Breaking any of the configuration or changing an exported configuration's name makes your update a breaking version
* As there are two configs, please fill the [changelog](#changelog) below so that it's easier for other devs to find out which modifications break their configuration

## Changelog

* __2.0.1:__ Fix broken link between API team's `jasmine` and `generic` test configs
* __2.0.0:__
	* CodeceptJS config removed, the tests should be run with `noGlobals` attribute, the globals are no longer required
	* The file `api-test-e2e` was removed, the file `api-test` is now generic, the file `api-test-jasmine` replaces the previous `api-test` file with Jasmine conf
* __1.0.0:__ Initial contribution


## Profiles

There are multiple profiles available for now. The idea is to merge them eventually.
The following table indicated what value to set to refers to each profile.

| Extends 										| Description 									|
|-----------------------------------------------|-----------------------------------------------|
| `@talend/eslint-config` 						| Default Talend configuration 					|
| `@talend/eslint-config/api-app.yaml` 			| API team, javascript base configuration 		|
| `@talend/eslint-config/api-app-react.yaml` 	| API team, react applications configuration 	|
| `@talend/eslint-config/api-app-angular.yaml` 	| API team, Angular applications configuration 	|
| `@talend/eslint-config/api-test.yaml` 		| API team, test base configuration 					|
| `@talend/eslint-config/api-test-jasmine.yaml` 	| API team, unit tests configuration 				|
| `@talend/eslint-config/api-packaging.yaml` 		| API team, packaging script configuration 		|
