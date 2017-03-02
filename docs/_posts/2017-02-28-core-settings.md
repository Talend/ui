---
layout: page
title: "Settings"
category: core
date: 2017-02-28 10:12:54
order: 3
---

The settings are your app configuration. You configure 3 things : 
* the `actions`, which are the actions definition
* the `views`, which are basically the props to pass to a `component`
* the `routes`, which is a combination of a `path`, a `component`, and a `view` (component configuration or props)

## Load settings in CMF

There is a settingAction utility module that, given the settings url, will fetch and dispatch the settings into CMF store.
The proper settings reducer will store them in `state.cmf.settings`.

```javascript
import { store as cmfstore, actions } from 'react-cmf';
import appReducer from './reducers';

const store = cmfstore.initialize(appReducer);

const settingsAction = actions.settingsActions.fetchSettings('/settings.json');
store.dispatch(settingsAction);

```

## Actions

An action is a definition that holds **at least** info to dispatch to the [store]({{ site.baseurl }}{% link _posts/2017-02-28-core-store.md %}).

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

The `actionCreator` property defines the registered `action creator` key to call and dispatch.

## Views

A view is the props that will configure a `registered component`.

```
{
  ...
  
  "views": {
    "datasets": {
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

The views settings are a dictionary. It should follow some rules : 
* `actions` are references to an action setting id (ex : `"didMountActionCreator": "dataset:fetchAll"` where `dataset:fetchAll` is an action settings)
* it can have references to common settings parts (ex: `"header": { "_ref": "AppHeaderBar#default" }` where `AppHeaderBar#default` is a definition defined in `ref` part). CMF will replace the refs by the actual definitions.

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
