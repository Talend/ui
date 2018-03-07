# Content Management Framework for CQRS (aka cmf-cqrs)

This is a library to help you to build configurable React App with CQRS pattern.

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f1e353b0f69c4cf99a4cb3f68b70ea7d)](https://www.codacy.com/app/Talend/ui/packages/cmf-cqrs)

[npm-icon]: https://nodei.co/npm/react-cmf-cqrs.png?downloads=true
[npm-url]: https://npmjs.org/package/@talend/react-cmf-cqrs
[travis-ci-image]: https://travis-ci.org/Talend/react-cmf-cqrs.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-cmf-cqrs
[dependencies-image]: https://david-dm.org/Talend/react-cmf-cqrs/status.svg
[dependencies-url]: https://david-dm.org/Talend/react-cmf-cqrs
[devdependencies-image]: https://david-dm.org/Talend/react-cmf-cqrs/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/react-cmf-cqrs#info=devDependencies
[quality-badge]: http://npm.packagequality.com/shield/react-cmf-cqrs.svg
[quality-url]: http://packagequality.com/#?package=react-cmf-cqrs

## Breaking changes log

Before 1.0, `@talend/react-cmf-cqrs` do NOT follow semver version in releases.
You will find a [list of breaking changes here](https://github.com/Talend/ui/wiki/BREAKING-CHANGE).

## Content

This package provides tools to deal with cqrs backend allowing websocket handling :

* acknowledgement actions
* ACKDispatcher component
* Smart Websocket middleware
* ACK reducer

## How it works

* to start the websocket with smartWebsocket middleware :

```javascript
ws = new SmartWebsocket(urlPrefix, {
	onOpen: () => dispatch({ type: SOCKET_ON_OPEN }),
	onClose: () => dispatch({ type: SOCKET_ON_CLOSE }),
	onMessage: messageEvent => {
		socketListener.forEach(func => func(messageEvent, dispatch, getState, ws));
	},
	onError: errorEvent => {
		dispatch({ type: SOCKET_ON_CLOSE, event: errorEvent });
	},
	onPing: event => {
		ws.pingTimeoutId = event.pingTimeoutId;
	},
	onPingTimeout: () => {
		dispatch({ type: SOCKET_ON_PING_TIMEOUT });
	},
	...socketOptions,
});
```

socketOptions is optionnal but allows websocket configuration from middleware instanciation within your application.

```javascript
{
	checkInterval: 5000,
	pingInterval: 10000,
	pingTimeoutDelay: SOCKET_ON_PING_TIMEOUT_DELAY,
}
```

* checkInterval : max duration between 2 websocket connections trials if closed
* pingInterval : duration between ping message from the webapp to the server, like a heartbeat of the connection
* pingTimeoutDelay : duration after which a PING message not being answered by a PONG will trigger a SOCKET_ON_PING_TIMEOUT and force close of the current connection

In onMessage event, you should get middleware handlers as well.

* On the reducer, actions handled :
  * ACK_ADD_CONTEXT : Used to add a new request on stack
  * ACK_RECEIVE_MESSAGE : Used when a message come from the ws
  * ACK_DELETE : Used when you want to delete a handler

## SocketMiddleware

This middleware serve two purpose

listening to action dispatched to the reducer, and be able to send message trought the websocket

listening to message comming from the websocket and dispatching message to the reducer

### Configuration

```javascript
import { createStore } from 'redux';
import { middlewares as cqrsMiddlewares } from '@talend/react-cmf-cqrs';

const websocketMiddleware = cqrsMiddlewares.createWebsocketMiddleware(
	API['stream-websocket'],
	[...actionListeners],
	[...socketListener],
	{ ...socketOptions },
);
const store = createStore(reducer, initialState, applyMiddleware(websocketMiddleware));
```

```javascript
import { store as cmfstore } from '@talend/react-cmf';
import { middlewares as cqrsMiddlewares } from '@talend/react-cmf-cqrs';

const websocketMiddleware = cqrsMiddlewares.createWebsocketMiddleware(
	API['stream-websocket'],
	[...actionListeners],
	[...socketListener],
	{ ...socketOptions },
);

const store = cmfstore.initialize(reducer, initialState, enhancer, [websocketMiddleware]);
```

the action listener recieve for each action
the store state ,before the action is applied
the action dispatched to the store reducer
the new state resulting from the action to be applied

the value returned by the actionListener get sent trought the websocket.

```javascript
/** an example of an action listener sending all action trought the ws **/
function myActionListener(previousState, action, nextState) {
	return JSON.stringify(action);
}
```

the socketListener recieve for each message
the messageEvent containing all information about the message recieved
the store.dispatch function so you can dispatch an action
the store.getState function in case you want to check the store state before doing anything
the smartWebSocket itself so the listener can access to the websocket itself (eg: datastreams pong socket listener that get timeoutId and clear it before it's execution)

```javascript
/** an example of an message listener dispatching each message recieved **/
function myMessageListener(messageEvent, dispatch, getState, smartWebSocket) {
	dispatch({type: 'MESSAGE RECIEVED', message: JSON.parse(messageEvent.data);})
}
```

Additionnaly the websocket middleware dispatch action on socket state change and on message being recieved.

on socket connection open success the following action get dispatched

```
{ type: SOCKET_ON_OPEN }
```

on socket connection being closed the following action get dispatched

```
{ type: SOCKET_ON_CLOSE }
```

on socket connection being closed by an error the following action get dispatched

```
{ type: SOCKET_ON_ERROR, event: errorEvent }
```

on socket connection receiving a message, no action get dispatched but socketListeners are called which will take care of dispactching action or not or even do something else

on socket connection timeout reached, the following action get dispatched

```
{ type: SOCKET_ON_PING_TIMEOUT }
```
