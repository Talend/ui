# Talend Scripts

## Description

This project, inspired by `react-scripts` and `kcd-scripts`, aims to abstract all tools and configuration from your project.

It will expose basic scripts:

- start
- test
- build
- lint

By default no configuration is needed but you can at any time create a configuration file and extends from the default config.

`talend-scripts` will detect the kind of package you are in.

- **app**: if you have src/app folder
- **lib**: if not an app
- **angular**: if there is a dependencies on angularjs
- **react**: if there is a dependencies onreact
- **public** project: you have a publishConfig: { access : 'public' } in your package.json

Depending on this the sub command will use a real command like `webpack` and apply either custom configuration or default configuration.

| command | app                | lib                | angular | react |
| ------- | ------------------ | ------------------ | ------- | ----- |
| build   | webpack            | babel/tsc          |         |       |
| lint    | eslint + stylelint | eslint + stylelint |         |       |
| test    | jest               | jest               | karma   | jest  |

## Table of content

_Basic usage_

1. [Getting started](./doc/getting-started.md)

_Advanced_

3. [config customisation](./doc/customisation.md)

## Possible issues

### Build

While building a huge app, you can run into a `JavaScript heap out of memory`, espacially on production mode, with webpack optimisation and sourcemap.
You can increase the node space size to overcome this issue.

Package.json

```json
{
	"scripts": {
		"build": "NODE_OPTIONS=--max_old_space_size=4096 talend-scripts build"
	}
}
```

### Test

@talend/scripts-core uses `jest` to run tests. On mac and watch mode, if you have a lot of files to watch, you can bump into this error

```
$ jest --watch
2016-09-22 10:49 node[79167] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2016-09-22 10:49 node[79167] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
2016-09-22 10:49 node[79167] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: Error watching file for changes: EMFILE
    at exports._errnoException (util.js:1036:11)
    at FSEvent.FSWatcher._handle.onchange (fs.js:1406:11)
```

The issue is well known, still not fixed in the lib or any of its dependencies.
This [github issue](https://github.com/facebook/jest/issues/1767) brings you a lot of info.

As a workaround, consider installing [`watchman`](https://facebook.github.io/watchman/).

```
brew install watchman
```

## Extra scripts

We have added two scripts to be as simple as possible
