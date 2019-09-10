---
id: core-settings
title: Settings
---

The settings are your app configuration. You configure 3 things :
* the `props`, which are taken by cmfConnected *component*
* the `actions`, which are the actions definitions (Deprecated in favor of props)
* the `routes`, which is a combination of a *path*, a *component*, and a `componentId` (component configuration or props) provided by `@talend/react-cmf-router`

## Load settings in CMF

There is a `settingsURL` option in bootstrap, will trigger an action to fetch it. The proper settings reducer will store them in `state.cmf.settings`.

```javascript
cmf.bootstrap({
    settingsURL: '/settings.en.json',
});
```

## props

When you `cmfConnect` a component on each render it will try to find settings for him. The lookup is based on the `displayName#componentId`.

The following settings structure do that:

```
{
  ...

  "props": {
    "HomeListView#datasets": {
      "didMountActionCreator": "dataset:fetchAll",
      "header": { "_ref": "AppHeaderBar#default" },
      "list": {
        "collectionId": "datasets",
        "list": {
          "columns": [
            { "key": "id", "label": "ID" },
            { "key": "label", "label": "Name" },
            { "key": "created",  "label": "Created" },
            { "key": "tags", "label": "Tags" }
          ]
        }
      }
    },
    ...
  },

  ...

  "ref": {
    "AppHeaderBar#default": {
      "app": "CMF starter"
    }
  }
}
```

The `HomeListView` component rendered with componentId="datasets" will map this settings to its props.

Something like this

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

function HomeListView(props) {
  return <div />// ...
}

HomeListView.displayName = 'HomeListView';  // this is mandatory
export default cmfConnect()(HomeListView);
```


The props settings are dictionaries. It propose the following features to help you pass the wanted props:

* if the props name ends with **Expression** it will be evaluated. [Read more on expressions](./core-expressions)
* it can have references to common settings parts (ex: `"header": { "_ref": "AppHeaderBar#default" }` where `AppHeaderBar#default` is a definition from `ref` part). CMF will replace the refs by the actual definitions.
* it can use event handler static description using [onEvent data structure](https://github.com/Talend/ui/tree/master/packages/cmf/src/onEvent.md)

## Routes

A route definition is a combination of
* a path
* a registered component
* a view setting (the component props)

CMF uses [React router](https://github.com/ReactTraining/react-router). The definition is basically an "enhanced" react router configuration.

```
{
  ...

  "routes": {
    "path": "/",
    "component": "App",
    "indexRoute": {
      "component": "Redirect",
      "view": "indexRouteRedirect"
    },
    "childRoutes": [
      {
        "path": "datasets",
        "component": "HomeListView",
        "view": "datasets"
      },
      {
        "path": "datastores",
        "component": "HomeListView",
        "view": "datastores"
      }
    ]
  },

  ...
}
```


## Actions (Deperacted)

This is deprecated because it serve the exact same feature as `props` without many features of it.

An action is a definition that holds **at least** the info to dispatch.

```json
{
  ...

  "actions": {
    "menu:datasets": {
      "id": "menu:datasets",
      "label": "Datasets",
      "icon": "talend-folder",
      "payload": {
        "type": "MENU_LINK",
        "cmf": {
          "routerReplace": "/datasets"
        }
      }
    },
    "datasets:fetchAll": {
      "id": "datasets:fetchAll",
      "actionCreator": "fetchAll",
    },
    ...
  },

  ...
}
```

The actions settings are a dictionary. It should follow some rules :
* the dictionary key is the action `id` property
* the action has either a `payload` or an `actionCreator` property

The `payload` property defines static properties to dispatch to the store

The `actionCreator` property defines the registered `action creator` id to call and dispatch.
