# @talend/upgrade-deps

Manage and upgrade used dependencies is a task nobody likes. Today, even in a simple project we have to deal with lots of dependencies.

The binary installed in this package is `talend-upgrade-deps`.

## How to use

    yarn add -D @talend/upgrade-deps
    npm i --save-dev @talend/upgrade-deps
    talend-ugprade-deps

**Options**

| Option         | Default   | Description                                                                      |
| -------------- | --------- | -------------------------------------------------------------------------------- |
| package        | undefined | Used for single package upgrade. The name of the package.                        |
| scope          | undefined | Used for single npm scope packages. (Example: `@talend`). The name of the scope. |
| latest         | false     | If true, it forces the update to use **latest** tag on npm.                      |
| next           | false     | If true, it forces the update to use **next** tag on npm.                        |
| dry            | false     | Do not change anything, just look at what could be changed in your package.json. |
| changeset      | undefined | Create a changeset file based on git diff of each package.json.                  |
| ignore-scripts | undefined | force npm and yarn to not trigger scripts                                        |

# Concepts

Before digging into the details we need to remember the following concepts:

- package.json defines the requirements
- yarn.lock / package-lock.json define all versions to install in a project to be able to repeat the same exact install. It tracks dependencies.
- not all packages follow semantic versionning (ex: `angular`)
- requirements can be defined using symbols like ^, ~ (to trust or not).

So whatever upgrade you are doing you should **always** do some checks:

- tests pass
- as less duplicate as possible to not make your bundle too big
- no regression in the app

The upgrade task is hard. We have identified the following scenarios to support as a developer:

- check what could be updated ?
- update only one package
- update an entire scope of packages often well aligned (ex: `@talend`)
- update all dependencies following the current package.json requirements
- exclude some libraries like `angular` on very old project

## What could be updated

    talend-upgrade-deps --dry --latest

This will display all updates using the latest tagged versions on the npm registry. You will have in bold the major as followed output for example:

<pre>
<strong>"react": "16.0.0" => "^17.0.2"</strong>
<strong>"react-dom": "^16.0.0" => "^17.0.2"</strong>
"chokidar": "^3.5.0" => "^3.5.2"
</pre>

## Update all dependencies following the current package.json

    talend-script upgrade:deps

This is the best way to minimize the risk to brake your code. If your package.json is strong on dependencies and releases of your dependencies are good (it happens to have a bad release right ?) you should have no regression here.

The user of your package (dev who install it has a dependencies) will rely on the package.json. So yes because you do not change requirements with this command, it means you are equal in the context of a user of your library ! You can see this command has a simple `yarn ugprade`. But it is not only a yarn upgrade, we found a bug by doing only that.

The yarn upgrade bug: Because you do not change the requirement but you update your dependencies it means you may rely on new features of your dependencies without knowing it and without expliciting it.

This is why our script upgrade the package.json file: to remove this risk to rely on new feature. Also be careful because yarn will not upgrade subdependencies if not needed. when you only update the package.json. It minimizes the upgrade.

## Update an entire scope of packages often well aligned (ex: `@talend`)

    talend-upgrade-deps --scope=@talend --latest

In a company or a community we often use mono repositories so our releases are aligned. In this case we want to force update on an entire scope.

This will update your package.json using the `latest` release on npm.
Then it will remove every package in your lock file which is under this scope, before install.
This will garantie you to have latest and aligned releases.

## Update only one package

    talend-script upgrade:deps --package=chokidar

This allows to target one particular package for a fix for example.

**Force resolution**

In some cases, the package which depends on it is deprecated. You can try to force using **resolution** option but it comes with extra work. You will have to remove the need of this dependencies and on each future upgrade have to recheck if existing resolutions are needed because resolution works in both direction upgrade and downgrade and you don't want to downgrade.

## Exclude some libraries

On very old projects you may wants to **pin** versions of given libraries. For this case you should **remove any semantic symbols** in the package.json file.
For example in the following project I pin angular and jquery

```json
{
	"name": "@talend/myproject",
	"dependencies": {
		"angular": "1.6.9",
		"jquery": "3.5.1",
		"react": "^16.14.0"
	}
}
```

`talend-upgrade-deps` take care of this syntax.
And because we use `yarn-deduplicate` the output should stick to theses pinned versions.
