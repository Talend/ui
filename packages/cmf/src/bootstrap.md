# react-cmf bootstrap

This api help you to start without importing anything except your code and cmf itself

Quick start:

```javascript
import cmf from '@talend/react-cmf';

import components from './components';
import sagas from './sagas';

configure.initialize();
cmf.bootstrap({
	components,
	saga: sagas.appSaga, // function* appSaga() {...}
	...manyMoreOptions,
});
```

## Options

| name             | type               | default                        | description                                                                                                   |
| ---------------- | ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| settingsURL      | string             | '/settings.json'               | REQUIRED This URL to fetch the cmf settings.json file                                                         |
| root             | HTMLElement        | document.getElementById(appId) | DOM element where to render the React application                                                             |
| appId            | string             | 'app'                          | DOM element id, where to render the React application                                                         |
| components       | Object             | undefined                      | A components dictionary where each key/value are registered in cmf registry so you can refer them in settings |
| actionCreators   | Object             | undefined                      | Same as `components`                                                                                          |
| expressions      | Object             | undefined                      | Same as `components`                                                                                          |
| sagas            | Object             | undefined                      | Same as `components`                                                                                          |
| saga             | function           | the main saga to start         | Saga that will be triggered when the module will be loaded                                                    |
| httpMiddleware   | function           | undefined                      | Override the default http middleware                                                                          |
| preReducer       | Array or function  | undefined                      | Redux preReducer, called on every actions before reducer                                                      |
| enhancer         | function           | undefined                      | Redux enhancer                                                                                                |
| reducer          | Object or function | undefined                      | Redux reducer. This is added with the internal reducers.                                                      |
| preloadedState   | Object             | undefined                      | Redux state to preload. This is the initial state on Redux bootstrap.                                         |
| middlewares      | Array              | undefined                      |  Redux middlewares                                                                                            |
| storeCallback    | function           | undefined                      | Let you call a function once the store is created                                                             |
| AppLoader        | React Component    | undefined                      | Let you define the React component to use to show the app is currently loading (waiting for the settings)     |
| onError          | object             | undefined                      | configure error handling                                                                                      |
| RootComponent    | React Component    | undefined                      | Let you define the React component to use to wrapp the App. It can be a react-router for example.             |
| registry         | Object             | undefined                      | Let you register anything you want as key/value in the CMF registry                                           |
| httpInterceptors | Array              | undefined                      | Let you register interceptors                                                                                 |
| init             | function           | undefined                      | Function that return the module content initialised                                                           |

## Modules

You apps may be splitted into different modules, like a core set of components and some other business logics.

For that CMF expose an API to let you merge your settings:

```javascript
import cmf from '@talend/react-cmf';
import containersModule from '@talend/react-containers';

import components from './components';
import saga from './saga';
import sagas from './sagas';

cmf.boostrap({
	components,
	saga,
	sagas,
	modules: [containersModule],
});
```

## onError

The error handling is well described in it's own [documentation page](./onError.md).

In bootstrap you can pass the following options

| attribute | default value | description                                        |
| --------- | ------------- | -------------------------------------------------- |
| reportURL | undefined     | the error where to post. For example '/api/errors' |

## The case of angular

If you are using ngreact and you want to leverage cmf you must set the `render` option to `false`:

```javascript
import cmf from '@talend/react-cmf';
import containersModule from '@talend/react-containers';

import components from './components';
import saga from './saga';
import sagas from './sagas';

const setup = cmf.boostrap({
	render: false,
	components,
	saga,
	sagas,
	modules: [containersModule],
});
```

The result from `cmf.boootstrap()` contains those attributes:

| attributes      | description                              |
| --------------- | ---------------------------------------- |
| store           | redux store instance                     |
| saga.run        | if you want to start the saga middleware |
| saga.middleware | the instance of saga middleware          |
| App             | cmf App component to render a CMF App    |
| cmfModule       | the merged options from all cmfModules   |
