---
id: core-settings
title: Settings
---

The settings are your app configuration. You configure 3 things :
* the `props`, which are basically the props to pass to a `component`
* the `actions`, which are the actions definitions (Deprecated in favor of props)
* the `routes`, which is a combination of a `path`, a `component`, and a `componentId` (component configuration or props)

## Load settings in CMF

There is a `settingsURL` option in bootstrap, will trigger an action to fetch it. The proper settings reducer will store them in `state.cmf.settings`.

It's purely internal API and should be used only for extension purpose (like add a new entry in the settings)

```javascript
cmf.bootstrap({
    settingsURL: '/settings.en.json',
});
```

## props

props will be pass to a `connected component` automaticly.
Connected component try to find in settings this props by themself. This is a core feature of CMF.

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

The props `HomeListView#datasets` will be injected to the component `HomeListView` which must be **cmfConnect**ed and instanciate with a `componentId`=**datasets**

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


The props settings are a dictionary. It should follow some rules :

* `actions` are references to an action setting id (ex : `"didMountActionCreator": "dataset:fetchAll"` where `dataset:fetchAll` is an action id)
* it can have references to common settings parts (ex: `"header": { "_ref": "AppHeaderBar#default" }` where `AppHeaderBar#default` is a definition from `ref` part). CMF will replace the refs by the actual definitions.
* it can use event handler static description using [onEvent data structure](https://github.com/Talend/ui/tree/master/packages/cmf/onEvent.md)

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
