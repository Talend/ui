# Content Management Framework for CQRS (aka cmf-cqrs)

This is a library to help you to build configurable React App with CQRS pattern.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1e353b0f69c4cf99a4cb3f68b70ea7d)](https://www.codacy.com/app/Talend/ui/packages/cmf-cqrs)

[npm-icon]: https://nodei.co/npm/react-cmf-cqrs.png?downloads=true
[npm-url]: https://npmjs.org/package/react-cmf-cqrs
[travis-ci-image]: https://travis-ci.org/Talend/react-cmf-cqrs.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-cmf-cqrs

[dependencies-image]: https://david-dm.org/Talend/react-cmf-cqrs/status.svg
[dependencies-url]: https://david-dm.org/Talend/react-cmf-cqrs
[devdependencies-image]: https://david-dm.org/Talend/react-cmf-cqrs/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/react-cmf-cqrs#info=devDependencies

[quality-badge]: http://npm.packagequality.com/shield/react-cmf-cqrs.svg
[quality-url]: http://packagequality.com/#?package=react-cmf-cqrs

## Breaking changes log

Before 1.0, `react-cmf-cqrs` do NOT follow semver version in releases.
You will find a [list of breaking changes here](https://github.com/Talend/react-cmf/blob/master/BREAKING_CHANGES_LOG.md).

##Content

This package provides tools to deal with cqrs backend allowing websocket handling :
- acknowledgement actions
- ACKDispatcher component
- Smart Websocket middleware
- ACK reducer

##How it works

- to start the websocket with smartWebsocket middleware :

```javascript
ws = new SmartWebsocket(urlPrefix, {
    onOpen: () => dispatch({ type: ACTION_TYPES.ON_OPEN }),
    onClose: () => dispatch({ type: ACTION_TYPES.ON_CLOSE }),
    onMessage: (messageEvent) => {
        dispatch({ type:onMessage, message:messageEvent });
    },
});
```
In onMessage event, you should get middleware handlers as well.

- On the reducer, actions handled :
    - ACK_ADD_CONTEXT : Used to add a new request on stack
    - ACK_RECEIVE_MESSAGE : Used when a message come from the ws
    - ACK_DELETE : Used when you want to delete a handler
