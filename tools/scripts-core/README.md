# Talend Scripts

## Description

This project, inspired by `react-scripts` and `kcd-scripts`, aims to abstract all tools and configuration from your project.

* build, dev-serve, analyze: based on webpack
* build-lib-umd: based on webpack with target umd
* build-lib: based on babel
* lint: based on eslint
* test: based on jest and enzyme
* test-ng: based on karma
* extends: customised Talend scripts configuration for your project needs
* postinstall: doing local update for CDN
* upgrade:deps: update your dependencies

## Table of content

*Basic usage*

1. [Getting started](./doc/getting-started.md)
2. [Presets](./doc/presets.md)

*Advanced*

3. [Preset customisation](./doc/customisation.md)
4. [Talend preset](../preset-react/README.md)


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

## postinstall

To support custom UMD build for some libraries we face the need to download that build and install it into your node_modules.
The best to do so is to provide a postinstall hook.

`talend-scripts postinstall`

it does the following:

* update the configuration (modules supported in UMDs)
* download all umd custom builds of modules installed

In some condition you may need to use one of the following options:

| name | description
| -- | -- |
| -v | verbose to display progress |
| -f | force to download custom builds even if present on the system |
| --no-umd-config-update | escape the download of the config |
| --no-install-custom-builds | escape the download and install of custom builds |
