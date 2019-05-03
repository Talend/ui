# Talend Webapp Scripts

## Description

This project, inspired by `react-scripts` and `kcd-scripts`, aims to abstract all tools and configuration from your project.
For now there are 3 goals :
* build, dev-serve, analyze: based on webpack
* lint: based on eslint
* test: based on jest and enzyme

## Table of content

*Basic usage*

1. [Getting started](./doc/getting-started.md)
2. [Presets](./doc/presets.md)

*Advanced*

3. [Preset customisation](./doc/customisation.md)
4. [Talend preset](./preset/README.md)


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

@talend/scripts uses `jest` to run tests. On mac and watch mode, if you have a lot of files to watch, you can bump into this error
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
